class Timer {
    constructor(clock, laps, start) {
        this.intervalLength = 100;
        this.clock = clock;
        this.laps = laps;
        this.start = start;
        this.lapStart;
        this.interval;
        this.initialize();
        this.checkLocalStorage();
    }

    startButtonClicked() {
        if(!this.started) {
            this.startTimer();
            this.start.innerHTML = 'Pause';
            this.start.classList.toggle("bg-green-500");
            this.start.classList.toggle("hover:bg-green-700");
        } else {
            this.pauseTimer();
            if(this.paused) {
                this.start.innerHTML = 'Start';
                this.start.classList.toggle("bg-green-500");
                this.start.classList.toggle("hover:bg-green-700");
            } else {
                this.start.innerHTML = 'Pause';
                this.start.classList.toggle("bg-green-500");
                this.start.classList.toggle("hover:bg-green-700");
            }
        }
    }

    startTimer() {
        let t = this;
        console.log('start time');
        this.interval = setInterval(
            function(){ t.updateTime();}
            , this.intervalLength);
        this.started = !this.started;
    }

    pauseTimer() {
        console.log('pause time');
        this.paused = !this.paused;
    }

    resetTime() {
        console.log('reset time');
        clearInterval(this.interval);
        clock.innerHTML = "00:00:00";
        laps.innerHTML = "";
        this.initialize();
    }

    updateTime() {
        if(!this.paused) {
            this.time += this.intervalLength;
            let format = this.formatTime(this.time);
            this.clock.innerHTML = format;
            localStorage.setItem('time', JSON.stringify(this.time));
        }
    }

    formatTime(value) {
        //console.log('format time');
        var seconds = value / 1000;
        var hours = parseInt( seconds / 3600 );
        seconds = seconds % 3600;
        var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
        seconds = seconds % 60;
        seconds = Math.round(seconds * 10) / 10;
        seconds = parseFloat(seconds).toFixed(1);
        if(minutes < 10) {
            minutes = '0' + minutes;
        }
        if(seconds < 10) {
            seconds = '0' + seconds;
        }
        if(hours < 10) {
            hours = '0' + hours;
        }
        return hours + ":" + minutes + ":" + seconds;
    }

    lapTimes() {
        let lapTime = this.time - this.lapStart;
        this.laps.innerHTML += '<p class="text-xl m-2">Lap ' + this.lapCounter + ': ' + this.formatTime(lapTime) + '</p>';
        this.lapStart = this.time;
        let laps = JSON.parse(localStorage.getItem('laps'));
        laps[laps.length] = this.formatTime(lapTime);
        localStorage.setItem('laps', JSON.stringify(laps));
        this.lapCounter++;
    }

    initialize() {
        this.time = 0;
        this.started = false;
        this.paused = false;
        this.start.innerHTML = "Start";
        this.lapStart = 0;
        this.lapCounter = 1;
    }
    
    checkLocalStorage() {
        if(localStorage.getItem('laps') !== null && localStorage.getItem('time') !== null) {
            let laps = JSON.parse(localStorage.getItem('laps'));
            console.log(laps.length);
            this.time = JSON.parse(localStorage.getItem('time'));
            let format = this.formatTime(this.time);
            this.clock.innerHTML = format;
            this.lapCounter = laps.length + 1;
            for(let i = 0; i < laps.length; i++) {
                console.log(laps[i]);
                this.laps.innerHTML += '<p class="text-xl m-2">Lap ' + (i+1) + ': ' + laps[i] + '</p>';
            }
        } else {
            localStorage.setItem('laps','[]');
        }
    }
}