import { Link } from 'react-router-dom';
const Product = ({ product })=>{
    return (
        <div className='group '>
            <Link to ={`/product/${product._id}`}>
            <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"/>
            </div>
            </Link>
            <div className="p-5">
                <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">{product.category}</p>
                <Link to={`\product\${product._id}`}>
                <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-600 transition">{product.name}</h3>
                </Link>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-black text-gray-900">${product.price}</span>
                    <Link to={`/product/${product._id}`} className="text-center bg-indigo-800 text-white p-2 rounded font-medium hover:bg-indigo-700">View Details</Link>
                </div>
            </div>
        </div>
    )
}
export default Product;