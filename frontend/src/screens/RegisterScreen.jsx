import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; 

function RegisterScreen () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert("Password does not match!");
            return;
        }
        try{
            const { data } = await axios.post('/api/users',{name, email,password});
            navigate('/');
            window.location.reload();
        } catch (err){
            alert(err?.response?.data?.message || 'Registration failed');
        }
    };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <form onSubmit={submitHandler} className="space-">
            <input type="text" className="w-full p-3 mb-1 border rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Full Name"  value={name} onChange={(e)=>setName(e.target.value)} required/>
            <input type="email" className="w-full p-3 mb-1 border rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Email Address"  value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            <input type="password" className="w-full p-3 mb-1 border rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            <input type="password" className="w-full p-3 mb-1 border rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required/>
            <button type="submit" className="w-full bg-black text-white rounded-lg py-2 font-bold hover:bg-gray-700">Register</button>
        </form>
        <p className="mt-4 text-center text-gray-600">Already have an account? <Link to='/login' className="text-indigo-600 font-bold hover:underline">Login</Link> </p>
    </div>
  )
}

export default RegisterScreen