'use strict';

const TIME_IN = 5;
const TIME_HOLD = 4 * TIME_IN;
const TIME_OUT = 2 * TIME_IN;
const TIME_PAUSE = 1;


let $button = $('#big-button');
let $buttonText = $('#button-text');

let start = new Date;
let endTime = new Date("Jan 5, 2021 15:37:25").getTime();

let count;
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
    endTime = Number(start) + phaseSeconds[phase] * 1000;
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



function incrementPhase() {
    let phaseCount = phaseSeconds.length;
    if (phase === phaseCount - 1) {
        phase = 0;
    } else {
        phase++;
    }
}


$button.click(function () {
    updateTimer();
    $button.attr("disabled", true);
    setInterval(updateTimer, 1000);
    count = 0;
    phase = 0;


});

$(document).ready(function () {
    let a = $("body");
    applyPhase();
    console.log(a);
});
