import React, { useContext } from "react";
import { CartContext } from "../context/Product";
import Navbar from "../Componenet/Navbar";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);
  console.log(state.totalQuantity);
  console.log(state.totalPrice);

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

  function Increment(data: dataType) {
    dispatch({ type: "Increment", payload: data });
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
      <div>
        {state.product.length === 0 ? (
          <div>
            <h3 className=" text-2xl text-center py-10 font-extrabold">
              {" "}
              Sorry No item inside cart
            </h3>
          </div>
        ) : (

          <div className="flex gap-4 p-6 w-[100vw] ">
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
          <div className=" min-w-[50%]">
            <div className="flex flex-col min-h[1000px] border-2 rounded-lg max-w-[70%] justify-between gap-7 p-5">
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
