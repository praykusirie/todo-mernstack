const express = require('express')
const { createNewTask, getAllTasks, updatingTask, deletingTask, updateTaskStatus, shareEmail } = require('../controllers/taskController')
const { signIn, signUp } = require('../controllers/authControler')
const protect = require('../middleware/authMiddleware')
const router = express.Router()


router.post('/signin', signIn)
router.post('/signup', signUp)


router.post('/newtask', protect, createNewTask)
router.get('/gettask', protect, getAllTasks)
router.put('/updatetask', protect, updatingTask)
router.put('/updatestatus', protect, updateTaskStatus)
router.post('/deletetask', protect, deletingTask)
router.post('/shareemail', protect, shareEmail)

module.exports = router