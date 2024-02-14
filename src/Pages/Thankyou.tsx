import React from 'react'
import Navbar from '../Componenet/Navbar'

const Thankyou = () => {
  return (
    <div>
        <Navbar/> 
        <div className="min-h-[100vh]">
        <h3 className=" text-2xl text-center py-10 font-extrabold">
              {" "}
              Thank you your order is placed
            </h3>
        </div>
       
       
    </div>
  )
}

export default Thankyou