const express = require("express");
const { execSync } = require('child_process');
const compareImages = require('resemblejs/compareImages');
const fs = require("mz/fs");

const app = express();

app.use(express.static('public'))
app.set('view engine', 'jade');
app.get("/genTest", (req, res) => {
  console.log('se atiende')
  execSync('npm test', info);
  console.log('termina')
  
  var pathDir = getDateString();
  execSync("mkdir .\\public\\"+pathDir, info);
  execSync("move .\\cypress\\screenshots\\*.* .\\public\\"+pathDir,info);
  getDiff(pathDir);
  fs.appendFileSync('folders.data', pathDir+'|', 'utf8');
  var folders= fs.readFileSync('folders.data').toString().split('|'); 
  console.log(folders)
  res.render("index", {folders: folders});
  console.log('termina')
  
});
app.get("/", (req, res) => {
  res.render("index", {folders: []});
});

app.listen(8080, 'localhost', () => {
  console.log(`Server running`);
});

function getDateString(dt){
  var dt = new Date();
  // Display the month, day, and year. getMonth() returns a 0-based number.
  var month = dt.getMonth()+1;
  var day = dt.getDate();
  var year = dt.getFullYear();
  var hour = dt.getHours();
  var minute = dt.getMinutes();
  var second = dt.getSeconds();
  return year + '-' + month + '-' + day + ' ' + hour + '.' + minute + '.' + second;
}

async function getDiff(pathDir){
    const options = {
        ignore: ['less'],
    };
    const data = await compareImages(
        await fs.readFile('./public/'+pathDir+'/1.png'),
        await fs.readFile('./public/'+pathDir+'/2.png'),
        options
    );

    await fs.writeFile('./public/'+pathDir+'/3.png', data.getBuffer());
}

function info(error, stdout, stderr) {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  
  console.log('=============================');
  console.log(`stdout: ${stdout}`);
  console.log('=============================');
  console.log(`stderr: ${stderr}`);
  console.log('=============================');
}

