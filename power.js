'use strict';

const TIME_IN = 5;
const TIME_HOLD = 4 * TIME_IN;
const TIME_OUT = 2 * TIME_IN;
const TIME_PAUSE = 1;


let $button = $('#big-button');
let $buttonText = $('#button-text');
let $countNumber = $('#count-number');

let start = new Date;
let endTime;

let count = 0;
let phase = 0;
const phaseSeconds = [TIME_IN, TIME_HOLD, TIME_OUT];
const colors = ["green", "yellow", "red"];
const transitionTexts = ["NOW HOLD IT", "NOW EXHALE", "NOW INHALE"];
const transitionColor = "lightgray";

function getSecondsRemaining(endTime) {
    let msRemaining = endTime - Number(new Date) + 25;
    return Math.floor(msRemaining / 1000);
}

function applyPhase() {
    start = new Date;
    setEndTime();
    $button.css("background-color", colors[phase]);
}

function updateTimer() {
    let timeRemaining = getSecondsRemaining(endTime);
    if (timeRemaining === 0) {
        $buttonText.text(transitionTexts[phase]);
        $button.css("background-color", transitionColor);
    } else if (timeRemaining < 0) {
        incrementPhase();
        applyPhase();
    } else {
        $buttonText.text(timeRemaining + " Seconds");
    }
}

function setEndTime() {
    endTime = Number(new Date) + phaseSeconds[phase] * 1000;
}


function incrementPhase() {
    let phaseCount = phaseSeconds.length;
    if (phase === phaseCount - 1) {
        phase = 0;
        incrementCounter()
    } else {
        phase++;
    }
}

function incrementCounter() {
    $countNumber.text(++count);
}

function initButton() {
    setEndTime();
    updateTimer();
    $button.attr("disabled", true);
    count = 0;
    phase = 0;
}


$button.click(function () {
    initButton();
    setInterval(updateTimer, 1000);
});

$(document).ready(function () {
    let a = $("body");
    applyPhase();
    console.log(a);
});
