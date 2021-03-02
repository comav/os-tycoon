const Avatars = require('@dicebear/avatars');
const maleSprites = require('@dicebear/avatars-male-sprites');
const femaleSprites = require('@dicebear/avatars-female-sprites');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const cors = require('cors')

const server = express();

const { app, BrowserWindow } = require('electron');

let dataPath = path.join(__dirname, 'assets/data/data.min.json');

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));

server.get('/data', function (req, res) {
  let data = fs.readFileSync(dataPath, 'utf-8');
  res.send(data);
})

server.get('/save/')

// server.get('/avatar/:gender/:seed', function (req, res) {
//   let gender = req.params.gender;
//   let seed = req.params.seed;
//   let avatar;
//   if (gender == 'male') {
//     let options = {};
//     let avatars = new Avatars(maleSprites, options);
//     let result = avatars.create(seed);
//     avatar = result;
//   } if (gender == 'female') {
//     let options = {};
//     let avatars = new Avatars(femaleSprites, options);
//     let result = avatars.create(seed);
//   } else {
//     console.log('error');
//   }
//   res.sendFile(avatar);
// })

server.listen(3000);

console.log('Server is running at port 3000');
// electron part
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, 'assets/os-icons/icon-1.png')
  })

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})

module.exports = server;