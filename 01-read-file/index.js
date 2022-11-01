const fs = require("fs");
const path = require("path");

const inputStream = fs.createReadStream(
  path.join(__dirname, "text.txt"),
  "utf-8"
);
let result = "";
inputStream.on("data", (chunk) => (result = result + chunk));
inputStream.on("end", () => console.log(result));
inputStream.on("error", (error) => console.log("Error", error.message));
