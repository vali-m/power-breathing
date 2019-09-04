'use strict'

const TIME_IN = 5;
const TIME_HOLD = 4 * TIME_IN;
const TIME_OUT = 2 * TIME_IN;
const TIME_PAUSE = 1;


let $button = $('#big-button');
let $buttonText = $('#button-text');

let start = new Date;
let endTime = new Date("Jan 5, 2021 15:37:25").getTime();

let count;
let phase;
const phases = [TIME_IN, TIME_HOLD, TIME_OUT];

function getSecondsRemaining(endTime) {
    let msRemaining = endTime - new Date;
    return Math.floor(msRemaining / 1000);
}

function updateTimer(){
    // $('.Timer').text((new Date - start) / 1000 + " Seconds");
    let timeRemaining = getSecondsRemaining(endTime);
    $buttonText.text(timeRemaining + " Seconds");
}

function incrementPhase() {
    let phaseCount = phases.length;
    if(phase = phaseCount - 1){
        phase = 0;
    }
    else {
        phase++;
    }
}



$("#big-button").click(function() {
    updateTimer()
    $button.attr("disabled", true);
    setInterval(updateTimer, 1000);
    count = 0;
    phase = 0;


})

$( document ).ready(function() {
    let a = $("body");

    console.log(a);
});
