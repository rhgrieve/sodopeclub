import fs from "fs";
import path from "path";
import type { VercelRequest, VercelResponse } from "@vercel/node";

type SitesData = {
  username: string;
  url: string;
}[];

enum Action {
  Next = "next",
  Prev = "prev",
  Random = "random",
}

function handleError(error: Error, response: VercelResponse) {
  console.error(error.message);
  response.redirect("/");
}

export default (request: VercelRequest, response: VercelResponse) => {
  const { username, action } = request.query;

  try {
    const allowedActions = Object.values(Action);
    if (!allowedActions.includes(<Action>action)) {
      throw new Error(`invalid action [${action}]`);
    }

    const dataPath = path.join(process.cwd(), "src", "_data", "sites.json");
    const data = fs.readFileSync(dataPath);
    const parsed: SitesData = JSON.parse(data.toString());
    let idx = parsed.map((user) => user.username).indexOf(<string>username);
    if (idx < 0) {
      throw new Error(`username [${username}] not found`);
    }

    switch (action) {
      case Action.Next:
        idx = idx >= parsed.length - 1 ? 0 : idx + 1;
        break;
      case Action.Prev:
        idx = idx <= 0 ? parsed.length - 1 : idx - 1;
        break;
      case Action.Random:
        idx = Math.floor(Math.random() * parsed.length);
        break;
      default:
    }

    const redirectUrl = parsed[idx].url;
    if (!redirectUrl) {
      throw new Error(`no redirect URL found for username [${username}]`);
    }

    response.redirect(redirectUrl);

    response.end();
  } catch (e) {
    handleError(e, response);
  }
};
