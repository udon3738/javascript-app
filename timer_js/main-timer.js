(function () {
  'use strict';

  var timer = document.getElementById('timer');
  var min = document.getElementById('min');
  var sec = document.getElementById('sec');
  var start = document.getElementById('start');
  var reset = document.getElementById('reset');

  var startTime;
  var timeLeft;
  var timeTocountDown = 0;
  var timerID;
  var isRunning = false;

  function updatetimer(t) {
    var d = new Date(t);
    var m = d.getMinutes();
    var s = d.getSeconds();
    var ms = d.getMilliseconds();
    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    ms = ('0' + ms).slice(-3);

    timer.textContent = m + ':' + s + '.' + ms;
  }

  function countDown() {
    timerID = setTimeout(function() {
      var elapsedTime = Date.now() - startTime;
      timeLeft = timeTocountDown - elapsedTime;
      console.log(timeLeft);
      if(timeLeft < 0){
        isRunning = false;
        start.textContent = 'start';
        clearTimeout(timerID);
        timeLeft = 0;
        timeTocountDown = 0;
        updatetimer(timeLeft);
        return;
      }
      updatetimer(timeLeft);
      countDown();

    } ,10);
  }

  start.addEventListener('click', function() {
    if(isRunning === false){
      isRunning = true;
      start.textContent = 'stop';
      startTime = Date.now();
      countDown();
    }else{
      isRunning = false;
      start.textContent = 'start';
      timeTocountDown = timeLeft;
      clearTimeout(timerID);
    }
  });

  min.addEventListener('click', function() {
    if(isRunning === true){
      return;
    }
    timeTocountDown += 60 * 1000;
    if(timeTocountDown >= 60 * 60 * 1000){
      timeTocountDown = 0;
    }
    updatetimer(timeTocountDown);
  });

  sec.addEventListener('click', function() {
    if(isRunning === true){
      return;
    }
    timeTocountDown += 1000;
    //console.log(timeTocountDown);
    if(timeTocountDown >= 60 * 60 * 1000){
      timeTocountDown = 0;
    }
    updatetimer(timeTocountDown);
  });

  reset.addEventListener('click', function() {
    timeTocountDown = 0;
    updatetimer(timeTocountDown);
  });

}) ();
