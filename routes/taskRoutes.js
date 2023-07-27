const express = require('express')
const { createNewTask, getAllTasks, updatingTask, deletingTask, updateTaskStatus, shareEmail } = require('../controllers/taskController')
const { signIn, signUp } = require('../controllers/authControler')
const protect = require('../middleware/authMiddleware')
const router = express.Router()


router.post('/signin', signIn)
router.post('/signup', signUp)

router.use(protect)

router.post('/newtask', createNewTask)
router.get('/gettask', getAllTasks)
router.put('/updatetask', updatingTask)
router.put('/updatestatus', updateTaskStatus)
router.post('/deletetask', deletingTask)
router.post('/shareemail', shareEmail)

module.exports = router