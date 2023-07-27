import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'


export const Login = () => {
    const [username, setUsername ] = useState('')
    const [password, setPassword ] = useState('')
    const navigate = useNavigate()
    
    
    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            if(!username || !password ) {
                toast.error('All fields are required')
                return
            }

            const data = { username, password }
            const response = await axios.post('/signin', data)
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
            <form className='w-4/5 min-h-[470px] bg-[#f2f2f2] shadow-lg rounded-md mx-auto my-32 md:w-1/2'
            onSubmit={handleLogin}>
            <i class="fa-solid fa-user fa-2x text-center mx-[40%] md:mx-[45%] py-5 px-5 mt-2 rounded-full bg-[#ffffff] shadow-lg"></i>
            <p className='text-center text-2xl py-2'>Login</p>
            <div className='space-y-5 my-5 px-5'>
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
            <div className='flex justify-between px-2 items-center'>
            <button className='py-3 px-2 bg-green-600 text-white rounded-lg outline-none w-2/4'>Login</button>
            <Link to='/signup' className='text-red-600'>New here??</Link>
            </div>
            </form>
        </section>
    </>
  )
}
