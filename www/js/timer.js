//Initialization of data
var sessionTimer = null;

var snd = new Audio("sound/beep.mp3");
uiInitialization();

$().ready(function() {

  //Setup the onlick functions for the increment and decrement functions
  $("#incrementSessionTime").click(function() {

    var minutes = parseInt($("#sessionTimeInMinutes").html());

    $("#sessionTimeLabel").html("minutes");

    $("#sessionTimeInMinutes").html(minutes + 1);
    setTimerUIMinutes(minutes +1);
  });

  $("#decrementSessionTime").click(function() {
    var minutes =
      parseInt($("#sessionTimeInMinutes").html());

    if (minutes <= 2) {
      $("#sessionTimeLabel").html("minute");
    } else {
      $("#sessionTimeLabel").html("minutes");
    }

    if (minutes > 1) {

      $("#sessionTimeInMinutes").html(minutes - 1);
      setTimerUIMinutes(minutes - 1);
    }
  });

  $("#incrementBreakTime").click(function() {
    var minutes = parseInt($("#breakTimeInMinutes").html());
    $("#breakTimeInMinutes").html(minutes + 1);

    $("#breakTimeLabel").html("minutes");
  });

  $("#decrementBreakTime").click(function() {
    var minutes =
      parseInt($("#breakTimeInMinutes").html());

    if (minutes <= 2) {
      $("#breakTimeLabel").html("minute");
    } else {
      $("#breakTimeLabel").html("minutes");
    }

    if (minutes > 1) {

      $("#breakTimeInMinutes").html(minutes - 1);
    } else {

    }
  });

  $("#startSessionBtn").click(function() {
    if ($("#startSessionBtn").html() === 'Start session') {

      //Initialize the timer components
      //Set the Circle Timer UI Progress to 0
      setSessionCanvas(1, "#888888");
      $("#pauseSessionBtn").prop("disabled", false);
      $("#pauseSessionBtn").html('Pause session');
      $("#startSessionBtn").html('Stop Session');
      
                  $("#incrementSessionTime").prop("disabled", true);
      $("#decrementSessionTime").prop("disabled", true);
      $("#incrementBreakTime").prop("disabled", true);
      $("#decrementBreakTime").prop("disabled", true);

      
      

      var htmlSessionTimeMinutes = $("#sessionTimeInMinutes").html();
      var htmlBreakTimeMinutes = $("#breakTimeInMinutes").html();
      window.sessionTimer = new session(htmlSessionTimeMinutes * 60, htmlBreakTimeMinutes * 60);
      sessionTimer.start();
    } else {
      $("#startSessionBtn").html('Start session');
      $("#pauseSessionBtn").prop("disabled", true);
      $("#pauseSessionBtn").html('Pause session');
      
            $("#incrementSessionTime").prop("disabled", false);
      $("#decrementSessionTime").prop("disabled", false);
      $("#incrementBreakTime").prop("disabled", false);
      $("#decrementBreakTime").prop("disabled", false);

      
      sessionTimer.stop();
    }

  });

  $("#pauseSessionBtn").click(function() {
    if ($("#pauseSessionBtn").html() === 'Pause session') {

      sessionTimer.pause();
      $("#pauseSessionBtn").html('Resume session');
    } else {
      sessionTimer.resume();
      $("#pauseSessionBtn").html('Pause session');
    }

  });

});

function session(sessionMinutes, breakMinutes) {

  var self = this;
  this.sessionTimeInMinutes = sessionMinutes;
  this.breakTimeInMinutes = breakMinutes;
  this.currentTimerType = 'Session'; //Session|Break
  this.sessionTimer = new Timer("sessionTimer");

  this.start = function() {
    self.sessionTimer.start(self.sessionTimeInMinutes, 1000);
  }
  this.startWithTicks = function(ticks) {
    self.sessionTimer.start(ticks, 1000);
  }
  this.pause = function() {
    self.sessionTimer.pause();
  }
  this.resume = function() {
    self.sessionTimer.resume();
  }

  this.stop = function() {
    self.sessionTimer.stop();
  }

  this.changeTimer = function() {
    if (self.currentTimerType === 'Session') {
      self.currentTimerType = 'Break';
      self.sessionTimer = new Timer("sessionTimer");
      self.startWithTicks(self.breakTimeInMinutes);
    } else {
      self.currentTimerType = 'Session';
      self.sessionTimer = new Timer("sessionTimer");
      self.startWithTicks(self.sessionTimeInMinutes);
    }

  }

}

//Add Event Lister to monitor state
window.addEventListener('onStateChangedsessionTimer', function(e) {
  console.log('Timer1 state changed', e.detail);
  $("#timer1Status").html(e.detail);
  if (e.detail === 'Finished') {
    snd.play();
    setSessionCanvas(1, "#888888");
    sessionTimer.changeTimer();
    
    if(sessionTimer.currentTimerType==='Break')
     {
        $("#timerNameLabel").html('Break');
 $("#timerNameLabel").css('color', '#ff0000');
     }
     else
       {
                 $("#timerNameLabel").html('Session');
 $("#timerNameLabel").css('color', '#3370d4');
       }
    
  }
  if (e.detail === 'Stopped') {
    //Reset the Timer UI to selection
    uiInitialization();
  }

});

//Add Event Lister to monitor time
window.addEventListener('onTimeChangedsessionTimer', function(e) {
  var remainingSeconds = e.detail - (Math.floor(e.detail / 60) * 60);
  var remainingMinutes = Math.floor(e.detail / 60);
  if (remainingSeconds < 10) {

    $("#timer1Seconds").html('0' + remainingSeconds.toString());
  } else {
    $("#timer1Seconds").html(remainingSeconds.toString());
  }
  if (remainingMinutes < 10) {
    $("#timer1Minutes").html('0' + remainingMinutes.toString());
  } else {
    $("#timer1Minutes").html(remainingMinutes);
  }

  if (sessionTimer.currentTimerType === 'Session') {
    var precentageLeft = parseFloat(1 - (e.detail / sessionTimer.sessionTimeInMinutes));
    setSessionCanvas(precentageLeft, "#3370d4");
  } else {
    var precentageLeft = parseFloat(1 - (e.detail / sessionTimer.breakTimeInMinutes));
    setSessionCanvas(precentageLeft, "#ff0000");
  }

});

function Timer(name) {
  //Use self to reference the object internally
  var self = this;
  var setTimeOutVar = null;
  this.name = name;
  this.totalTime = null;
  this.remainingTime = null;
  this.millisecondInterval = null;

  //Used to keep track of state of timer.
  //Valid options are: Initialized|Running|Paused|Stopped|Finished
  this.state = 'Initialized';

  this.initializeTimer = function() {
    self.state = 'Initialized';
    self.stateChanged('Initialized');

  }

  this.start = function(totalTicks, timeOutInterval) {
    if (self.state === 'Initialized' || self.state === 'Stopped') {
      //Set the state to running
      self.totalTime = totalTicks;
      self.remainingTime = totalTicks;
      self.millisecondInterval = timeOutInterval;
      self.state = 'Running';
      self.stateChanged(self.state);

      setTimeOutVar = setInterval(self.go, self.millisecondInterval);
    }
  }

  this.pause = function() {
    if (self.state === 'Running') {
      self.state = 'Paused';
      self.stateChanged(self.state);
      //Clear the interval
      clearInterval(setTimeOutVar);
    }

  }

  this.resume = function() {
    if (self.state === 'Paused') {
      self.state = 'Running';
      self.stateChanged(self.state);
      setTimeOutVar = setInterval(self.go, self.millisecondInterval);

    }
  }

  this.stop = function() {
    self.state = 'Stopped';
    self.stateChanged(self.state);
    clearInterval(setTimeOutVar);
  }

  this.go = function() {

    //Fire the state changed event    
    self.remainingTime -= 1;
    self.timeChanged(self.remainingTime);

    if (self.remainingTime === 0) {
      self.state === 'Finished';
      self.stateChanged('Finished');
      clearInterval(setTimeOutVar);
    }

  }

  //Javascript Event used to track time changes
  this.timeChanged = function(state) {
      var evt = new CustomEvent('onTimeChanged' + this.name, {
        detail: state
      });
      window.dispatchEvent(evt);
    }
    //Javascript Event used to track timer state changes
  this.stateChanged = function(state) {
    var evt = new CustomEvent('onStateChanged' + this.name, {
      detail: state
    });
    window.dispatchEvent(evt);
  }

}

function setSessionCanvas(precentage, color) {
  var c = document.getElementById("sessionCircle");
  var ctx = c.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.lineWidth = 5;

  ctx.clearRect(175 - 150 - ctx.lineWidth,
    175 - 150 - ctx.lineWidth,
    150 * 2 + (ctx.lineWidth * 2),
    150 * 2 + (ctx.lineWidth * 2));

  ctx.strokeStyle = "#888888";
  ctx.beginPath();
  ctx.arc(175, 175, 150, (Math.PI / 2), (Math.PI / 2) + (2 * Math.PI));
  ctx.stroke();
  ctx.closePath();

  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(175, 175, 150, (Math.PI / 2), (Math.PI / 2) + (2 * Math.PI * precentage));

  ctx.stroke();
  ctx.closePath();

}

function setTimerUIMinutes(minutes) {
  if (minutes < 10) {
    $("#timer1Minutes").html('0' + minutes.toString());
  } else {
    $("#timer1Minutes").html(minutes);
  }
}

function setTimerUISeconds(seconds) {
  if (seconds < 10) {
    $("#timer1Seconds").html('0' + seconds.toString());
  } else {
    $("#timer1Seconds").html(seconds.toString());
  }
}

function uiInitialization()
{
  setSessionCanvas(1, "#888888");
$("#pauseSessionBtn").prop("disabled", true);
setTimerUIMinutes($("#sessionTimeInMinutes").html());
setTimerUISeconds(0);
 $("#timerNameLabel").html('Session');
 $("#timerNameLabel").css('color', '#3370d4');
  

}