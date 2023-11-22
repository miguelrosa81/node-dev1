const tbody = document.querySelector('tbody')

const fetchTasks = async () => {
  const response = await fetch('http://localhost:3333/tasks');
  const tasks = await response.json();
  console.log(tasks);
}

fetchTasks();

const createElement = (tag, innerText = '', innerHtml = '') => {
const element = document.createElement(tag);
return element;
}

const task = {
  id: 1,
  title: 'teste de titulo',
  created_at: '00 Janeiro de 2023 15:00',
  status: 'pendente'
}

const createRow = (task) => {

const {id, title, created_at, status } = task;

const tr = createElement('tr');
const tdTitle = createElement('td', title);

tr.appendChild(tdTitle);

tbody.appendChild(tr);

}

createRow(task);