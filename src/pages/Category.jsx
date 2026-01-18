import { ArrowLeft, Search } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './Category.css';

// Mock Data (Expanded)
const MOCK_PRODUCTS = [
  { id: 1, name: 'Organic Spinach', price: 2.50, unit: 'bundle', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop' },
  { id: 2, name: 'Red Bell Peppers', price: 4.20, unit: 'kg', image: 'https://images.unsplash.com/photo-1599313426214-72b12cfaca83?w=400&h=300&fit=crop' },
  { id: 3, name: 'Fresh Broccoli', price: 3.15, unit: 'head', image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bef?w=400&h=300&fit=crop' },
  { id: 4, name: 'Sweet Carrots', price: 1.80, unit: 'kg', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop', discount: '-10%' },
  { id: 5, name: 'Potatoes', price: 1.20, unit: 'kg', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop' },
  { id: 6, name: 'Tomatoes', price: 2.90, unit: 'kg', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop' },
];

const Category = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Format title (e.g. vegetables -> Vegetables)
  const title = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Category';

  return (
    <div className="page-container category-page">
      <header className="category-header">
        <button className="icon-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1>{title}</h1>
        <button className="icon-btn">
          <Search size={24} />
        </button>
      </header>

      <div className="products-grid">
        {MOCK_PRODUCTS.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={() => navigate(`/product/${product.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
