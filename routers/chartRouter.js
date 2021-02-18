const express = require('express');
const router = express.Router();
const { ChartJsNodeCanvas } = require('chartjs-node-canvas');
const { response, request } = require('../app');

let winosPart = request.query.winos;
let mcosPart = request.query.mcos;
let linuxPart = request.query.linux;

const width = req.query.width;
const height = req.query.heigth;
const canvas = new ChartJsNodeCanvas({width, heigth});
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

module.exports = router;