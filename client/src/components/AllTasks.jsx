import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { AddNewTask } from './AddNewTask'
import { MutatingDots } from 'react-loader-spinner'
import { AddTaskModal } from './AddTaskModal';
import { useNavigate } from 'react-router-dom';
import { useGetAvailableTasksQuery, useLogoutUserMutation } from '../features/slice/tasksApiSlice';


export const AllTasks = () => {
    const [openModal, setModal] = useState(false)
    const [ selection, setSelection ] = useState('')
    const [ logoutUser ] = useLogoutUserMutation()


    const { data: tasks, error, isLoading, isError } = useGetAvailableTasksQuery()
    const navigate = useNavigate()
    const { username } = JSON.parse(localStorage.getItem('user'))  

   const handleLogout = () => {
    localStorage.clear()
    logoutUser()
    navigate('/')
   }

    if(isLoading) {
      return (
        <>
           <div className='my-60 mx-36 md:mx-[35rem]'>
          <MutatingDots 
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor= '#4fa94d'
            radius='12.5'
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          </div> 
        </>
      )
    }
  
    if(isError) {
      return (
        <>
          <p className='text-center text-2xl font-semibold py-2'>Somethong is wrong please refresh the page</p>
        </>
      )
    }
    
  
    return (
      <>
        <section className='container relative h-screen'>
          <div className='flex justify-between p-5 items-center'>
            <i class="fa-solid fa-list-ol"></i>
            <p className='text-xl uppercase font-medium'>Hello {username}</p>
            <i class="fa-solid fa-arrow-right-from-bracket cursor-pointer" data-tooltip-id="my-tooltip" data-tooltip-content="Logout"
            onClick={handleLogout}></i>
          </div>
          <div className='flex my-2 p-5 justify-between items-center'>
            <button className='bg-green-600 text-white px-5 py-2 border-none outline-none rounded-md'
            onClick={() => setModal(true)}>Add Task</button>
              <select name="" id="" className='bg-[#e7e4e4] border px-5 py-2 outline-none'
              value={selection} onChange={ (e) => setSelection(e.target.value)}>
                <option selected disabled>Select task status</option>
                <option value="All">All</option>
                <option value="Incomplete">Incomplete</option>
                <option value="Completed">Completed</option>
              </select>
          </div>
          <AddTaskModal openModal= {openModal} setModal={setModal} />
          {tasks.map(singleTask => {
            return (
              <AddNewTask singleTask={singleTask} tasks={tasks} />
            )
          })}
        </section>
      </>
    )
}
