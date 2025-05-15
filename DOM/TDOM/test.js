const hour = document.getElementById("hour");
const minute = document.getElementById("minutes");
const second = document.getElementById("seconds");
const ampmElem = document.getElementById("ampm");

function updateClock() {
  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();
  let ampm = "AM";

  if (h == 12) {
    ampm = "PM";
  } else if (h > 12) {
    h - 12;
    ampm = "PM";
  } else {
    h = h;
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  hour.innerText = h;
  minute.innerText = m;
  second.innerText = s;
  ampmElem.innerText = ampm;

  setTimeout(() => {
    updateClock();
  }, 1000);
}
updateClock();

const now = new Date();
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

function updateCalender() {
  let d = new Date().getDate();
  let m = new Date().getMonth() +1;
  let y = new Date().getFullYear();

  day.innerText = d;
  month.innerText = m;
  year.innerText = y;

  setTimeout(() => {
    updateCalender();
  }, 1000);
}
updateCalender();
