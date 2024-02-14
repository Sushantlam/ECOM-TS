import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/Product";
import Navbar from "../Componenet/Navbar";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);

  const navigate = useNavigate()

  type dataType = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  };


  const user = localStorage.getItem("userName");
  const userData = user ? JSON.parse(user) : null;

 

  function Increment(data: dataType) {
    if(userData){
      dispatch({ type: "Increment", payload: data });
    }else{
      navigate("/")
    }
    
  }

  function Decrement(data: dataType) {
    dispatch({ type: "Deduct", payload: data });
  }

  function Delete(data: dataType) {
    dispatch({ type: "Remove", payload: data });
  }

  function Clear() {
    dispatch({ type: "Clear" });
  }

  function Buynow(){
    dispatch({ type: "Clear" });
    navigate("/thankyou")

  }

  return (
    <div>
      <Navbar />
      <div className="min-h-[100vh]">
        {state.product.length === 0 ? (
          <div>
            <h3 className=" text-2xl text-center py-10 font-extrabold">
              {" "}
              Sorry No item inside cart
            </h3>
          </div>
        ) : (

          <div className=" flex flex-col gap-5 sm:flex sm:flex-row sm:gap-4 sm:p-6 sm:w-[100vw] ">
          <div className="flex flex-col justify-between gap-5 p-4  min-w-[50%]" >
            {state.product.map((item) => (
              <div className=" max-w-[100%]"  key={item.id}>
                <div className="flex justify-between  gap-3">

                  <img src={item.images[0]} className="h-[50px] w-[50px] object-fill rounded-full" alt="" />
                  <p>{item.title}</p>

                  <div className="flex justify-between items-center gap-5 ">
                    <button className="px-2 border rounded-lg text-center bg-lime-400"
                      onClick={() => Decrement(item)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button className="px-2 border rounded-lg text-center bg-lime-400" onClick={() => Increment(item)}>+</button>
                    <button className="px-4 py-3 border rounded-lg text-center bg-red-600" onClick={() => Delete(item)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-end">
            <button className="px-5 py-3 border rounded-lg text-center bg-red-600" onClick={() => Clear()}>Clear</button>
     
            </div>

               </div>
          <div className=" w-full sm:min-w-[50%]">
            <div className="sm:flex sm:flex-col sm:min-h[1000px] sm:border-2 w-full border-2 ml-2 mr-10 px-3 flex flex-col gap-4 py-5 sm:rounded-lg sm:max-w-[70%] sm:justify-between sm:gap-7 sm:p-5">
              <h3 className=" text-3xl font-bold text-gray-800">Summary of cart</h3>
              <h2  className=" text-2xl font-bold text-gray-800">Total Product : {state.totalQuantity}</h2>
              <h2 className=" text-2xl font-bold text-gray-800">Total Product : {state.totalPrice}</h2>
              <div>
                <button className="px-5 py-3 border rounded-lg text-center bg-lime-400" onClick={Buynow}>Buy Now</button>
              </div>

            </div>

            


          </div>
          </div> )}
      </div>
    </div>
  );
};

export default Cart;
