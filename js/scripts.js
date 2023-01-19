const calendarElement = document.getElementById('calendar');
const dinnersElement = document.getElementById('dinners');
const turnsElement = document.getElementById('shift') 
const formElement = document.getElementById('form')
const rootStyles = document.documentElement.style;

const isLeap = () => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const date = new Date();

let year = date.getFullYear();
let month = date.getMonth();
let day = date.getDate();
let allDaysOfMonth;
let getTheWeekDay;

const firstDay = new Date(year, month, '1');

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
const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
];
const weekend = [5 , 6 , 0];

/* FUNCION PARA CREAR CALENDARIO */
const createCalendar = () => {
  const fragment = document.createDocumentFragment();

  /* BUCLE PARA CREAR E IMPRIMIR DIAS DE LA SEMANA */
  for (let index = 0; index < weekDays.length; index++) {
    const weekDayCalendar = document.createElement('div');
    weekDayCalendar.textContent = weekDays[index];
    fragment.append(weekDayCalendar);
  }
/* BUCLE PARA CREAR LOS DIVS CON LOS DIAS DEL MES */
  for (let index = 1; index <= monthsAndDays[months[month]]; index++) {
    const dayCalendar = document.createElement('div');
    dayCalendar.classList.add('day');
    fragment.append(dayCalendar);
    dayCalendar.textContent = index;

    if (index < day) {
      dayCalendar.classList.add('disabled');
    } else if (day === index) {
      dayCalendar.classList.add('today');
    }

    if (index === 1) {
      dayCalendar.classList.add('first-day');
    }
    /* IF PARA COLOCAR EL CALENDARIO */

    let column;
    if (firstDay.getDay() === 0) column = 7;
    else column = firstDay.getDay();

    rootStyles.setProperty('--first-day-column', column);
  }

  calendarElement.append(fragment);
  allDaysOfMonth = document.querySelectorAll('.day');
};



/* FUNCION PARA APLICAR BORDE AMARILLO EN EL DIA QUE SELECCIONE */
const selectedDay = day => {
  if (!day.classList.contains('day') || day.classList.contains('disabled'))
    return;
  allDaysOfMonth.forEach(day => {
    day.classList.remove('selected');
  });
  day.classList.add('selected');
};

/* FUNCIONES PARA EL SELECT DE DINNERS */
const getDayOfWeek = day => new Date(year, month, day).getDay();

const dinnerSelect = day => {
  const dinnersFragment = document.createDocumentFragment();

  for (let index = 0; index <= day; index++) {
    const dinnersOptions = document.createElement('option');
    dinnersOptions.textContent = index + ' Dinners'
    if(index === 0){
        dinnersOptions.textContent = 'Number Of Dinners'
    }else if(index === 1){
        dinnersOptions.textContent = index + ' Dinner'
    }
    dinnersOptions.value = index
    dinnersFragment.append(dinnersOptions);
  }
  dinnersElement.append(dinnersFragment);
};

const dinnerSelectOptions = (day) => {
    dinnersElement.innerHTML = '';
    /* if (day.classList.contains('disabled')) return; */
    if(weekend.includes(day)){
        dinnersElement.append(dinnerSelect(15))
    }else{
        dinnersElement.append(dinnerSelect(8))
    }
    dinnersElement.removeAttribute('disabled');

};

createCalendar();

/* FUNCIONES PARA EL SELECT DE LOS TURNOS */
const turnSelect = turns =>{
    const turnFragment = document.createDocumentFragment();

    for (let index = 0; index < turns.length ; index++) {
        const turnOptions = document.createElement('option')
         
        turnFragment.append(turnOptions)  
    }
    turnsElement.append(turnFragment)
}

const turnSelectOptions = (day) =>{
    if(day !== 0){
      turnsElement.append(turnSelect(2))
    } else{
      turnsElement.append(turnSelect(1))
    }
    
}

calendarElement.addEventListener('click', ev => {
  selectedDay(ev.target);
  /* dinnerSelect(ev.target); */
  getTheWeekDay = getDayOfWeek(ev.target.textContent);
  dinnerSelectOptions(getTheWeekDay);
  turnSelectOptions(getTheWeekDay)
});

formElement.addEventListener('change', ev =>{

    turnsElement.removeAttribute('disabled')
    
})
