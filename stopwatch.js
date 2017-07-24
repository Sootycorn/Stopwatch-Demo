// Global variables - array
var pastTimes = [];
// Global variables - time variables
var ms = 0;
var sec = 0;
var min = 0;
var interval;
var started = false;
// Global variables to get HTML elements
var msEl = document.getElementById('miliseconds');
var secEl = document.getElementById('seconds');
var minEl = document.getElementById('minutes');
var saved = document.getElementById('pastTimes');

// Event Listeners to handle restart() and reload() and startTimer() functions
document.getElementById('startStop').addEventListener('click', startTimer);
document.getElementById('restart').addEventListener('click', restart);
document.getElementById('recordTime').addEventListener('click', saveFunc);

// Adding keypress for S, T, R.
document.addEventListener('keydown', function(e) {
  if(e.key == 's' || e.key == 'S') {
    startTimer();
  }
  if(e.key == 't' || e.key == 'T') {
    saveFunc();
  }
  if(e.key == 'r' || e.key == 'R') {
    restart();
  }
})

// Function to start and stop the time
function startTimer() {
  //Starts the timer
  if (started == false) {
    interval = setInterval(function() {
      // Updating seconds when miliseconds are 100
      if (ms === 100) {
        sec ++;
        ms = 0;
        secEl.innerHTML = sec + ':';
      }
      // Updating minutes when seconsd are 60
      else if (sec === 60) {
        min += 1;
        sec = 0;
        minEl.innerHTML = min + ':';
      }
      // Updating milisecnods
      else {
        ms += 1;
        msEl.innerHTML = ms;
      }
    },10)
    started = true;
  }
  //Stops the timer
  else {
    clearInterval(interval);
    started = false;
  }
}

// function to reset the timer
function restart() {
  location.reload();
}

// function to save the time to an array
function saveFunc(){
    //Prevent to save time if not started
    if(min == 0 && sec == 0 && ms == 00) {
      // Giving a warning
      saved.innerHTML = 'You need to start the timer first!';
      //Removing warning after 2 seconds
      setTimeout(function() {
        //after a 500 ms delay
        saved.innerHTML = '';
      },2000);
      return; //Return in order not to render()
    }
    else if(min == 0 && sec == 0) {
      pastTimes.unshift(ms + ' Milliseconds');
    }
    else if(min == 0) {
      pastTimes.unshift(sec + ' Seconds, ' + ms + ' Milliseconds');
    }
    else {
      pastTimes.unshift(min + ' Minutes, ' + sec + ' Seconds, ' + ms + ' Milliseconds');
    }
    render();
}

// Function to print saved array objects to document
function render() {
  saved.innerHTML = '';
  for(i = 0; i < pastTimes.length; i++) {
    var savedTime = pastTimes[i];
    saved.innerHTML += '<div class="well well-sm">' + savedTime + '</div>';
  }
}
