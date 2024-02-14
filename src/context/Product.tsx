import { createContext, useEffect, useReducer } from "react"



type dataType = {
    id:number,
  title: string,
    description: string,
    price: number,
    discountPercentage:number,
    rating: number,
    stock: number,
    brand:string,
    category: string,
    thumbnail: string,
    images: string[],
    quantity?: number
  }


type InitialType={
    product: dataType[];
    totalPrice: number;
    totalQuantity:number;
}

type add ={
    type: "ADD ITEM",
    payload: dataType;
}

type deduct ={
    type: "Deduct"
    payload: dataType;
}
type increment ={
    type: "Increment"
    payload: dataType;
}

type remove ={
    type: "Remove"
    payload: dataType;
}

type clear ={
    type: "Clear"
   
}

type updateTotal ={
    type: "Update Cart",
    payload: {
        totalPrice: number;
        totalQuantity: number;
      };
   
}
type actionType = add|deduct|increment|remove|clear|updateTotal

const initialState:InitialType ={
    product : JSON.parse(localStorage.getItem('data' )|| '[]'),
    totalPrice: 0,
    totalQuantity:0,
    
}

export const CartContext = createContext<{
    state: InitialType,
    dispatch:React.Dispatch<actionType>}>
    ({
        state:initialState,
        dispatch:()=>{}

    })


const cartReducer=(state:InitialType, action:actionType):InitialType=>{
    switch (action.type) {
        case "ADD ITEM":

        
        
        const findItem = state.product.find((e) => e.id === action.payload.id);
        if (findItem) {
          const updatedCart = state.product.map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, quantity: item.quantity? item.quantity+ 1: 1 };
            }
            return item;
          });
          return {
            ...state,
            product: updatedCart,
          };
        } else {
          return {
            ...state,
            product: [...state.product, { ...action.payload, quantity: 1 }],
          };
        }
           
            // If quantity is defined, proceed with the regular logic
         

            case "Increment" :

            const addItem = state.product.map((e:dataType)=>{
               if(e.id===action.payload.id){
                return {...e, quantity:e.quantity? e.quantity+1:1}
               } 
               return e 
                })

           
                return{
                    ...state,
                    product:addItem
                }
                case "Deduct" :

                const deduct = state.product.map((e:dataType)=>{
                    if(e.id===action.payload.id){
                        if(e.quantity && 1 <e.quantity){
                            return{...e, quantity:e.quantity-1}
                        }
                   
                    }
                    return e
                })

                    return{
                        ...state,
                        product: deduct
                    }
                    case "Remove" :
                        const remove = state.product.filter((e:dataType)=> e.id!==action.payload.id)

                        return{
                            ...state,
                            product:remove
                        }

                        case "Clear" :
                           
                            return{
                                ...state,
                                product:[]
                            }

                            case "Update Cart" :
                                return{
                                    ...state,
                                    totalPrice:action.payload.totalPrice,
                                    totalQuantity:action.payload.totalQuantity
                                }
    

            
           
    
        default:
           return state;
    }

}

const calculateTotal =(product:dataType[]): { totalPrice: number; totalQuantity: number } =>{
    let totalPrice= 0
    let totalQuantity=0

    product.forEach((item)=>{
        if (item.quantity !== undefined) {
            totalQuantity += item.quantity;
            totalPrice= totalPrice+ item.price* item.quantity
          }
         
    })

    return {totalPrice, totalQuantity}

}



export const CartProvider =({children}:{children:React.ReactNode})=>{

    const [state,dispatch]=useReducer(cartReducer, initialState)

    useEffect(()=>{
        localStorage.setItem("data", JSON.stringify(state.product||[]) )

        const {totalPrice,totalQuantity}= calculateTotal(state.product)

        dispatch({type:"Update Cart", payload: {totalPrice,totalQuantity}})
      },[state.product])
return <CartContext.Provider value={{state,dispatch}}>{children}</CartContext.Provider>
}