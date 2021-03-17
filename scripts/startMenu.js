$('.topLayer').hide();

function newGame() {
    $('.main-menu').hide();
    $('.topLayer').show();
}

function quitGame() {
    fetch('http://127.0.0.1:3000/quit');
}

let startButton = document.getElementById('start-button');
let quitButton = document.getElementById('quit-button');

let body = document.getElementById('body');

startButton.onmouseover = startButton.onmouseout = handler;
quitButton.onmouseover = quitButton.onmouseout = handler;

function handler(event) {
    console.log(event.target.id);
    switch (event.target.id) {
        case 'start-button':
            if (event.type == 'mouseover') {
                event.target.style.background = 'green';
                body.style.background = 'linear-gradient(180deg, rgba(9,121,15,0.7) 0%, rgba(67,255,0,0) 100%)';
              }
            if (event.type == 'mouseout') {
                event.target.style.background = '';
                body.style.background = '';
            }
            break;
        case 'quit-button':
            if (event.type == 'mouseover') {
                event.target.style.background = 'red';
                body.style.background = 'linear-gradient(0deg, rgba(255,0,0,1) 0%, rgba(255,0,0,0) 100%)';
              }
              if (event.type == 'mouseout') {
                event.target.style.background = '';
                body.style.background = '';
              }
        break;
    }
  
}