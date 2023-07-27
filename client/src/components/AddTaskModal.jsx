import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getAllTasks } from '../slices/taskApiSlice'



export const AddTaskModal = ({ openModal, setModal }) => {

    const [task, setTask ] = useState('')
    const [time, setTime ] = useState('')
    const dispatch = useDispatch()
    const { id, token } = JSON.parse(localStorage.getItem('user'))

    const handleNewTask = async (e) => {
        e.preventDefault()
        try {
            if (!task || !time) {
                toast.error('All field are required')
                return
           
            }
            const status = 'Incomplete'
            const newTask = { task, time, status }
            const response = await axios.post('/newtask', newTask, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if(response.status === 200) {
                toast.success('Task added succesfully')
            }
            dispatch(getAllTasks())
            setModal(false)
            setTask('')
            setTime('')
        } catch (error) {
            console.log(error)
        }
        
        
    }
  return (
    <>
    {openModal && 
    <section className='container absolute top-0 left-0 right-0 bg-gray-300 opacity-90 h-screen md:w-screen'>
        <div className='w-4/5 min-h-[200px] my-40 mx-auto  bg-gray-100 shadow-lg rounded-sm'>
            <h1 className='text-center py-2 text-xl '>Add your task here</h1>
            <form action="" className='my-5 mx-5' onSubmit={handleNewTask}>
                <div>
                    <label htmlFor="" className='block pb-2'>Task</label>
                    <input type="text" className='w-full mx-auto my-2 px-2 py-4 outline-none'
                    value={task}
                    onChange={(e) => setTask(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="" className='block pb-2'>Time to start your task</label>
                    <input type="datetime-local" className='w-full mx-auto my-2 px-2 py-4 outline-none'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}/>
                </div>
                <div className='flex justify-between items-center my-5 pb-5 gap-5'>
                    <button className='py-3 px-2 bg-green-600 text-white rounded-lg outline-none w-2/4'>Add Task</button>
                    <button className='py-3 px-2 bg-red-600 text-white rounded-lg outline-none w-2/4'
                    onClick={() => setModal(false)}>Cancel</button>
                </div>
            </form>
        </div>
    </section>
    }
    </>
  )
}
