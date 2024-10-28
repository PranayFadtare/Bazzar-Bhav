import React, { useState } from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ onSearch, onClear }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onClear();
  };

  return (
    <div className="relative max-w-md mx-auto mt-4">
      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-105">
        <Search className="ml-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search here"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-2 pr-4 py-2 focus:outline-none text-gray-600"
        />
        <button
          onClick={handleClear}
          className="mr-3 text-green-500 text-sm font-semibold hover:text-green-700 transition duration-200"
        >
          Clear
        </button>
      </div>
    </div>
  );
};