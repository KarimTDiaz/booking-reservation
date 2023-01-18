const calendarElement = document.getElementById('calendar');
const dinnersElement = document.getElementById('dinners');
const rootStyles = document.documentElement.style;

const isLeap = () => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const date = new Date();

let year = date.getFullYear();
let month = date.getMonth();
let day = date.getDate();
let allNumericDays;
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
console.log(firstDay.getDay());

const createCalendar = () => {
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < weekDays.length; index++) {
    const weekDayCalendar = document.createElement('div');
    weekDayCalendar.textContent = weekDays[index];
    fragment.append(weekDayCalendar);
  }

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
    let column;
    if (firstDay.getDay() === 0) column = 7;
    else column = firstDay.getDay();

    rootStyles.setProperty('--first-day-column', column);
  }
  calendarElement.append(fragment);
  allNumericDays = document.querySelectorAll('.day');
};

const selectedDay = day => {
  if (!day.classList.contains('day') || day.classList.contains('disabled'))
    return;
  allNumericDays.forEach(day => {
    day.classList.remove('selected');
  });
  day.classList.add('selected');
};

const getDayOfWeek = day => new Date(year, month, day).getDay();

const dinnerSelect = day => {
  if (day.classList.contains('disabled')) return;
  dinnersElement.removeAttribute('disabled');
  const dinnersFragment = document.createDocumentFragment();

  const dinnersOptions = document.createElement('option');
  dinnersOptions.textContent = 'dinner';
  dinnersFragment.append(dinnersOptions);
  dinnersElement.append(dinnersFragment);
};

const dinnerSelectOptions = () => {};

createCalendar();

calendarElement.addEventListener('click', ev => {
  selectedDay(ev.target);
  dinnerSelect(ev.target);
  dinnerSelectOptions();
  getTheWeekDay = getDayOfWeek(ev.target.textContent);
});
