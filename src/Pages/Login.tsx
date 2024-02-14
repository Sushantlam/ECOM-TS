

import React, { useState } from 'react'

import * as Yup from "yup"
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    // type userName={
    //     email:String,
    //     password:String
    // }
   

    // const [userName, setUserName]= useState({
    //     email:'',
    //     password:''
    // })
   

    // function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    //          const {id,value}= e.target
    //          setUserName({...userName, [id]: value})
    // }
    // 
    // function handleClick(){

    //   if(!userName.email || !userName.password){
    //     alert('Please fill out the form')
    //     return
    //   }
      
    //      localStorage.setItem('username', JSON.stringify(userName) )

    //      router.push('/')
           
         
    // }

    const initialValues={
      email:'',
      password:'',
    }

    const validationScehema = Yup.object({
      email:Yup.string().email('Invalid email').required('Email field is required'),
      password: Yup.string().min(6, 'Minimum six character').max(20, 'Maximum 20 character').required('Password is required')

    })

    const router = useNavigate()
      const {values, touched, handleChange, handleSubmit, handleBlur, errors}=useFormik({
        initialValues,
         validationSchema:validationScehema,
        onSubmit:(values,action)=>{
         
          localStorage.setItem('userName', JSON.stringify(values))
          toast('Login Successful');
          setTimeout(() => {
            router("/")
          }, 3000);
        
          

console.log(values);

        }
      })

     
      
    



  
    

  return (
    // <div>
    //     <div>
    //         <label htmlFor="">Email</label>
    //         <input type="email" required id='email' onChange={handleChange} value={userName.email} />
    //         <label htmlFor="">Pasword</label>
    //         <input type="password" required id='password' onChange={handleChange} value={userName.password}/>
    //         <button onClick={handleClick}  >Login</button>
    //     </div>
    // </div>
    <div className=' h-[100vh] flex justify-center items-center'>
       <ToastContainer/>
      <form className='flex flex-col gap-5 border border-gray-800 rounded-md px-6  py-4' onSubmit={handleSubmit}>
       <label htmlFor="email">Email</label>
       <input  className=' p-1 border-2 rounded-md' type="email" name='email' id='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
       {errors.email && touched ? (<p className="form-error text-red-600">{errors.email}</p>):null}
       <label htmlFor="password">Password</label>
       <input  className=' p-1 border-2 rounded-md' type="password" name='password' id='password' value={values.password} onChange={handleChange} onBlur={handleBlur}/>
       {errors.password && touched ? (<p className="form-error text-red-600">{errors.password}</p>):null}
   
       <button className=' bg-lime-400 p-2 border rounded-xl' type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login