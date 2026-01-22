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
            const { data } = await axios.post('/api/users/login', { emaill, password });
            localStorage.setItem('userInfo',JSON.stringify(data));
            navigate(redirect);
            window.location.reload();
        }catch(err){
            alert(err?.response?.data?.message || err.error);
        }
    };
  return (
    <div className="">
        <h1 className="">Sign In</h1>
        <form action="">
            <div className="">
                <label htmlFor="" className="">Email Address</label>
                <input type="email" name="" id="" className="" />
            </div>
            <div className="">
                <label htmlFor="" className="">Password</label>
                <input type="password" name="" id="" className="" />
            </div>
            <button type="submit" className="">Sign In</button>
        </form>
        <div className="">
            New Customer? <Link to ="/register" className=''>Register</Link>
        </div>
    </div>
  )
}

export default LoginScreen