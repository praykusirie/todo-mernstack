import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


export const Signup = () => {
    const [fullname, setFullname ] = useState('')
    const [username, setUsername ] = useState('')
    const [password, setPassword ] = useState('')

    const navigate = useNavigate()

    const handleRegistration = async (e) => {
        e.preventDefault()

        try {
            if(!username || !password || !fullname ) {
                toast.error('All fields are required')
                return
            }

            const data = { username, password, fullname }
            const response = await axios.post('/signup', data)
            toast.success(response.data.message)
            localStorage.setItem('user', JSON.stringify({
                id: response.data.id,
                username: response.data.username,
                token: response.data.token
            }))

            navigate('/')
            setPassword('')
            setUsername('')
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error)
        }

    }
  return (
    <>
        <section className='container h-screen'>
            <form action="" className='w-4/5 min-h-[520px] bg-[#f2f2f2] shadow-lg rounded-md mx-auto my-20 md:w-1/2'
            onSubmit={handleRegistration}>
            <i class="fa-solid fa-user fa-2x text-center md:mx-[45%] mx-[40%] py-5 px-5 mt-2 rounded-full bg-[#ffffff] shadow-lg"></i>
            <p className='text-center text-2xl py-2'>Signup</p>
            <div className='space-y-5 my-5 px-5'>
                <div>
                    <label htmlFor="" className='block pb-5'>Full name</label>
                    <input type="text" placeholder='prayjonas' className='border-b w-[90%] mx-auto outline-none px-2 py-5'
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="" className='block pb-5'>Username</label>
                    <input type="text" placeholder='prayjonas' className='border-b w-[90%] mx-auto outline-none px-2 py-5'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="" className='block pb-5'>Password</label>
                    <input type="password" className='border-b w-[90%] mx-auto outline-none px-2 py-5'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            <div className='flex justify-between px-2 items-center pb-2'>
            <button className='py-3 px-2 bg-green-600 text-white rounded-lg outline-none w-2/4'>Login</button>
            <Link to='/login' className='text-red-600'>Already registered??</Link>
            </div>
            </form>
        </section>
    </>
  )
}

