var localStorage = window.localStorage;
<<<<<<< HEAD
var tech, design, bugs;
var news = [];
var data;
=======
var progress = 0;
var tech, design, bugs, news, data, feedback, isOk;
>>>>>>> ecd276e (Infobar prototype)

function changeTab(tabId) {
    let tabs = Array.from(document.getElementsByClassName('tab'));
    currentTab = document.getElementById(tabId);
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
    }
    currentTab.style.display = 'block';
}

//code that runs on load
changeTab("home");
$('.bubble').css('display', 'none');
$.getJSON("/assets/data/data.json", function (obtainedData) {
    console.log('asd');
    data = obtainedData;
})


function showBubbles() {
    $('.bubble').css('display', 'block');
}

function osChart() {
    localStorage.setItem('windos', '78');
    localStorage.setItem('mcos', '19');
    localStorage.setItem('linux', '3');
    var ctx = document.getElementById('os-chart');
    var OSChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['WinOS', 'McOs', 'Linux'],
            datasets: [{
                label: 'OS share',
                data: [localStorage.getItem('windos'), localStorage.getItem('mcos'), localStorage.getItem('linux')],
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
    }) 

}

<<<<<<< HEAD
=======
function generateRandomNum(min, max) {
    let i = Math.random() * (max - min) + min;
    return Math.round(i);
}

function changeProgress (percentage) {
    if (typeof percentage != 'number'){
        console.error('Percentage must to be number!')
        return;
    } else {
        document.getElementById('progress').style.width = percentage + '%';
        return;
    }
}
>>>>>>> ecd276e (Infobar prototype)
