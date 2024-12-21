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

// Task Management
const toDoInput = document.querySelector('#todo-input');
const toDoList = document.querySelector('#todo-list');

// Spotify Token
const spotifyPlaylistId = '0xOz7fGuXhzVIVZmDmpqdt'; // Token Spotify tetap

// Save state to localStorage
function saveState() {
    const state = {
        studyTime,
        breakTime,
        timeLeft,
        isTimerRunning,
        tasks: Array.from(toDoList.children).map((task) => ({
            text: task.querySelector('.task-text').textContent.trim(),
            completed: task.classList.contains('completed'),
        })),
    };
    localStorage.setItem('studyAppState', JSON.stringify(state));
}

// Load state from localStorage
function loadState() {
    const savedState = JSON.parse(localStorage.getItem('studyAppState'));
    if (savedState) {
        studyTime = savedState.studyTime;
        breakTime = savedState.breakTime;
        timeLeft = savedState.timeLeft;
        isTimerRunning = savedState.isTimerRunning;
        document.querySelector('#study-time').value = studyTime;
        document.querySelector('#break-time').value = breakTime;
        timerDisplay.textContent = formatTime(timeLeft);

        savedState.tasks.forEach((task) => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <button class="complete-btn">Complete</button>
                <button class="delete-btn">Delete</button>
            `;
            if (task.completed) {
                li.classList.add('completed');
            }
            toDoList.appendChild(li);
            li.querySelector('.complete-btn').addEventListener('click', () => {
                li.classList.toggle('completed');
                saveState();
            });
            li.querySelector('.delete-btn').addEventListener('click', () => {
                toDoList.removeChild(li);
                saveState();
            });
        });

        if (isTimerRunning) {
            startTimer(); // Restart timer if it was running
        }
    }
}

// Format time to MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Timer functionality
pomodoroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    studyTime = parseInt(document.querySelector('#study-time').value);
    breakTime = parseInt(document.querySelector('#break-time').value);
    timeLeft = studyTime * 60;
    timerDisplay.textContent = formatTime(timeLeft);
    saveState();
});

startButton.addEventListener('click', () => {
    if (!isTimerRunning) {
        isTimerRunning = true;
        startTimer();
        saveState();
    }
});

stopButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    isTimerRunning = false;
    saveState();
});

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = formatTime(timeLeft);
            saveState();
        } else {
            clearInterval(timerInterval);
            isTimerRunning = false;
            alert('Session over! Time for a break.');
            saveState();
        }
    }, 1000);
}

// Add Task functionality
document.querySelector('#add-todo').addEventListener('click', () => {
    const task = toDoInput.value.trim();
    if (task) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            <span class="task-text">${task}</span>
            <button class="complete-btn">Complete</button>
            <button class="delete-btn">Delete</button>
        `;
        toDoList.appendChild(li);
        toDoInput.value = '';
        li.querySelector('.complete-btn').addEventListener('click', () => {
            li.classList.toggle('completed');
            saveState();
        });
        li.querySelector('.delete-btn').addEventListener('click', () => {
            toDoList.removeChild(li);
            saveState();
        });
        saveState();
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    createSpotifyEmbed(spotifyPlaylistId);
});
