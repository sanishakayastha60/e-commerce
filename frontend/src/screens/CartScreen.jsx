import { Link } from 'react-router-dom';
const CartScreen = () =>{
    return(
        <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600">Your cart is empty.</p>
            <Link to="/" className='text-indigo-600 underline mt-4 inline-block'>Go Back to shopping</Link>
        </div>
    </div>
    );
}
export default CartScreen;