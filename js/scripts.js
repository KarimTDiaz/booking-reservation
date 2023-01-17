const calendarElement = document.getElementById('calendar')

const isLeap = () =>{
    year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
const date = new Date()
let year = date.getFullYear()

const monthsAndDays = {
    january: 31,
    february: isLeap(year) ? 29 : 28,
    march: 31,
    april: 30,
    may: 31,
    june: 30,
    july: 31,
    august: 31,
    september: 30,
    october: 31,
    november: 30,
    december: 31
};
const months = ['january','february',]

const createCalendar = () =>{
    

}
