const newTaskBtn = document.getElementsByClassName('new-task-btn');
const taskList = document.getElementsByTagName('ol');

const setTasks = (position, task) => {
  const taskField = document.createElement('div');
  const taskItem = document.createElement('li');
  const trashBtn = document.createElement('button');
  const trashIcon = document.createElement('img');

  taskItem.textContent = task;

  taskField.classList.add('list-item');
  taskField.appendChild(taskItem);
  taskField.appendChild(trashBtn);
  trashBtn.appendChild(trashIcon);

  trashBtn.classList.add('trash-btn');
  trashIcon.setAttribute('src', '/src/images/fi_trash-2.svg');
  trashIcon.setAttribute('alt', '');
  trashIcon.classList.add('trash-icon');

  taskList[position].appendChild(taskField);
}

if (localStorage.getItem('day-tasks') === null) {
  localStorage.setItem('day-tasks', JSON.stringify(['Item 1', 'Item 2', 'Item 3']));

  const tasks = JSON.parse(localStorage.getItem('day-tasks'));

  tasks.forEach((task) => setTasks(0, task));
} else {
  const tasks = JSON.parse(localStorage.getItem('day-tasks'));

  tasks.forEach((task) => setTasks(0, task));
}

if (localStorage.getItem('night-tasks') === null) {
  localStorage.setItem('night-tasks', JSON.stringify(['Item 1', 'Item 2', 'Item 3']));

  const tasks = JSON.parse(localStorage.getItem('night-tasks'));

  tasks.forEach((task) => setTasks(1, task));
} else {
  const tasks = JSON.parse(localStorage.getItem('night-tasks'));

  tasks.forEach((task) => setTasks(1, task));
}

const createTask = (position) => {
  const inputField = document.createElement('div');
  const input = document.createElement('input');
  const button = document.createElement('button');

  newTaskBtn[position].setAttribute('disabled', 'disabled')

  inputField.classList.add('list-item');

  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Digite uma tarefa');

  button.textContent = '+';
  button.classList.add('add-task-btn');
  button.style.color = '#fff';

  taskList[position].appendChild(inputField);
  inputField.appendChild(input);
  inputField.appendChild(button);
}

newTaskBtn[0].addEventListener('click', () => createTask(0));
newTaskBtn[1].addEventListener('click', () => createTask(1));

const addTask = (position, button) => {
  const taskField = button.parentNode;
  const input = button.previousSibling;
  const task = document.createElement('li');
  const trashBtn = document.createElement('button');
  const trashIcon = document.createElement('img');

  task.textContent = input.value;

  taskField.removeChild(input);
  taskField.removeChild(button);
  newTaskBtn[position].removeAttribute('disabled');

  taskField.appendChild(task);
  taskField.appendChild(trashBtn);
  trashBtn.appendChild(trashIcon);

  trashBtn.classList.add('trash-btn');
  trashIcon.setAttribute('src', '/src/images/fi_trash-2.svg');
  trashIcon.setAttribute('alt', '');
  trashIcon.classList.add('trash-icon');

  const tasks = JSON.parse(localStorage.getItem(`${position === 0 ? 'day' : 'night'}-tasks`));
  tasks.push(task.textContent);
  localStorage.setItem(`${position === 0 ? 'day' : 'night'}-tasks`, JSON.stringify(tasks));
}

taskList[0].addEventListener('click', (event) => {
  const { target } = event;

  if (target.classList.contains('add-task-btn')) {
    addTask(0, target);
  }
});

taskList[1].addEventListener('click', (event) => {
  const { target } = event;

  if (target.classList.contains('add-task-btn')) {
    addTask(1, target);
  }
});

const removeTask = (position, target) => {
  if (target.classList.contains('trash-icon')) {
    target = target.parentNode;
  }

  const taskField = target.parentNode;
  const list = taskField.parentNode;

  list.removeChild(taskField);

  const tasks = JSON.parse(localStorage.getItem(`${position === 0 ? 'day' : 'night'}-tasks`));
  const task = taskField.firstChild.textContent;
  const index = tasks.indexOf(task);
  tasks.splice(index, 1);
  localStorage.setItem(`${position === 0 ? 'day' : 'night'}-tasks`, JSON.stringify(tasks));
}

taskList[0].addEventListener('click', (event) => {
  const { target } = event;

  if (target.classList.contains('trash-btn') || target.classList.contains('trash-icon')) {
    removeTask(0, target);
  }
});

taskList[1].addEventListener('click', (event) => {
  const { target } = event;

  if (target.classList.contains('trash-btn') || target.classList.contains('trash-icon')) {
    removeTask(1, target);
  }
});