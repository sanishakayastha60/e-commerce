import { useEffect, useState} from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const CartScreen = () =>{
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const qty = location.search ? Number (location.search.split('=')[1]): 1;
    const [cartItems, setCartItems]= useState(()=>{
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart):[];
    });
    const checkoutHandler = () =>{
        navigate('/login?redirect=/shipping');
    };
    const removeFromCartHandler=(id)=>{
        const updatedCart = cartItems.filter((x)=>x._id !==id);
        setCartItems(updatedCart);
        localStorage.setItem('cartItems',JSON.stringify(updatedCart));
    };
    useEffect(()=>{
        if(id){
            console.log("Detect",id);
            const addToCart = async () =>{
                try{
                const { data } = await axios.get(`/api/products/${id}`);
                // console.log('fetch',data);
                setCartItems((prev)=>{
                    const existItem = prev.find((x)=> x._id === data._id);
                    let newCart;
                    if(existItem) {
                        newCart = prev.map((x)=> x._id === existItem._id ? {...data, qty }: x);
                    } else {
                        newCart = [...prev,{ ...data, qty }];
                    }
                    localStorage.setItem('cartItems',JSON.stringify(newCart));
                    return newCart;
                });
            }catch(error){
                console.error('cart',error);
            }
        };
                addToCart();
            }else{
                console.log("no id");
            }
    },[id,qty]);
    
    return(
        <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        <Link to="/" className='underline ml-2'>Go Back</Link>
        {cartItems.length === 0 ? (
            <div className="bg-blue-50 p-4 rounded text-blue-700">Your cart is empty
            </div>
        ):(
            <div className="grid md:grid-cols-3 gap-8">
            <div className="grid md:grid col-span-2 space-y-4">
                {cartItems.map((item)=>(
                    <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
                        <img src={item.image} alt={item.name} className='w-20 h-20 object-cover rounded'/>
                        <Link to={`/product/${item._id}`} className="font-bold hover:text-indigo-600">{item.name}</Link>
                        <p className="font-semibold">${item.price}</p>
                        <p className="text-gray-500">Qty: {item.qty}</p>
                        <button onClick={()=>removeFromCartHandler(item._id)} className='text-red-500 hover:text-red-700 ml-4'>Remove</button>
                    </div>
                ))}
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border h-fit">
            <h2 className="text-xl font-bold mb-4">Subtotal ({cartItems.reduce((acc,item)=>acc + item.qty, 0)})items </h2>
            <p className="text-2xl font-black mb-6"> ${cartItems.reduce((acc, item)=> acc + item.qty * item.price, 0).toFixed(2)} </p>
            <button type='button' className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition" 
            disabled ={cartItems.length === 0} onClick={checkoutHandler}>Proceed to Checkout</button>
            </div>
            </div>
        )}
    </div>
    );
};

export default CartScreen;