import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { Categories } from './components/Categories';
import { ProductCard } from './components/ProductCard';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: 'Vegetables', image: 'https://media.istockphoto.com/id/466175630/photo/tomato-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=ELzCVzaiRMgiO7A5zQLkuws0N_lvPxrgJWPn7C7BXz0=' },
    { name: 'Fruits', image: 'https://img.freepik.com/premium-vector/fruits-circle_125371-62.jpg' },
    { name: 'Pulses', image: 'https://proveg.org/wp-content/uploads/2022/03/shutterstock_102557018.jpg' },
    { name: 'Spices', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdRAuhXmtyuPdFC9n8IAesCZAqGoWw_lJ01Q&s' },
    { name: 'Nuts', image: 'https://thumbs.dreamstime.com/b/mixed-nuts-group-isolated-white-background-37777972.jpg' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:5000/scrape'); // Make sure to adjust the URL as per your Flask app's URL
        const data = await response.json();

        // Assume the fetched data is in the format you provided, adjust as necessary
        const productsWithPrice = data.map((product, index) => ({
          id: index + 1,
          name: product.name,
          image: product.image,
          category: 'Vegetables', // Set a default category or map as necessary
          price: Math.floor(Math.random() * 100) + 10, // Example: random price generation
          trend: 'up', // Placeholder, you can adjust based on actual data
          percentage_change: 0 // Placeholder, adjust based on actual data
        }));

        setProducts(productsWithPrice);
        setFilteredProducts(productsWithPrice);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleSearch = (term) => {
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleClear = () => {
    setFilteredProducts(products);
  };

  const handleCategoryClick = (category) => {
    if (activeCategory === category) {
      setActiveCategory('');
      setFilteredProducts(products);
    } else {
      setActiveCategory(category);
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-4 flex-grow">
        <SearchBar onSearch={handleSearch} onClear={handleClear} />
        <Categories
          categories={categories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />
        <div className="text-xl font-bold mt-12 mb-8 underline flex items-center justify-center">
          <h2 className="text-center">Today's {activeCategory.toLowerCase() || 'all'} prices</h2>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 px-4 justify-center">
            {filteredProducts.map((product) => (
              <div key={product.id} className="mb-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Added Footer */}
      <footer className="bg-green-600 text-white text-center py-4 mt-auto">
        <p className="text-sm">© 2024 Bazaar Bhav | Daily Market Prices & Trends | All rights reserved</p>
      </footer>
    </div>
  );
};

export default App;
