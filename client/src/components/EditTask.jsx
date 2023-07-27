import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getAllTasks } from '../slices/taskApiSlice'
import { useDispatch } from 'react-redux'


export const EditTask = ({ openEdit, setEdit, _id }) => {
    const [editedTask, setEditedTask ] = useState('')
    const [editTime, setEditTime ] = useState('')

    const dispatch = useDispatch()
    const { token } = JSON.parse(localStorage.getItem('user'))

    const handleSubmittedTask = async (e) => {
        e.preventDefault()
        
        try {
            const updatedVal = { task: editedTask, time: editTime, _id: _id } 
            const response = await axios.put('/updatetask',updatedVal, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response)
            if(response.status === 200) {
                toast.success(response.data.message)
            }
            
            dispatch(getAllTasks())
            setEdit(false)
            setEditTime('')
            setEditedTask('')
            
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            setEdit(false)
        }
        
        // dispatch(getAllTasks())
    }
    
  return (
    <>
    {openEdit && 
        <section className='container absolute top-0 left-0 right-0 bg-gray-300 opacity-90 h-screen md:w-screen'>
        <div className='w-4/5 min-h-[200px] my-40 mx-auto  bg-gray-100 shadow-lg rounded-sm'>
            <h1 className='text-center py-2 text-xl '>Edit your task here</h1>
            <form action="" className='my-5 mx-5' onSubmit={handleSubmittedTask}>
                <div>
                    <label htmlFor="" className='block pb-2'>Task</label>
                    <input type="text" className='w-full mx-auto my-2 px-2 py-4 outline-none'
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="" className='block pb-2'>Update your time</label>
                    <input type="datetime-local" className='w-full mx-auto my-2 px-2 py-4 outline-none'
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}/>
                </div>
                <div className='flex justify-between items-center my-5 pb-5 gap-5'>
                    <button className='py-3 px-2 bg-green-600 text-white rounded-lg outline-none w-2/4'>Add Task</button>
                    <button className='py-3 px-2 bg-red-600 text-white rounded-lg outline-none w-2/4'
                    onClick={() => setEdit(false)}>Cancel</button>
                </div>
            </form>
        </div>
    </section>

    }
    </>
  )
}
