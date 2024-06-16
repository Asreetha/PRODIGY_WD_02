let startTime;
let running = false;
let pausedTime = 0;
let lapCounter = 0;

const display = document.getElementById('display');
const laps = document.getElementById('laps');

let animationFrameId;

function startTimer() {
    if (!running) {
        startTime = Date.now() - pausedTime;
        animationFrameId = requestAnimationFrame(updateTime);
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        cancelAnimationFrame(animationFrameId);
        pausedTime = Date.now() - startTime;
        running = false;
    }
}

function resetTimer() {
    cancelAnimationFrame(animationFrameId);
    running = false;
    pausedTime = 0;
    display.innerHTML = "00:00:00";
    laps.innerHTML = "";
    lapCounter = 0;
}

function updateTime() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    hours = padTime(hours);
    minutes = padTime(minutes);
    seconds = padTime(seconds);

    display.innerHTML = `${hours}:${minutes}:${seconds}`;

    animationFrameId = requestAnimationFrame(updateTime);
}

function lapTimer() {
    if (running) {
        lapCounter++;
        const lapTime = display.innerHTML;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapItem);
    }
}

function padTime(time) {
    return time < 10 ? `0${time}` : time;
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', lapTimer);
