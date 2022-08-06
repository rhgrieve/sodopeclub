const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    outputDir: "./_site/img",
    widths: [600],
    formats: ["webp", "gif"],
    sharpOptions: {
      animated: true,
    },
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  return {
    dir: {
      input: "src",
    },
  };
};
