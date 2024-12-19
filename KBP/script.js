// --- Pomodoro Timer ---
const pomodoroForm = document.querySelector('#pomodoro-settings-form');
const startButton = document.querySelector('#start-timer');
const stopButton = document.querySelector('#Stop-timer'); // Stop Timer button
const timerDisplay = document.querySelector('#timer-display');
const spotifyButton = document.querySelector('#play-spotify');

let studyTime = 25; // Default study time in minutes
let breakTime = 5; // Default break time in minutes
let timeLeft = studyTime * 60; // Start with study time
let timerInterval;
let isTimerRunning = false; // Flag to track timer state

pomodoroForm.addEventListener('submit', (e) => {
  e.preventDefault();
  studyTime = parseInt(document.querySelector('#study-time').value);
  breakTime = parseInt(document.querySelector('#break-time').value);
  timeLeft = studyTime * 60; // Update timeLeft to reflect the new study time
  `timerDisplay.textContent = ${studyTime.toString().padStart(2, '0')}:00`;
  alert('Timer settings updated!');
});

startButton.addEventListener('click', () => {
  if (!isTimerRunning) {
    startTimer();
    isTimerRunning = true;
  }
});

stopButton.addEventListener('click', () => {
  clearInterval(timerInterval); // Stop the timer
  isTimerRunning = false; // Mark timer as stopped
});

spotifyButton.addEventListener('click', () => {
  const spotifyURL = 'https://open.spotify.com/playlist/37i9dQZF1DWZjqjZMudx9T'; // Spotify Playlist
  window.open(spotifyURL, '_blank');
});

const startTimer = () => {
  const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    `timerDisplay.textContent = ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (timeLeft === 0) {
      alert('Session over! Time for a break or new task.');
      clearInterval(timerInterval);
      isTimerRunning = false;
      timeLeft = studyTime * 60; // Reset time for the next session
      `timerDisplay.textContent = ${studyTime.toString().padStart(2, '0')}:00`;
    } else {
      timeLeft--;
    }
  };

  clearInterval(timerInterval); // Clear any existing intervals before starting a new one
  timerInterval = setInterval(updateTimer, 1000); // Start the new timer
};

// --- To-Do List ---
const toDoInput = document.querySelector('#todo-input');
const toDoList = document.querySelector('#todo-list');
const addToDoButton = document.querySelector('#add-todo');

const loadToDos = () => {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach(todo => renderToDoItem(todo.text, todo.completed));
};

const saveToDos = () => {
  const todos = [];
  document.querySelectorAll('#todo-list li').forEach(item => {
    todos.push({
      text: item.querySelector('.todo-text').textContent,
      completed: item.classList.contains('completed')
    });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
};

const renderToDoItem = (text, completed = false) => {
  const li = document.createElement('li');
  li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  li.classList.toggle('completed', completed);

  const span = document.createElement('span');
  span.textContent = text;
  span.classList.add('todo-text');
  li.appendChild(span);

  const buttonGroup = document.createElement('div');
  buttonGroup.classList.add('btn-group');

  const completeButton = document.createElement('button');
  completeButton.textContent = '✔';
  completeButton.classList.add('btn', 'btn-success', 'btn-sm');
  completeButton.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveToDos();
  });
  buttonGroup.appendChild(completeButton);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '❌';
  deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
  deleteButton.addEventListener('click', () => {
    li.remove();
    saveToDos();
  });
  buttonGroup.appendChild(deleteButton);

  li.appendChild(buttonGroup);

  // Tambahkan item dengan efek transisi
  toDoList.appendChild(li);

  // Menambahkan kelas 'appear' untuk memicu animasi transisi
  setTimeout(() => {
    li.classList.add('appear');
  }, 10);
};

addToDoButton.addEventListener('click', () => {
  const text = toDoInput.value.trim();
  if (text) {
    renderToDoItem(text);
    saveToDos();
    toDoInput.value = '';
  }
});

// Initialize application
loadToDos();