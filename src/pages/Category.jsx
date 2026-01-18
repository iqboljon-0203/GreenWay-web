import { ArrowLeft, Search } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import './Category.css';

const Category = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Filter products by category slug
  const filteredProducts = slug 
    ? PRODUCTS.filter(p => p.category === slug)
    : PRODUCTS;

  // Format title using translation keys
  const title = slug ? t(`cat_${slug}`) : t('categories');

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
        {filteredProducts.map(product => (
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
