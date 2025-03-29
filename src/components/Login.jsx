import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate =useNavigate()

    

    const formData = {
        email:email,
        password:password
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()

       await axios.post("https://reqres.in/api/login",formData)
        .then((res)=>{
            
            console.log(res.data)
            localStorage.setItem("token",res.data)
            toast.success("Login Successful");

            setTimeout(() => {
                navigate("/UserList")
                
            }, 1000);

            setEmail("")
        setPassword("")
        // console.log(formData)
        })
        .catch((err)=>{
            console.log(err)
            toast.error("Enter Valid Email Id");
        })

        // setEmail("")
        // setPassword("")
        // console.log(formData)
    }

  return (
    <>
   
   <ToastContainer />
    <div className='w-screen min-h-screen bg-gradient-to-r from-violet-600 to-indigo-600 flex flex-col gap-3 justify-center items-center'>
   
        <h1 className='md:text-4xl text-2xl w-full text-center italic underline font-extrabold text-green-400'>
            EmployWise Assignment by Pankaj Kumar
            </h1>
    
        <h1 className='text-2xl  font-bold'>Login</h1>
        <form onSubmit={handleSubmit}
         className='flex flex-col items-center gap-4 bg-gradient-to-r from-indigo-500 to-violet-500
          p-4 md:w-[400px] w-[300px] ' >

            <label htmlFor="Email" className='text-xl font-semibold'>Email</label>
            <input onChange={(e)=>{
                setEmail(e.target.value)
            }} value={email}
             className='bg-white pl-3 pt-2 pb-3 w-[60%]' required
             type="email" name=""  placeholder='Enter Your Email' />

            <label htmlFor="Password" className='text-xl font-semibold'>Password</label>
            <input onChange={(e)=>{
                setPassword(e.target.value)
            }} value={password}
             className='bg-white pl-3 pt-2 pb-3 w-[60%]' required
             type="password" name=""  placeholder='Enter Your Password' />

            <input className='bg-red-300 pl-3 pt-2 pb-3 pr-3 rounded-xl cursor-pointer'
             type="submit" value="Submit" />
        </form>
    </div>
   
        
    </>
  )
}

export default Login