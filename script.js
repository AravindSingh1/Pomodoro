const SELECT = document.getElementById("selector");
const WORKRANGE = document.getElementById("rangeWork");
const WORKTIME = document.getElementById("workTime");
const TIMERTYPE = document.getElementById("timerType");
const SHORTBREAKTIME = document.getElementById("shortBreakTime");
const SHORTBREAKRANGE = document.getElementById("rangeShortBreak");
const MIN = document.getElementById("min");
const SEC = document.getElementById("sec");
const PLAY = document.getElementById("start");
const INFOCONTENT = document.getElementById("info-content");
var totalTime = 0;
var clicked = false;
var audio = new Audio('FM9B3TC-alarm.mp3');

function options() {
    if(!clicked){
        SELECT.style.transform = "translateX(0)";
        document.getElementById("setting").style.rotate = "-90deg";
        clicked = true;
    }
    else{
        SELECT.style.transform = "translateX(100%)";
        document.getElementById("setting").style.rotate = "0deg";
        clicked = false;
    }
}

function changeWork() {
    WORKTIME.textContent = WORKRANGE.value;
    MIN.textContent = WORKRANGE.value;
    SEC.textContent = "00";
}
function changeShortBrake(){
    SHORTBREAKTIME.textContent = SHORTBREAKRANGE.value;
}

function pausePlayButton() {
    if(!clicked){
        PLAY.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        timeDecrease();
        clicked = true;
    }
    else{
        PLAY.innerHTML = `<i class="fa-solid fa-play">`;
        clicked = false;
        clearInterval(timer);
    }
}

var work = true;
var shortBreak = false;
var longBreak = false;
var shortBreakCount = 0;
var timer;
function timeDecrease() {
    var totalTime = (MIN.textContent*60)+ +SEC.textContent;
    timer = setInterval(function() {
        totalTime--;
        if (totalTime<0) {
            audio.play();
            if (work) {
                if (shortBreakCount==5) {
                    work = false;
                    longBreak = true;
                    TIMERTYPE.textContent = "Long break";
                    MIN.textContent = `03`;
                    SEC.textContent = `00`;
                } else {
                    work = false;
                    shortBreak = true;
                    shortBreakCount++;
                    TIMERTYPE.textContent = "Short break";
                    MIN.textContent = SHORTBREAKRANGE.value;
                }
            } else if (shortBreak) {
                shortBreak = false;
                work = true;
                TIMERTYPE.textContent = "Work";
                MIN.textContent = WORKRANGE.value;
            } else if (longBreak) {
                shortBreakCount = 0;
                longBreak = false;
                work = true;
                TIMERTYPE.textContent = "Work";
                MIN.textContent = WORKRANGE.value;
            }
            clearInterval(timer);
            timeDecrease();
        }
        else {
            MIN.textContent = Math.floor(totalTime/60).toString().padStart(2, '0');
            SEC.textContent = `${(totalTime%60)}`.padStart(2, '0');
        }
    }, 50)
}

function reset() {
    if(work){
        MIN.textContent = WORKRANGE.value;
        SEC.textContent = "00";
        clearInterval(timer);
    }
    else if(shortBreak){
        MIN.textContent = SHORTBREAKRANGE.value;
        SEC.textContent = "00";
        clearInterval(timer);
    }
    else if(longBreak){
        MIN.textContent = "3";
        SEC.textContent = "00";
        clearInterval(timer);
    }
}

function displayInfo() {
    INFOCONTENT.style.scale = "1";
}
function disappearInfoContent() {
    INFOCONTENT.style.scale = "0";
}

function dark() {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    document.querySelector(".wrapper").backgroundColor = "rgba(255, 255, 255, 0.1)";
}

function pomodoro() {
    document.body.style.backgroundColor = "#FF6969";
    document.querySelector(".wrapper").backgroundColor = "rgba(255, 255, 255, 0.1)";
}