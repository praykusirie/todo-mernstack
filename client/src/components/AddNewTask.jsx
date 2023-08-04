import React, { useState } from 'react'
import { Tooltip } from 'react-tooltip'
import { EditTask } from './EditTask'
import { ShareTask } from './ShareTask'
import { toast } from 'react-toastify'
import { useCompletedTodoMutation, useDeleteTodoMutation } from '../features/slice/tasksApiSlice'



export const AddNewTask = ({ singleTask, tasks }) => {
    const [openEdit, setEdit ] = useState(false)
    const [openEmail, setOpenEmail ] = useState(false)
    const [ completedTodo ] = useCompletedTodoMutation()
    const [ deleteTodo ] = useDeleteTodoMutation()
    

    
    const { _id, task, status } = singleTask

    const deleteSingleTask = async (_id) => {
      try {
        deleteTodo(_id)
        toast.success('Task deleted succesfully')
       
    } catch (error) {
        console.log(error)
    }
    }


    const handleCheckBox = async (e) => {
      const { checked } = e.target
        if(checked) {
          try {
              const currentStatus = 'Completed'
              const updatedStatus = { _id, status: currentStatus}
              completedTodo(updatedStatus)
              toast.success('Task completed')
              
          } catch (error) {
              console.log(error)
              toast.error('Task is already completed')

              
          }
        } 
    }

      
  return (
    <>
    { tasks.length > 0 ? (
    <div className='space-y-4 my-5 container'>
            <>
              <div className='mx-auto flex justify-between my-2 bg-[#f2f2f2] shadow-lg md:ml-10 py-5 w-[90%] md:w-[100%] items-center px-2'>
                <input type="checkbox" value={task} onChange={handleCheckBox}/>
                <h1 className={status === 'Completed' ? 'line-through' : 'no-underline'}>{task}</h1>
                <i className="fa-solid fa-share-nodes cursor-pointer" data-tooltip-id="my-tooltip" data-tooltip-content="Share"
                onClick={() => setOpenEmail(true)}></i>
                <i className="fa-regular fa-pen-to-square cursor-pointer" data-tooltip-id="my-tooltip" data-tooltip-content="Edit"
                onClick={() => setEdit(true)}></i>

                <i className="fa-solid fa-trash-can cursor-pointer" data-tooltip-id="my-tooltip" data-tooltip-content="Delete"
                onClick={() => deleteSingleTask(_id)}></i>
              </div>
              <EditTask openEdit={openEdit} setEdit={setEdit} _id={_id} />
              <ShareTask openEmail={openEmail} setOpenEmail={setOpenEmail} _id={_id} />
            </>
          
        
        <Tooltip id="my-tooltip" />
    </div>
      
      ) : (
        <p className='text-center text-2xl font-semibold py-2'>No added task</p>
      )}
      </>
    
  )
}
