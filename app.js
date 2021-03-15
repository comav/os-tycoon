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

server.get('/data', function (req, res) {
  let dataPath = path.join(__dirname, 'assets', 'data', 'data') + '.json';
  let data = fs.readFileSync(dataPath, 'utf-8');
  res.send(data);
})

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

// catch 404 and forward to error handler
server.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// server.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.server.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

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