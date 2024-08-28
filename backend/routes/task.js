const express = require('express');
const {getTasks,getTask,updateTask,createTask,deleteTask} = require('../controllers/taskControllers');
const router = express.Router();
const Auth = require('../middlewares/Auth')

// first i need to authenticate
router.use(Auth);

router.get('/',getTasks);
router.get('/:id',getTask);
router.post('/',createTask);
router.patch('/:id',updateTask);
router.delete('/:id',deleteTask);

module.exports = router;