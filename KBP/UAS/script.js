const token = 'BQC6-3UCpSRfg0MRwdXxFYzhX24rQKqvTgp_sv8hW_m3jNcxFRxQ_0feczDHsMYhELoy09pJBu-ulnndm8N-CMQx_luCTKBz7Rgraq-U-Xy5ZIEA8p6YFcFWyGgLIN2Pd4rPXUbcD3RXxzN_7RQpxBESwwDqn_3NINJTV77kI95ZBgG6X-ptiwPUMAJdVw75RFsjtRibXDLEQpxF612DXn9C9Rx87uO5NVfSDd6smqW9uhsIhevZ6qpLPmIGfz2s5c2bfK-w6R-GElnFwDJQzq3kL2GPWreU';
const playlistId = '0xOz7fGuXhzVIVZmDmpqdt'; // Default Playlist ID

// Timer Settings
const pomodoroForm = document.querySelector('#pomodoro-settings-form');
const startButton = document.querySelector('#start-timer');
const stopButton = document.querySelector('#stop-timer');
const timerDisplay = document.querySelector('#timer-display');

let studyTime = 25;
let breakTime = 5;
let timeLeft = studyTime * 60;
let timerInterval;
let isTimerRunning = false;

pomodoroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    studyTime = parseInt(document.querySelector('#study-time').value);
    breakTime = parseInt(document.querySelector('#break-time').value);
    timeLeft = studyTime * 60;
    timerDisplay.textContent = `${studyTime.toString().padStart(2, '0')}:00`;
    alert('Timer settings updated!');
});

startButton.addEventListener('click', () => {
    if (!isTimerRunning) {
        startTimer();
        isTimerRunning = true;
    }
});

stopButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    isTimerRunning = false;
});

function startTimer() {
    const updateTimer = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (timeLeft === 0) {
            alert('Session over! Time for a break.');
            clearInterval(timerInterval);
            isTimerRunning = false;
            timeLeft = studyTime * 60;
            timerDisplay.textContent = `${studyTime.toString().padStart(2, '0')}:00`;
        } else {
            timeLeft--;
        }
    };

    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

// Task Management
const toDoInput = document.querySelector('#todo-input');
const toDoList = document.querySelector('#todo-list');

document.querySelector('#add-todo').addEventListener('click', () => {
    const task = toDoInput.value.trim();
    if (task) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `${task} <button class="complete-btn">Complete</button> <button class="delete-btn">Delete</button>`;
        toDoList.appendChild(li);
        toDoInput.value = '';
        li.querySelector('.complete-btn').addEventListener('click', () => {
            li.classList.toggle('completed');
        });
        li.querySelector('.delete-btn').addEventListener('click', () => {
            toDoList.removeChild(li);
        });
    }
});

// Spotify Embed
function createSpotifyEmbed(playlistId) {
    const spotifyEmbedContainer = document.getElementById('spotify-embed-container');
    spotifyEmbedContainer.innerHTML = ''; // Clear container

    const iframe = document.createElement('iframe');
    iframe.title = 'Spotify Embed: Recommendation Playlist';
    iframe.src = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
    iframe.width = '100%';
    iframe.height = '360';
    iframe.style.borderRadius = '12px';
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.loading = 'lazy';

    spotifyEmbedContainer.appendChild(iframe);
}

document.addEventListener('DOMContentLoaded', () => {
    createSpotifyEmbed(playlistId);
});
