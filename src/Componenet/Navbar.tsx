import React, { useContext } from 'react'
import { CartContext } from '../context/Product'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/Auth'

const Navbar = () => {

    const {state} = useContext(CartContext)
    const { dispatch} = useContext(AuthContext)

    function logout(){
        
    }
  return (
    <div className='flex justify-between h-16 bg-lime-400 py-6 px-9' >
        <div>
          
          <Link to='/'><h3> Lama</h3> </Link>

        </div>
        <div className='flex  justify-between items-center gap-5'>
        <Link to='/cart'>  Cart {state.totalQuantity}</Link>
        <button className='p-2 rounded border bg-red-600 cursor-pointer' onClick={()=>dispatch({type:'logout'})} >Log Out </button>
       
        
        </div>

    </div>
  )
}

export default Navbar