import { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/Product';

const HomeScreen = () =>{
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        const fetchProduct = async () =>{
            const { data } = await axios.get(`/api/products`);
            setProducts(data);
        };
        fetchProduct();
    },[]);
    return (
        <>
        <h2 className='text-3xl font-bold mb-8'>Latest Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product)=>(
              <Product key={product._id} product={product}/>
  ))}
            </div>
        </>
    );
}

export default HomeScreen;