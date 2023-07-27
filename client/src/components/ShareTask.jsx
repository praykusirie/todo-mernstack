import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

// import nodemailer from 'nodemailer'


export const ShareTask = ({ openEmail, setOpenEmail, _id }) => {
     const [sharedEmail, setSharedEmail ] = useState('')
     const { token } = JSON.parse(localStorage.getItem('user'))


    const handleEmailedTask = async (e) => {
        e.preventDefault()
        try {
            const share = { _id, email: sharedEmail}
            const response = await axios.post('/shareemail', share, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response)
            setOpenEmail(false)
            setSharedEmail('')
            toast.success('Task shared succesfully')
        } catch (error) {
            console.log(error)
        }
        
                 
    }
  return (
    <>
    {openEmail && 
        <section className='container absolute top-0 left-0 right-0 bg-gray-300 opacity-90 h-screen md:w-screen'>
        <div className='w-4/5 min-h-[200px] my-40 mx-auto  bg-gray-100 shadow-lg rounded-sm'>
            <h1 className='text-center py-2 text-xl '>Add email of your friend</h1>
            <form action="" className='my-5 mx-5' onSubmit={handleEmailedTask}>
                <div>
                    <label htmlFor="" className='block pb-2'>Email</label>
                    <input type="email" className='w-full mx-auto my-2 px-2 py-4 outline-none'
                    value={sharedEmail}
                    onChange={(e) => setSharedEmail(e.target.value)}/>
                </div>
                <div className='flex justify-between items-center my-5 pb-5 gap-5'>
                    <button className='py-3 px-2 bg-green-600 text-white rounded-lg outline-none w-2/4'>Share</button>
                    <button className='py-3 px-2 bg-red-600 text-white rounded-lg outline-none w-2/4'
                    onClick={() => setOpenEmail(false)}>Cancel</button>
                </div>
            </form>
        </div>
    </section>

    }
    </>
  )
}
