const Tasks = require("../models/Tasks");
const nodemailer = require('nodemailer')


//creating new task
const createNewTask = async (req, res) => {
    const { task, time, status } = req.body

    const user_id = req.user._id

    if(!task || !time) {
       return res.status(401).json({
            message: 'All fields are required'
        })
    }


    const newTask = await Tasks.create({
        task,
        time,
        user_id,
        status
    })

    const savedTask = await newTask.save()
    return res.status(200).json({
        message: 'New task added succesfully'
    })

}

//getting all available tasks
const getAllTasks = async (req, res) => {

    const user_id = req.user._id
    const allTasks = await Tasks.find({ user_id }).sort({createdAt: -1})
    if(allTasks) {
        res.status(200).json(allTasks)
    } else {
       return res.status(404).json({
            message: 'No tasks registered yet'
        })
    }
}

//updating the task
const updatingTask = async (req, res) => {
    const { _id, task, time } = req.body
    const completedTask = await Tasks.findById(_id)
    if(completedTask.status === 'Completed') {
        return res.status(404).json({
            message: 'Cannot update completed task'
        })
    }
    const updatedTask = await Tasks.findByIdAndUpdate(_id, { task, time })
    if(!updatedTask) {
        res.status(404)
        throw new Error(`There is no task of ID ${id}`)
    } else {
        res.status(200).json({
            message: 'Task updated succesfully'
        })
    }
}

//deleting task from the database
const deletingTask = async (req, res) => {
    const { _id } = req.body
    const deletedTask = await Tasks.findByIdAndDelete(_id)
    if(deletedTask) {
        res.status(200).json({
            message: 'Deleted succesfully',
            deletedTask
        })
    } else {
        res.status(401)
        throw new Error(Error)
    }
}

//updating task status
const updateTaskStatus = async (req, res) => {
    const { _id, status } = req.body

    const completedStatus = await Tasks.findById(_id)
    if(completedStatus.status === status) {
       return res.status(401).json({
            message: `${completedStatus.task} is already completed`
        })
    }
   
    const updatedStatus = await Tasks.findByIdAndUpdate(_id, { status })
    if(!updatedStatus) {
        res.status(401)
        throw new Error('Failed to update status')
    } else {
       return res.status(200).json({
            message: 'Task completed'
        })
    }
}

//sharing task through email
const shareEmail = async (req, res) => {
    const { _id, email } = req.body
    const sharedTask = await Tasks.findById(_id)

    try {
        
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "5f409200cfdbf4",
              pass: "2ba2a0f7466164"
            }
          })
    
          
          const info = await transporter.sendMail({
                from: 'ShareTask <prayjonas27@gmail.com>',
                to: `${email}`,
                subject: `Lets share the task`,
                text: `${sharedTask.task} is the task i want to share with you`
            })
            res.status(200).json({
                message: info.messageId
            })
    } catch (error) {
        res.status(401).json({
             error
        })
    }
    
}

module.exports = {
    createNewTask,
    getAllTasks,
    updatingTask,
    deletingTask,
    updateTaskStatus,
    shareEmail
}