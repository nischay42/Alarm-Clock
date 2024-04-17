const time = document.getElementById("time");
const menu = document.querySelectorAll("select");
let setAlarmBtn = document.querySelector("#btn");
let alarmCount = 0;
let alarmTime;
let alarmListArr = [];
let activeAlarms = 0;
let maxAlarms = 5;
let switchon = document.getElementById("switchOn");
let switchoff = document.getElementById("switchOFF");

const ring = new Audio("ringtone.mp3");

function on() {
  ring.play();
}

function off() {
  ring.pause();
}

for (let i = 12; i > 0; i--) {
  let option = `<option>${i}</option>`;
  menu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  let option = `<option>${i}</option>`;
  menu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  let option = `<option>${i}</option>`;
  menu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  menu[3].firstElementChild.insertAdjacentHTML("afterend", option);
}

function realTime() {
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();

  let period = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  time.innerText = `${h}:${m}:${s} ${period}`;

  for (let i = 0; i < alarmListArr.length; i++) {
    if (alarmListArr[i] == `${h}:${m}:${s} ${period}`) {
      console.log("Alarm ringing...");
      ring.load();
      ring.play();
    }
  }
}

realTime();
setInterval(realTime, 100);

function setAlarm() {
  if (alarmCount >= maxAlarms) {
    alert("You can only set up to 5 alarms.");
    return;
  }

  let time = `${menu[0].value}:${menu[1].value}:${menu[2].value} ${menu[3].value}`;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Please, select a valid time to set Alarm!");
  } else {
    alarmCount++;
    document.querySelector(".alarmList").innerHTML += `
    <div class="alarm" id="${alarmCount}">
      <div class="cancleAl">
        <button class="cancleAlarm" id="${alarmCount}" onclick="deleteAlarm(this.id)">x</button>
      </div>
      <div class="Alarmtime" id="span${alarmCount}">${time}</div>
      <div class="checkbox">
        <button class="switchOn" id="switchOn" onclick="on()">On</button>
        <button class="switchOff" id="switchOFF" onclick="off()">Off</button>
      </div>
    </div>`;

    alarmTime = `${menu[0].value}:${menu[1].value}:${menu[2].value} ${menu[3].value}`;
    alarmListArr.push(alarmTime);
    console.log(document.querySelector(".cancleAlarm").value);
  }
}

setAlarmBtn.addEventListener("click", setAlarm);
setAlarmBtn.addEventListener("click", addClass);

//delete alarm

function deleteAlarm(click_id) {
  var element = document.getElementById(click_id);
  var deleteIndex = alarmListArr.indexOf(
    document.querySelector("#span" + click_id).innerText
  );
  alarmListArr.splice(deleteIndex, 1);
  element.remove();
  alarmCount -= 1;
  ring.pause();
}