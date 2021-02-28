const Avatars = require('@dicebear/avatars');
const maleSprites = require('@dicebear/avatars-male-sprites');
const femaleSprites = require('@dicebear/avatars-female-sprites');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const cors = require('cors')

//const chartRouter = require('./routers/chartRouter');

const server = express();

const { app, BrowserWindow } = require('electron');

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));

server.get('/data', function (req, res) {
  let data = fs.readFileSync(dataPath, 'utf-8');
  res.send(data);
})

server.get('/avatar/:gender/:seed', function (req, res) {
  let gender = req.params.gender;
  let seed = req.params.seed;
  let svg;
  let avatars;
  let options = {};
  switch (gender) {
    case 'male':
      options = {};
      avatars = new Avatars(options, maleSprites);
      svg = avatars.create(seed);
      break;
    case 'female':
      options = {};
      avatars = new Avatars(options, femaleSprites);
      svg = avatars.create(seed);
      break;
  }
  res.sendFile(svg);
})

// catch 404 and forward to error handler
server.use(function (req, res, next) {
  next(createError(404));
});

// error handler
server.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.server.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

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

server.listen(3000);

module.exports = server;