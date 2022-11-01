const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const readline = require("readline");

function writeFile(data = '') {
fs.appendFile(path.join(__dirname, "text.txt"),data,"utf-8", (err) => {if(err)console.log(err)});
}

writeFile();
stdout.write("Здравствуйте, введите данные и нажмите ENTER:\n");
const rl = readline.createInterface({input: stdin, output: stdout})
rl.on('line', data => {
  if(data == 'exit') {
   rl.close()
  }
  else writeFile(data.toString() + '\n');
})
rl.on('close', ()=> {stdout.write("Ввод данных закончен. Удачи!!!!");})