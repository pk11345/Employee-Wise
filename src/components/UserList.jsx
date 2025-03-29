import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const UserList = () => {
    const [user, setUser] = useState([])
    const [edit, setEdit] = useState(null)
    const [update, setUpdate] = useState({first_name:"",last_name:"",email:""})
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1);
  
    const navigate = useNavigate()

    useEffect(()=>{
     const api = async ()=>{
        try{
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`)
        // response.json()
        console.log(response.data.data)
        setUser(response.data.data)
        setTotalPages(response.data.total_pages);
        }
        catch(error){
            console.log(error)
        }
    }
         api()
    },[page])

       const editUser = (user)=>{
        console.log(user.id)
        setEdit(user.id)
        setUpdate({ first_name: user.first_name, last_name: user.last_name, email: user.email });
       }

       const updateUser = async ()=>{
        try{
            const change = await axios.put(`https://reqres.in/api/users/${edit}`,update)
            console.log("Updated user:", change.data);
            setUser(user.map((users)=>{
               return users.id===edit? {...users,...update}: users
            }))
            console.log(change)
            setEdit(null)
            alert("User Updated")
            
            console.log(user)
        }
        catch(error){
            console.log("user not updated :", error)
        }
       }

       const dltUser = async(id)=>{
        try{
          const change = await axios.delete(`https://reqres.in/api/users/${edit}`)
         setUser(user.filter((user)=>user.id!==id))
         alert("User deleted")
      }
      catch(error){
          console.log("user not updated :", error)
      }
       }

       let token = localStorage.getItem("token")
      //  console.log(token)
       const Logout =()=>{
        localStorage.removeItem("token")
       }
    
  return (
    <>
    <div className='bg-gradient-to-r from-violet-600 to-indigo-600 w-full min-h-screen'>
     
    <div  className='w-full flex justify-center gap-3 pt-3'>
        
        <button onClick={()=>{
          Logout
          setTimeout(() => {
            navigate("/")
          }, 1000);
        }}
         className='bg-red-400 text-xl p-3 text-white font-fold rounded-xl cursor-pointer'>Logout</button>
    </div>

    <div className='w-full flex justify-center'>
    {/* display user */}
    <div className={`w-full p-5 flex md:flex-row flex-col items-center flex-wrap
       md:justify-center gap-4 ${edit ? 'blur-xs' : ''}`}>
        {token&&token.length!==0?  user.map((t)=>{
            return <>
            <div className="card md:w-[400px] w-[300px] p-5 border-2 gap-3 border-white rounded-lg flex flex-col 
            items-center bg-gradient-to-r from-indigo-500 to-violet-500" 
            key={t.id}>
                <h1 className='text-xl font-bold italic text-white'>{t.first_name} {t.last_name}</h1>
                <h2 className='text-sm font-semibold'>{t.email}</h2>
                
                <img className='rounded-[50%] w-[40%]'
                 src={t.avatar} alt="" />
                
                <button onClick={()=>{
                    editUser(t)
                }}
                 className='bg-red-400 text-xl w-[100px] p-1 text-white font-fold rounded-xl cursor-pointer'>Edit</button>

                 <button onClick={()=>{
                    dltUser(t.id)               
                  }}
                 className='bg-red-400 text-xl w-[100px] p-1 text-white font-fold rounded-xl cursor-pointer'>Delete</button>
            </div>  
            </> 
        })   :  <p>Login To See Users</p>
        }
 </div>

        {/* edit user  */}
        {edit && 
        <>

         <div className='bg-gradient-to-r from-indigo-500 to-violet-500 border-2 border-white flex flex-col
          md:w-[400px] w-[300px] pt-1 pb-2
           items-center gap-3 absolute top-[100px]  shadow-2xl shadow-black'>
          <h2>Edit User</h2>
          <input className='bg-white pl-2 pt-1 pb-2'
            type="text"
            placeholder="First Name"
            value={update.first_name}
          onChange={(e)=>{
            setUpdate({...update,first_name:e.target.value})
          }}
            
          />
          <input className='bg-white pl-2 pt-1 pb-2'
            type="text"
            placeholder="Last Name"
            value={update.last_name}
            onChange={(e)=>{
              setUpdate({...update,last_name:e.target.value})
            }}
          />
          <input className='bg-white pl-2 pt-1 pb-2'
            type="email"
            placeholder="Email"
            value={update.email}
            onChange={(e)=>{
              setUpdate({...update,email:e.target.value})
            }}
          />
          <button onClick={updateUser}
          className='bg-amber-400 pt-1 pb-2 pl-4 pr-4 text-white font-bold cursor-pointer'
            >Update</button>
          <button onClick={() => setEdit(null)}
          className='bg-amber-400 pt-1 pb-2 pl-4 pr-4 text-white font-bold cursor-pointer'
            >Cancel</button>
        </div>
        </>}
        </div>
   

    {/* pagination */}
    <div className='flex w-full justify-center gap-4 pb-3'>
    <button disabled={page===1} onClick={()=>{
          setPage(page-1)
        }}
          className='bg-red-400 pt-1 pb-2 pl-4 pr-4 text-white font-bold cursor-pointer'>Prev</button>

        <button disabled={page === totalPages} onClick={()=>{
          setPage(page+1)
        }}
          className='bg-red-400 pt-1 pb-2 pl-4 pr-4 text-white font-bold cursor-pointer'>Next</button>
          </div>
          </div>
    </>
  )
}

export default UserList