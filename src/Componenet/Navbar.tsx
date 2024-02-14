import React, { useContext } from 'react'
import { CartContext } from '../context/Product'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Auth'
import { DarkContext } from '../context/ThemeContext'
import "../index.css";

const Navbar = () => {

  const { themeState, dispatch } = useContext(DarkContext);
    const {state} = useContext(CartContext)
    const router = useNavigate()

   
      function logOut() {
        router("/login");
        localStorage.clear();
        
      } 
    
  return (
    <div className='flex justify-between items-center h-16 bg-lime-400 py-6 px-9' >
        <div>
          
          <Link to='/'><h3> Lama</h3> </Link>

        </div>
        <div className="flex justify-between items-center gap-5">
            <div
              className=" flex justify-between items-center border-2 rounded-3xl cursor-pointer  px-2 gap-3 relative "
              onClick={() => dispatch({ type: "CHANGE_THEME" })}
            >
              <div>🌙</div>
              <div>🔆</div>
              <div
                className="border rounded-full bg-black h-[25px] w-[30px] absolute"
                style={
                  themeState.theme === "light" ? { left: "2px" } : { right: "2px" }
                }
              ></div>
            </div>
            <Link to='/cart'>  Cart {state.totalQuantity}</Link>
            <button className='p-2 rounded border bg-red-600 cursor-pointer' onClick={logOut} >Log Out </button>
       
          </div>
        

    </div>
  )
}

export default Navbar