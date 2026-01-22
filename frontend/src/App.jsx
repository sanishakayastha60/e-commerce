import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';

function App(){
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null ;
  const logoutHandler = () =>{
    localStorage.removeItem('userInfo');
    window.location.href='/login';
  };
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b p-4 sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items center">
            <Link to="/" className='text-2xl font-bold text-indigo-600'>PROSHOP</Link>            
            <Link to="/cart" className='bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition'>Cart</Link>
            {userInfo ? ( <div className='flex items-center space-x-3'>
              <span className="font-bold">{userInfo.name}</span>
              <button className="text-sm text-red-500 underline" onClick={logoutHandler}>Logout</button>
            </div> ):(
              <Link to='/login' className='bg-indigo-600 text-white px-4 py-2 rounded-lg'>Sign In</Link>
            )}
          </div>
        </nav>
      <main className="container mx-auto py-12 px-6">
        <Routes>
          <Route path="/" element={<HomeScreen />}/>
          <Route path="/product/:id" element={<ProductScreen />}/>
          <Route path="/cart/:id?" element={<CartScreen />}/>
          <Route path="/login" element={<LoginScreen />}/>
          <Route path="/register" element={<RegisterScreen />}/>
          <Route path="/shipping" element={<ShippingScreen />}/>
        </Routes>
      </main>
      </div>
    </Router>
  );
}
export default App;