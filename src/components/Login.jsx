import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


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

            setTimeout(() => {
                navigate("/UserList")
                alert("Login Successful")
            }, 1000);

            setEmail("")
        setPassword("")
        // console.log(formData)
        })
        .catch((err)=>{
            console.log(err)
            alert("Enter Valid Email Id")
        })

        // setEmail("")
        // setPassword("")
        // console.log(formData)
    }

  return (
    <>
     
    <div className='w-screen min-h-screen bg-blue-200 flex flex-col gap-3 justify-center items-center'>
        <h1 className='text-2xl font-bold'>Login</h1>
        <form onSubmit={handleSubmit}
         className='flex flex-col items-center gap-4 bg-violet-400 p-4 md:w-[400px] w-[300px]' >

            <label htmlFor="Email">Email</label>
            <input onChange={(e)=>{
                setEmail(e.target.value)
            }} value={email}
             className='bg-white pl-3 pt-2 pb-3 w-[60%]' required
             type="email" name=""  placeholder='Enter Your Email' />

            <label htmlFor="Password">Password</label>
            <input onChange={(e)=>{
                setPassword(e.target.value)
            }} value={password}
             className='bg-white pl-3 pt-2 pb-3 w-[60%]' required
             type="password" name=""  placeholder='Enter Your Password' />

            <input className='bg-red-300 pl-3 pt-2 pb-3 pr-3 rounded-xl'
             type="submit" value="Submit" />
        </form>
    </div>
   
        
    </>
  )
}

export default Login