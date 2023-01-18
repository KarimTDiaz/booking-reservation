const calendarElement = document.getElementById('calendar')

const isLeap = () =>{
    year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
const date = new Date()
let year = date.getFullYear()
let month = date.getMonth()
let day = date.getDate()
let allNumericDays=[];

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

const months = ['january','february','march','april','may','june','july','august','september','october','november','december'];

const createCalendar = () =>{
    const fragment = document.createDocumentFragment();

    for (let index = 1; index < monthsAndDays[months[month]] +1; index++) {
        const dayCalendar = document.createElement('div')
        dayCalendar.classList.add('day')
        fragment.append(dayCalendar)
        dayCalendar.textContent = index
        allNumericDays.push(index)

        if(index < day){
            dayCalendar.classList.add('disabled')
        }else if(day === index){
            dayCalendar.classList.add('today')
        }
    }
    calendarElement.append(fragment)
  
}
createCalendar()

const selectedDay = (day) =>{
  day.classList.add('selected')

}

calendarElement.addEventListener('click' , (ev) =>{
    selectedDay(ev.target)
   }
)
