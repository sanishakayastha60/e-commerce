import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App(){
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-indigo-600">PROSHOP</h1>
            </div>
        </nav>
      <main className="container mx-auto py-12 px-6">
        <Routes>
          <Route path="/" element={<HomeScreen />}/>
          <Route path="/product/:id" element={<ProductScreen />}/>
        </Routes>
      </main>
      </div>
    </Router>
  );
}
export default App;