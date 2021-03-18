const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const bodyParser = require('body-parser');

const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('userData/db.json');
const db = lowdb(adapter);

const cors = require('cors');

//const chartRouter = require('./routers/chartRouter');

const server = express();

const { app, BrowserWindow } = require('electron');

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(express.static(path.join(__dirname, 'public')));

server.post('/save', function (res, req) {
  console.log('Autosaving.....');
  let time = res.body.time;
  let employees = res.body.employees;
  console.log(employees);
  db.set('employees', employees)
    .write();
  console.log('Autosave Comleted!');
  console.log(db.get('employees').value());
})

server.get('/data', function (req, res) {
  let dataPath = path.join(__dirname, 'assets', 'data', 'data') + '.json';
  let data = fs.readFileSync(dataPath, 'utf-8');
  res.send(data);
})

server.get('/quit', (req,res) => {
  app.quit();
})

server.get('/load-audio', (res,req) => {
  let audioPath = path.join(__dirname, 'assets', 'music');
  let audio = Array.from([audioPath + '/bg1.mp3', audioPath + '/bg2.mp3', audioPath + '/keyboard.mp3']);
  res.json(audio);
})

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

//app.disableHardwareAcceleration();

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

server.listen(3000);
module.exports = server;