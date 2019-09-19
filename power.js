'use strict';

const TIME_IN = 5;
const TIME_HOLD = 4 * TIME_IN;
const TIME_OUT = 2 * TIME_IN;
const TIME_PAUSE = 1;


let $button = $('#big-button');
let $buttonText = $('#button-text');
let $buttonPausedText = $('#button-paused-text');
let $countNumber = $('#count-number');

let start = new Date;
let endTime;
let isOngoing = false;
let isPaused = true;
let timeLeftBeforePause;

let count = 0;
let phase = 0;
const phaseSeconds = [TIME_IN, TIME_HOLD, TIME_OUT];
const colors = ["green", "yellow", "red"];
const transitionTexts = ["NOW HOLD IT", "NOW EXHALE", "NOW INHALE"];
const transitionColor = "lightgray";

function getSecondsRemaining() {
    let msRemaining = endTime - Number(new Date) + 25;
    return Math.floor(msRemaining / 1000);
}

function applyPhase() {
    start = new Date;
    setTimeForNextPhase();
    $button.css("background-color", colors[phase]);
}

function updateTimer() {
    if (!isPaused) {
        let timeRemaining = getSecondsRemaining();
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
}

function pauseTimer() {
    timeLeftBeforePause = getSecondsRemaining();
    isPaused = true;
    showPausedText();
}

function unpauseTimer() {
    setEndTimeInSecondsFromNow(timeLeftBeforePause);
    isPaused = false;
    hidePausedText();
    updateTimer();
}

function setEndTimeInSecondsFromNow(timeSeconds) {
    endTime = Number(new Date) + timeSeconds * 1000;
}

function setTimeForNextPhase() {
    setEndTimeInSecondsFromNow(phaseSeconds[phase]);
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
    isPaused = false;
    isOngoing = true;
    setTimeForNextPhase();
    updateTimer();
    // $button.attr("disabled", true);
    count = 0;
    phase = 0;
}


$button.click(function () {
    if(isOngoing){
        if(isPaused) unpauseTimer();
        else pauseTimer();
    } else {
        initButton();
        setInterval(updateTimer, 1000);
    }
});

function hidePausedText() {
    $buttonPausedText.css('display', 'none');
}

function showPausedText() {
    $buttonPausedText.css('display', '');
}

$(document).ready(function () {
    hidePausedText();
    applyPhase();
});
