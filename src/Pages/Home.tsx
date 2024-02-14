import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/Product';
import Navbar from '../Componenet/Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const {state,dispatch} = useContext(CartContext)

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
  }

  const storedPrice = localStorage.getItem('price');
const initialPrice = storedPrice ? parseFloat(storedPrice) : 0; // Convert the string to a number

 
  const [price, setPrice]= useState<number>(initialPrice)
  const [data, setData] = useState<dataType[]>([])
  const [title, setTitle]= useState<string>(localStorage.getItem('title')||'' )

  const fetchData = async() =>{

    try {
      const res = await fetch('https://dummyjson.com/products')
      if(res){
        const newRes = await res.json()
       console.log(newRes.products);
       
        
        setData(newRes.products)
      }
    } catch (error) {
      console.log(error);
      
    }
    

  }


 
useEffect(() => {
 
  localStorage.setItem('price', JSON.stringify(price) )
  localStorage.setItem('title', title)
}, [price, title])

  
  useEffect(() => {
   fetchData()
   
  }, [])
  

  const user = localStorage.getItem("userName");
  const userData = user ? JSON.parse(user) : null;
  const navigate = useNavigate()
 

  function handleAdd(e:dataType){

    if(!!userData){
      dispatch({type:"ADD ITEM", payload :e})
    }else{
      navigate("/login")
    }
   
   
    
    
  }
  
  
  return (
    <div>

     
<Navbar/>
   
<section className="text-gray-600 body-font">
  <div className="container px-10  mx-auto">
    <div className='flex flex-col gap-5 my-5 sm:flex sm:flex-row sm:justify-between sm:py-5'>

    <div className='flex flex-col'>
  <label htmlFor="">Filter By Price <h3> Rs. {price}</h3></label>
<input type="range" min={0} max={1000} value={price} onChange={(e) => setPrice(Number(e.target.value))} />
 
</div>
    <input type="text" placeholder='Search Here' className='border-2 rounded-md px-4 py-1' onChange={(e) => setTitle(e.target.value.toLowerCase())} value={title}  />



    </div>
 
  <div className="flex flex-wrap justify-between gap-5 ">
    {data?.filter((e:dataType)=> e.price>price).filter((e)=> title===''? e : e.title.toLowerCase().includes(title)).map((e:dataType)=>{
      return( 
        
    <div key={e.id} className="lg:w-1/5  md:w-1/2 px-1 py-3 w-full   border rounded-md hover:shadow-2xl ">
       <a className="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={e.thumbnail}/>
       </a>
        <div className="mt-4 flex flex-col gap-3">
        <h2 className="text-gray-900 title-font text-lg font-medium">{e.title.toLocaleUpperCase()}</h2>
         
          <h5 className="text-gray-500 text-xs tracking-widest title-font mb-1">{e.category}</h5>
          <h1 className="text-gray-500 text-xs tracking-widest title-font mb-1">{e.description}</h1>
          <del className="mt-1 text-2xl text-red-600">Rs. {Math.floor(e.price/(1-e.discountPercentage/100))}  </del>
           <p className="mt-1 text-4xl">Rs.{e.price}</p>
          <button className='p-2 rounded border bg-lime-600 cursor-pointer' onClick={()=>handleAdd(e)}>Add To Cart</button>
        </div>
      </div>
    
     
      
      )
     })}

   
 



</div>
</div>
</section>
    </div>
  )
}

export default Home