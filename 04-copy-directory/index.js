const fs = require("fs");
const path = require("path");
const fsPromises = require("fs/promises");

function copyDirectory(name,wayToOriginDirectory = __dirname, nameToCopy = `${name}-copy`, wayToCopyDirectory = __dirname) {
  function callback(err) {
    if (err) throw err;
  }

  async function readDir(url) {
    return fsPromises.readdir(url, {
      encoding: "utf-8",
      withFileTypes: true,
    });
  }

  function createDir(url, dirName) {
    fs.mkdir(path.join(url, dirName), { recursive: true }, callback);
  }

  async function copyDir(url, urlToCopy) {
    const files = await readDir(url);
    for (const file of files) {
      if (file.isDirectory()) {
        createDir(urlToCopy, file.name);
        copyDir(path.join(url, file.name), path.join(urlToCopy, file.name));
      } else {
        fs.copyFile(
          path.join(url, file.name),
          path.join(urlToCopy, file.name),
          callback
        );
      }
    }
  }

  createDir(wayToCopyDirectory, nameToCopy);
  copyDir(
    path.join(wayToOriginDirectory, name),
    path.join(wayToCopyDirectory, nameToCopy)
  );
}

copyDirectory("files");


module.exports = {copyDirectory};