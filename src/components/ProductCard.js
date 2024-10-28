import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const ProductCard = ({ product }) => (
  <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md w-48 mx-auto transition-transform duration-300 hover:scale-105 hover:shadow-lg">
    <div className="w-full flex justify-between mb-2">
      <div className="flex items-center">
        {product.trend === 'up' ? (
          <TrendingUp className="text-red-500" size={20} />
        ) : (
          <TrendingDown className="text-green-500" size={20} />
        )}
        <span className={`ml-1 text-sm ${product.trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
          {product.percentage_change}%
        </span>
      </div>
    </div>
    <div className="flex flex-col items-center mb-2">
      <img src={product.image} alt={product.name} className="w-20 h-20 object-cover mb-2" />
      <h3 className="font-semibold text-center text-base">{product.name}</h3>
      <p className="text-green-500 font-bold text-base mt-2">₹{product.price} / kg</p>
      <button className="mt-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm transition-transform duration-200 transform active:scale-95">
        Buy
      </button>
    </div>
  </div>
);
