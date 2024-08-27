const express = require('express');
const {getTasks,getTask,updateTask,createTask,deleteTask} = require('../controllers/taskControllers');
const router = express.Router();

router.get('/',getTasks);
router.get('/:id',getTask);
router.post('/',createTask);
router.patch('/:id',updateTask);
router.delete('/:id',deleteTask);

module.exports = router;