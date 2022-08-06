import fs from "fs";
import path from 'path';
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

function handleError(message: string, response: VercelResponse) {
  console.error(message);
  response.redirect("/");
}

export default (request: VercelRequest, response: VercelResponse) => {
  const { username, action } = request.query;

  const allowedActions = Object.values(Action);
  if (!allowedActions.includes(<Action>action)) {
    handleError(`invalid action [${action}]`, response);
  }

  fs.readFile(path.join(process.cwd(), 'src', '_data', 'sites.json'), (err, data) => {
    if (err) {
        handleError(err.message, response)
        return;
    }

    try {
      const parsed: SitesData = JSON.parse(data.toString());
      let idx = parsed.map((el) => el.username).indexOf(<string>username);
      if (idx < 0) {
        handleError(`username [${username}] not found`, response);
        return;
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
        handleError(`no redirect URL found for username [${username}]`, response);
        return;
      }

      response.redirect(redirectUrl)

    } catch (e) {
      handleError(e.message, response);
    }

    response.end();
  });
};
