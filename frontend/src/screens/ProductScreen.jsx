import {useEffect, useState} from 'react';
import { useParams, useNavigate , Link } from 'react-router-dom';
import axios from 'axios';

const ProductScreen=()=>{
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [qty, setQty] = useState(1);
    useEffect(()=>{
        const fetchProduct = async () =>{
            const { data } = await axios.get(`/api/products/${id}`);
            setProduct(data);
        };
        fetchProduct();
    },[id]);
    const addToCartHandler = () =>{
        navigate(`/cart/${id}?qty=${qty}`);
    };
    return(
        <div className="container mx-auto py-8">
            <Link to="/" className="bg-gray-200 px-4 py-2 rounded mb-4 inline-block hover:bg-gray-300">Back to Products</Link>
            <div className="grid md:grid-cols-2 gap-8 mt-4">
                <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg" />
                <div className='space-y-4'>
                    <h2 className="text-4xl font-bold mb-4">{product.name}</h2>
                    <p className="text-xl text-indigo-600 font-bold mb-4">{product.price}</p>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    <div className="flex items-center space-x-4">
                        <span>Qty:</span>
                        <select value={qty} onChange={(e)=> setQty(Number(e.target.value))} className='border p-2 rounded'>
                            {[...Array(10).keys()].map((x)=>(
                                <option key={x+1} value={x+1}>{x+1}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={addToCartHandler} className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductScreen;