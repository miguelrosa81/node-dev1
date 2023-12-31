const express = require('express');
const tasksController = require('./controllers/tasksController');
const tasksMiddleware = require('./middlewares/tasksMiddleware');
const router = express.Router();


router.get('/tasks', tasksController.getAll);
router.post('/tasks', tasksMiddleware.validateTitle, tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.delete('/tasks/', tasksMiddleware.validateDelete, tasksController.deleteTask);
router.put('/tasks/:id',
  tasksMiddleware.validateTitle,
  tasksMiddleware.validateStatus,
  tasksController.updateTask);

module.exports = router;