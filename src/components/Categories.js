import React from 'react';

export const Categories = ({ categories, activeCategory, onCategoryClick }) => (
  <div className="flex justify-center">
    <div className="mt-4 bg-white py-4 px-6 rounded-lg w-full max-w-6xl"> {/* Max width set to keep the grid layout compact */}
      <h2 className="text-lg font-bold mb-4 text-center underline">Categories</h2>
      <div className="h-4" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-items-center"> {/* Adjust columns to center the layout */}
        {categories.map((category) => (
          <div
            key={category.name}
            onClick={() => onCategoryClick(category.name)}
            className={`flex flex-col items-center cursor-pointer space-y-2 transition-transform duration-300 hover:scale-105 ${
              activeCategory === category.name ? 'opacity-100' : 'opacity-70'
            } hover:opacity-100`}
          >
            <img
              src={category.image}
              alt={category.name}
              className={`w-16 h-16 rounded-full object-cover mb-2 mx-auto ${
                activeCategory === category.name ? 'border-4 border-green-500' : 'border-transparent border-4'
              }`}
            />
            <p className="text-sm text-center">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
