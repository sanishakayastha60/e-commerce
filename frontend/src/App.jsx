import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Product from './components/Product';

function App(){
  const [products, setProducts] = useState([])
  useEffect(()=>{
    const fetchProducts = async () =>{
      try{
      const { data } = await axios.get('/api/products')
      if(Array.isArray(data)){
      setProducts(data)
      }else{
        console.error('data received not array',data)
      }
      }catch(error)
      {
        console.error('error:',error)
      }
    }
    fetchProducts()
  },[])
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <nav className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-extrabold text-indigo-600">PROSHOP</h1>
            </div>
        </nav>
      <main className="max-w-7xl mx-auto py-12 px-6">
        <Routes>
          <Route path="/" element={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product)=>(
              <Product key={product._id} product={product}/>
  ))}
            </div>
          }/>
        </Routes>
      </main>
      </div>
    </Router>
  )
}
export default App