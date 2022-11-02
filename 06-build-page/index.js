const { copyDirectory } = require("../04-copy-directory");
const { bundleStyles } = require("../05-merge-styles");
const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");

function callback(err) {
  if (err) throw err;
}

async function innerText(urlReadFile, urlToCopy, fileName) {
  let data = await fsPromises.readFile(urlReadFile, "utf-8");
  const renameMe = data.match(/{{.+}}/g);

  for (const teg of renameMe) {
    const fileName = teg.replace(/{|}/g, "");
    const dataFromComponents = await fsPromises.readFile(
      path.join(__dirname, "components", `${fileName}.html`),
      "utf-8"
    );
    data = data.replace(teg, dataFromComponents);
  }

  return data;
}

innerText(path.join(__dirname, "template.html")).then((data) => {
  fs.writeFile(
    path.join(__dirname, "project-dist", "index.html"),
    data,
    "utf-8",
    (err) => {
      if (err) console.log(err);
    }
  );
});

function createDir(url, dirName) {
  fs.mkdir(path.join(url, dirName), { recursive: true }, callback);
}

createDir(__dirname, "project-dist");
copyDirectory(
  "assets",
  __dirname,
  "assets",
  path.join(__dirname, "project-dist")
);
bundleStyles(
  path.join(__dirname, "styles"),
  path.join(__dirname, "project-dist"),
  "style.css"
);
