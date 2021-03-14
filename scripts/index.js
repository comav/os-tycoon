var localStorage = window.localStorage;
var progress = 0;
var employees = [];
var tech, design, bugs, news, data, feedback, isOk;
var money = 214; //random value
//some debug vars ahead
let time = 3234;
let companyName = 'AppleSoft';
let osName = 'Window X';

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

function showBubbles() {
    $('.bubble').css('display', 'block');
}

function getChart(width, heigth, winosShare, mcosShare, linuxShare) {
    let reqUrl = '//localhost:3000/chart?width=' + width + '?heigth=' + heigth + '?winosShare=' + winosShare + '?mcosShare=' + mcosShare + '?linuxShare=' + linuxShare;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', reqUrl, true);
    xhr.send;
    xhr.onload(() => {
        chart = xhr.response;
    });
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

function generateSeed(length) {
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
        let avatar = generateSeed(10);
        let resultEmployee = {
            "name": name,
            "age": age,
            "gender": gender,
            "designSkill": designSkill,
            "techSkill": techSkill,
            "salary": salary,
            "avatar": avatar,
            "avatarImage": undefined
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
        let avatar = generateSeed(10);
        let resultEmployee = {
            "name": name,
            "age": age,
            "gender": gender,
            "designSkill": designSkill,
            "techSkill": techSkill,
            "salary": salary,
            "avatar": avatar,
            "avatarImage": undefined
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
    for (let i = 0; i <= employees.length; i++) {
        console.log('uno');
        var employeeInfo = document.createElement('div');
        var employeeAvatar = document.createElement('img');
        employeeAvatar.setAttribute('src', employees[i].avatarImage);
        employeeAvatar.setAttribute('width', '100px');
        employeeAvatar.setAttribute('heigth', '100px');
        employeeInfo.innerText = employees[i].name + ', ' + employees[i].gender + ', ' + employees[i].age + ', ' + 'Design skill: ' + employees[i].designSkill + ', ' + 'Tech skill: ' + employees[i].techSkill + ', ' + '$' + employees[i].salary;
        document.getElementById(listId).appendChild(employeeInfo);
    }
}

function clicked(at) {
    clickedElement = '#' + at;
    $(clickedElement).css('background-color', 'white');
}

// function updateAvatars(number) {
//     for (let i = 0; i = number; i++) {
//         let url = '127.0.0.1:3000/avatar/' + employees[i].gender + '/' + employees[i].avatar;
//         let image;
//         fetch(url)
//             .then(function (r) {
//                 return r.blob();
//             })
//             .then(function (r) {
//                 image = r;
//             })
//         employees[i].avatarImage = image;
//     }
// }

//let interval = 10000;

function saveGame() {
    console.log('Saving game');
    let sendData = {};
    sendData.time = time;
    sendData.employees = employees;
    sendData.companyName = companyName;
    sendData.money = money;
    sendData.osName = osName;

    const response = fetch('http://127.0.0.1:3000/save', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendData)
    })
}
