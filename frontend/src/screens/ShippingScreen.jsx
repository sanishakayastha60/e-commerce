import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShippingScreen = () => {
    const savedAddress = JSON.parse(localStorage.getItem('ShippingAddress'))||{};
    const [address, setAddress]=useState(savedAddress.address||'');
    const [city, setCity]=useState(savedAddress.city||'');
    const [postalCode, setPostalCode]=useState(savedAddress.postalCode||'');
    const [country, setCountry]=useState(savedAddress.country||'');

    const navigate = useNavigate();

    const submitHandler = (e) =>{
        e.preventDefault();
        localStorage.setItem('shippingAddress',JSON.stringify({address,city,postalCode,country}));
        navigate('/payment');
    };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Shipping</h1>
        <form onSubmit={submitHandler} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" className="w-full p-2 border rounded" value={address} onChange={(e)=>setAddress(e.target.value)} required/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input type="text" className="w-full p-2 border rounded" value={city} onChange={(e)=>setCity(e.target.value)} required/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                <input type="text" className="w-full p-2 border rounded" value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} required/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input type="text" className="w-full p-2 border rounded" value={country} onChange={(e)=>setCountry(e.target.value)} required/>
            </div>
            <button type='submit' className="w-full bg-black text-white py-2 rounded font-bold hover:bg-gray-800">Continue to Payment</button>
        </form>
    </div>
  );
}

export default ShippingScreen