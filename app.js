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

server.get('/chart', (req, res) => {
  const { ChartJsNodeCanvas } = require('chartjs-node-canvas');

  let winosPart = request.query.winos;
  let mcosPart = request.query.mcos;
  let linuxPart = request.query.linux;

  const width = req.query.width;
  const height = req.query.heigth;
  const canvas = new ChartJsNodeCanvas({ width, heigth });
  (async () => {
    const config = {
      type: 'pie',
      data: {
        labels: ['WinOS', 'McOs', 'Linux'],
        datasets: [{
          label: 'OS share',
          data: [winosPart, mcosPart, linuxPart],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'],
          borderWidth: 1,
          borderAlign: 'left'
        }]
      },
      options: {
        legend: {
          display: true,
          position: 'right'
        },
        mantainAspectRatio: false,
        responsive: false
      }
    };
    var dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);
  })();

  console.log(dataUrl);
  response.send(dataUrl);
});

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

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
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