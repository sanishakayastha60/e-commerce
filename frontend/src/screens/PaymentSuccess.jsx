import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const data = searchParams.get('data');
    useEffect(()=> {
        localStorage.removeItem('cartItems');
        console.log("eSewa Response Data: ",data);
    },[data]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
            <div className="bg-green-100 p-6 rounded-full mb-4">
                <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l4 4L19 7"></path>
                </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been placed.</p>
            <Link to="/" className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition">Continue Shopping</Link>
        </div>
    );
}
export default PaymentSuccess;