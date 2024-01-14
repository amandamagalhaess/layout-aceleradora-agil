const newTaskBtn = document.getElementsByClassName('new-task-btn');
const taskList = document.getElementsByTagName('ol');

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

const removeTask = (target) => {
  if (target.classList.contains('trash-icon')) {
    target = target.parentNode;
  }

  const taskField = target.parentNode;
  const list = taskField.parentNode;

  list.removeChild(taskField);
}

taskList[0].addEventListener('click', (event) => {
  const { target } = event;
  console.log(target);

  if (target.classList.contains('trash-btn') || target.classList.contains('trash-icon')) {
    removeTask(target);
  }
});

taskList[1].addEventListener('click', (event) => {
  const { target } = event;

  if (target.classList.contains('trash-btn') || target.classList.contains('trash-icon')) {
    removeTask(target);
  }
});