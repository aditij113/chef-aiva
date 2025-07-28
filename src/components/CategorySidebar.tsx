
import React from 'react';

interface CategorySidebarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <aside className="w-full md:w-64 bg-white p-6 rounded-lg shadow-sm h-full flex-shrink-0">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Categories</h2>
      <nav>
        <ul>
          {categories.map((category) => (
            <li key={category} className="mb-2">
              <button
                onClick={() => onSelectCategory(category)}
                className={`w-full text-left px-4 py-2 rounded-md text-gray-700 transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-emerald-100 text-emerald-700 font-semibold'
                    : 'hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default CategorySidebar;
