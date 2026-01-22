import {useState, useEffect} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';

const LoginScreen = () => {
    const [email, setEmail] =useState('');
    const [password, setPassword] =useState('');
    const navigate = useNavigate();
    const { search } = useLocation();
    
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    const submitHandler = async(e) =>{
        e.preventDefault();
        try{
            const { data } = await axios.post('/api/users/login', { email, password });

            localStorage.setItem('userInfo',JSON.stringify(data));
            navigate(redirect);
            window.location.reload();
        }catch(err){
            alert(err?.response?.data?.message || err.error);
        }
    };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>
        <form onSubmit={submitHandler}>
            <div className="mb-4">
                <label className="block text-gray-700 mb-4">Email Address</label>
                <input type="email" className="w-full p-2 border rounded" placeholder='johndoe@gmail.com' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 mb-4">Password</label>
                <input type="password" className="w-full p-2 border rounded" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">Sign In</button>
        </form>
        <div className="mt-4 text-gray-600 text-center">
           New here? <Link to ="/register" className='text-indigo-600 font-bold'>Register</Link>
        </div>
    </div>
  )
}

export default LoginScreen