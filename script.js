(function(){
    let startButton = document.getElementById('start');
    let resetButton = document.getElementById('reset');
    let lapButton = document.getElementById('lap');
    let clock = document.getElementById('clock');
    let laps = document.getElementById('laps');

    let timer = new Timer(clock, laps, start);

    startButton.addEventListener('click', function(e) {
        timer.startButtonClicked();
    });

    resetButton.addEventListener('click', function(e) {
        timer.resetTime();
    });

    lapButton.addEventListener('click', function(e) {
        timer.lapTimes();
    });

})();