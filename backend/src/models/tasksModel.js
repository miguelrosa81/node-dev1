const connection = require('./connection');

const getAll = async () => {
  const [tasks] = await connection.execute('SELECT * FROM tasks');
  return tasks;
};


const createTask = async (task) =>{
  const { title } = task;
  const dateUTC = new Date(Date.now()).toUTCString();
  const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)';
  const [createdTask] = await connection.execute(query, [title, 'pendente', dateUTC]);
  return {insertId: createdTask.insertId};
};

const deleteTask = async (id) =>{
  const removeQuery = 'DELETE FROM tasks WHERE id = ?';
  const removedTask = await connection.execute(removeQuery, [id]);
  return removedTask;
};

const updateTask = async (id, task) =>{
  const {title, status} = task;
  const updateQuery = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';
  const updateTask = await connection.execute(updateQuery, [title, status, id]);
  return updateTask;
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};