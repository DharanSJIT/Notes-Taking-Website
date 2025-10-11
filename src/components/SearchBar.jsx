import React, { forwardRef } from 'react';
import { Search, Filter } from 'lucide-react';

const SearchBar = forwardRef(({ searchTerm, onSearchChange, selectedCategory, onCategoryChange }, ref) => {
  const categories = [
    { value: 'all', label: 'All Notes' },
    { value: 'general', label: 'General' },
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'ideas', label: 'Ideas' }
  ];

  return (
    <div className="p-4 space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          ref={ref}
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
        >
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});

export default SearchBar;