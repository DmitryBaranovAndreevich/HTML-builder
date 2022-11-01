const fsPromises = require("fs/promises");
const path = require("path");
const fs = require("fs");

async function readDir(file) {
  try {
    const pathFile = path.join(__dirname, file);
    const files = await fsPromises.readdir(pathFile, {
      encoding: "utf-8",
      withFileTypes: true,
    });
    for (const data of files) {
      if (data.isDirectory()) readDir(path.join(file, data.name));
      else{
      fs.stat(path.join(pathFile, data.name), (error, stats) => {
        if (error) {
          console.log(error);
        } else {
          const priv = path.basename(data.name).split('.')
          if (stats.isFile()) console.log(`${priv[0]} - ${priv[1]} - ${stats.size / 1024}kb`);}
      });
    }
    }
  } catch (err) {
    console.log(err);
  }
}

readDir("secret-folder");
