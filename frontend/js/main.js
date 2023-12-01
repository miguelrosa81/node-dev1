const tbody = document.querySelector('tbody')
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');

const fetchTasks = async () => {
  const response = await fetch('http://localhost:3333/tasks');
  const tasks = await response.json();
  return tasks;
}

const addTask = async (event) =>{
event.preventDefault();

const task = { title: inputTask.value};

await fetch('http://localhost:3333/tasks', {
  method: 'post',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(task),
})

loadTasks();
inputTask.value = '';
}

const deleteTask = async (id) => {
  await fetch(`http://localhost:3333/tasks/${id}`, {method: 'delete'});
  loadTasks();
}

const updateTask = async ({id, title, status }) => {
 await fetch(`http://localhost:3333/tasks/${id}`, {
  method: 'put',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({ title, status }),
});
 loadTasks();

}

const formatDate = (dateUTC) => {
  const options = { dateStyle: 'short', timeStyle: 'short'}
const date = new Date(dateUTC).toLocaleString('pt-br', options);
return date;
}

const createElement = (tag, innerText = '', innerHtml = '') => {
const element = document.createElement(tag);

  if (innerText) {
    element.innerText = innerText;
  }

  if (innerHtml) {
    element.innerHTML = innerHtml;
  }


return element;
}

const createSelect = (value) => {
const options = `
  <option value="pendente">pendente</option>
  <option value="em andamento">em andamento</option>
  <option value="concluída">concluída</option> 
    `;
const select = createElement('select', '', options);
select.value = value;
return select;
}

const createRow = (task) => {

const {id, title, created_at, status } = task;

const tr = createElement('tr');
const tdTitle = createElement('td', title);
const tdCreated_at = createElement('td', formatDate(created_at));
const tdStatus = createElement('td');
const tdActions = createElement('td');
const select = createSelect(status);
select.addEventListener('change', ({target}) => updateTask({... task, status: target.value }))
const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
editButton.classList.add('btn-action');
const editForm = createElement('form');
const editInput = createElement('input');
editInput.value = title;
editForm.appendChild(editInput);
editForm.addEventListener('submit', (event) => {
  event.preventDefault();
  updateTask({... task, title:editInput.value });

  })
editButton.addEventListener('click', () => {
tdTitle.innerText = '';
tdTitle.appendChild(editForm);
})

const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');
deleteButton.classList.add('btn-action');
deleteButton.addEventListener('click', () => deleteTask(id));

tdStatus.appendChild(select);

tdActions.appendChild(editButton);
tdActions.appendChild(deleteButton);
tr.appendChild(tdTitle);
tr.appendChild(tdCreated_at);
tr.appendChild(tdStatus);
tr.appendChild(tdActions);

 return tr;
}


const loadTasks = async () => {
 const tasks = await fetchTasks();
tbody.innerHTML = '';
 tasks.forEach((task) => {
  const tr = createRow(task);
  tbody.appendChild(tr);
 });

}


addForm.addEventListener('submit', addTask);
 loadTasks();