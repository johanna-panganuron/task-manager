// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET /api/tasks/stats
router.get('/stats', taskController.getTaskStats);

// GET /api/tasks
router.get('/', taskController.getAllTasks);

// GET /api/tasks/:id
router.get('/:id', taskController.getTaskById);

// POST /api/tasks
router.post('/', taskController.createTask);

// PUT /api/tasks/:id
router.put('/:id', taskController.updateTask);

// DELETE /api/tasks/:id
router.delete('/:id', taskController.deleteTask);

module.exports = router;