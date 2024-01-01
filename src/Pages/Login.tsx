import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/Auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()

    const {state, dispatch}= useContext(AuthContext)

    const [data,setData] = useState({
        email:'',
        password:''
    })

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
           const {id, value } = e.target
           setData({...data, [id]: value})
    }

    console.log(data);
    

    async function login(){

        try {
            const res = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  
                  username: data.email,
                  password: data.password
                  // expiresInMins: 60, // optional
                })
              })
              const result = await res.json()
              // console.log(result);
              
              dispatch({type:'login', payload:result.token})
              navigate('/')

              console.log(result);
              
            
        } catch (error) {
           
            
        }
      


    }
  return (

    <div className=' h-[100vh] flex justify-center items-center'>
    <div className='flex flex-col gap-5 border border-gray-800 rounded-md px-6  py-4'>
      <label htmlFor="">Username</label>
        <input className=' p-1 border-2 rounded-md' type="text" id='email' value={data.email} onChange={handleChange}/>
        <label htmlFor="">Password</label>
        <input className=' p-1 border-2 rounded-md' type="password" id='password'  onChange={handleChange} value={data.password}/>
        <button className=' bg-lime-400 p-2 border rounded-xl' onClick={login}>Logins</button>
    </div>
    </div>
  )
}

export default Login