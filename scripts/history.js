let day = 1;
let month = 4;
let year = 1975;

function changeTime() {
    setInterval(() => {
        day++;
        console.log("Day: " + day);
        console.log("Month: " + month)
        let isOddMonth = month % 2
        if (isOddMonth = 0 && (day = 30)) {
            month++;
            day = 1;
        }
    }, 1500)
}