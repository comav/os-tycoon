

var localStorage = window.localStorage;
var progress = 0;
var employees = [];
var tech, design, bugs, news, data, feedback, isOk;

function changeTab(tabId) {
    let tabs = Array.from(document.getElementsByClassName('tab'));
    currentTab = document.getElementById(tabId);
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
    }
    if (tabId == 'feedback') {
        currentTab.style.display = 'flex';
    } else {
        currentTab.style.display = 'block';
    }
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

function getFeedback() {
    var randomNum = generateRandomNum(0, 11);
    document.getElementById('feedbackText').innerText = data.feedbacks[randomNum].title;
    document.getElementById('rating').innerText = data.feedbacks[randomNum].rating;
}

function generateRandomNum(min, max) {
    let i = Math.random() * (max - min) + min;
    return Math.round(i);
}

function generateSeed(lenght) {
    var generatedSeed = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    for (var i = 0; i < 15; i++) {
        generatedSeed += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return generatedSeed;
}

function changeProgress(percentage) {
    if (typeof percentage != 'number') {
        console.error('Percentage must to be number!')
        return;
    } else {
        document.getElementById('progress').style.width = percentage + '%';
        return;
    }
}

function generateEmployee() {
    var gender = data.employees.gender[generateRandomNum(0, 1)];
    if (gender == "male") {
        let name = data.employees.male.names[generateRandomNum(0, 99)] + ' ' + data.employees.surnames[generateRandomNum(0, 199)];
        let age = generateRandomNum(20, 43);
        let techSkill = generateRandomNum(1, 10);
        let designSkill = generateRandomNum(1, 10);
        let salary = ((techSkill + designSkill) / 2) * 100;
        let avatar = 'https://avatars.dicebear.com/api/' + 'male/' + generateSeed(10) + '.svg';
        let resultEmployee = {
            "name": name,
            "age": age,
            "gender": gender,
            "designSkill": designSkill,
            "techSkill": techSkill,
            "salary": salary,
            "avatar": avatar
        }
        employees.push(resultEmployee);
        console.log('1 ' + gender + ' employee was generated');
        return;
    } if (gender == "female") {
        let name = data.employees.female.names[generateRandomNum(0, 99)] + ' ' + data.employees.surnames[generateRandomNum(0, 199)];
        let age = generateRandomNum(20, 43);
        let techSkill = generateRandomNum(1, 10);
        let designSkill = generateRandomNum(1, 10);
        let salary = (techSkill * designSkill) * 50;
        let avatar = 'https://avatars.dicebear.com/api/' + 'female/' + generateSeed(10) + '.svg';
        let resultEmployee = {
            "name": name,
            "age": age,
            "gender": gender,
            "designSkill": designSkill,
            "techSkill": techSkill,
            "salary": salary,
            "avatar": avatar
        }
        employees.push(resultEmployee);
        console.log('1 ' + gender + ' employee was generated');
        return;
    }
}

function switchList(listId) {
    var currentTab = document.getElementById(listId);
    $('.list').css('display', 'none');
    currentTab.style.display = 'block';
    console.log('yee');
    for (let i = 0; i < employees.length; i++) {
        console.log('uno');
        var employeeInfo = document.createElement('div');
        var employeeAvatar = document.createElement('img');
        employeeAvatar.setAttribute('src', employees[i].avatar);
        employeeAvatar.setAttribute('width', '100px');
        employeeAvatar.setAttribute('heigth', '100px');
        employeeInfo.innerText = employees[i].name + ', ' + employees[i].gender + ', ' + employees[i].age + ', ' + 'Design skill: ' + employees[i].designSkill + ', ' + 'Tech skill: ' + employees[i].techSkill + ', ' + '$' + employees[i].salary;
        employeeInfo.appendChild(employeeAvatar);
        document.getElementById(listId).appendChild(employeeInfo);
    }
}

function clicked(at) {
    clickedElement = '#' + at;
    $(clickedElement).css('background-color', 'white');
}

function generateAvatar() {

}