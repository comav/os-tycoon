var localStorage = window.localStorage;
var tech, design, bugs;
var news = [];
var data;

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
$('.bubble').css('display','none');
$.getJSON("/assets/data/data.json", function(obtainedData){
    console.log('asd');
    data = obtainedData;
})


function showBubbles () {
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
        }
    })

}

