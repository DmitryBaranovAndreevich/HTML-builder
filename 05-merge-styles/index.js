const fs = require("fs");
const path = require("path");
const fsPromises = require("fs/promises");

async function bundleStyles(url, urlToCopy, fileName) {
  async function readDir(url) {
    return fsPromises.readdir(url, {
      encoding: "utf-8",
      withFileTypes: true,
    });
  }

  async function seachCss(url) {
    let state = [];
    const files = await readDir(url);
    for (const file of files) {
      if (file.isDirectory()) {
        const priv = await seachCss(path.join(url, file.name));
        state = [...state, ...priv];
      } else {
        if (path.extname(file.name) === ".css") {
          const buffer = await fsPromises.readFile(path.join(url, file.name), "utf-8");
          state.push(buffer);
        }
      }
    }
    return state;
  }

  seachCss(url).then((state) => {
    fs.writeFile(
      path.join(urlToCopy, fileName),
      state.join(""),
      "utf-8",
      (err) => {
        if (err) console.log(err);
      }
    );
  });
}

bundleStyles(
  path.join(__dirname, "styles"),
  path.join(__dirname, "project-dist"),
  "bundle.css"
);


module.exports = {bundleStyles};