const quoteText = document.getElementById('quoteText');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const goalInput = document.getElementById('goalInput');
const addGoalBtn = document.getElementById('addGoalBtn');
const goalList = document.getElementById('goalList');
const notesArea = document.getElementById('notesArea');
const saveNotesBtn = document.getElementById('saveNotesBtn');
const saveMessage = document.getElementById('saveMessage');
const appInfo = document.getElementById('appInfo');

function getGoals() {
  return JSON.parse(localStorage.getItem('focusboard-goals') || '[]');
}

function saveGoals(goals) {
  localStorage.setItem('focusboard-goals', JSON.stringify(goals));
}

function renderGoals() {
  const goals = getGoals();
  goalList.innerHTML = '';

  goals.forEach((goal, index) => {
    const li = document.createElement('li');
    if (goal.completed) li.classList.add('completed');

    const text = document.createElement('span');
    text.textContent = goal.text;

    const actions = document.createElement('div');
    actions.className = 'goal-actions';

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = goal.completed ? 'Undo' : 'Done';
    toggleBtn.onclick = () => {
      goals[index].completed = !goals[index].completed;
      saveGoals(goals);
      renderGoals();
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
      goals.splice(index, 1);
      saveGoals(goals);
      renderGoals();
    };

    actions.appendChild(toggleBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(text);
    li.appendChild(actions);
    goalList.appendChild(li);
  });
}

addGoalBtn.addEventListener('click', () => {
  const text = goalInput.value.trim();
  if (!text) return;

  const goals = getGoals();
  goals.push({ text, completed: false });
  saveGoals(goals);
  goalInput.value = '';
  renderGoals();
});

saveNotesBtn.addEventListener('click', () => {
  localStorage.setItem('focusboard-notes', notesArea.value);
  saveMessage.textContent = 'Notes saved successfully.';
  setTimeout(() => {
    saveMessage.textContent = '';
  }, 2000);
});

async function loadQuote() {
  const response = await fetch('/api/quote');
  const data = await response.json();
  quoteText.textContent = data.quote;
}

async function loadAppInfo() {
  const response = await fetch('/api/info');
  const data = await response.json();
  appInfo.textContent = JSON.stringify(data, null, 2);
}

newQuoteBtn.addEventListener('click', loadQuote);

function loadNotes() {
  notesArea.value = localStorage.getItem('focusboard-notes') || '';
}

renderGoals();
loadNotes();
loadQuote();
loadAppInfo();
