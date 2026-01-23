import { useState } from "react";
import { useNavigate } from "react-router-dom";
const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('esewa');
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('paymentMethod',JSON.stringify(paymentMethod));
        navigate('/placeorder');
    };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Payment Method</h1>
        <form onSubmit={submitHandler}>
            <div className="mb-4">
                <label className="flex items-center space-x-3">
                    <input type="radio" name="paymentMethod" className="form-radio h-3 w-5 text-green-600" value="eSewa" checked onChange={(e)=>{e.target.value}}/>
                    <span className="text-lg font-medium">eSewa</span>
                </label>
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700">Continue</button>
        </form>
    </div>
  )
}

export default PaymentScreen