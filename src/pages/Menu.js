import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter } from 'react-icons/fa';
import MenuItemCard from '../components/MenuItemCard';
import { useMenu } from '../hooks/useMenu';
import { useLanguage } from '../context/LanguageContext';

const Menu = () => {
  const { menuItems, categories, loading, error } = useMenu();
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category_id === parseInt(selectedCategory);
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesPrice = true;
    if (priceRange === 'low') matchesPrice = item.price < 20;
    else if (priceRange === 'medium') matchesPrice = item.price >= 20 && item.price < 40;
    else if (priceRange === 'high') matchesPrice = item.price >= 40;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-red-600 mb-2">Error Loading Menu</h2>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <span className="text-primary-600 font-medium tracking-widest uppercase text-sm">{t('menu')}</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-2">
              {language === 'ar' ? 'أشهى المأكولات' : 'Culinary Delights'}
            </h1>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'استكشف قائمتنا المنسقة بعناية والتي تضم أفضل المكونات والنكهات المبتكرة'
                : 'Explore our carefully crafted menu featuring the finest ingredients and innovative flavors'}
            </p>
          </div>

          {/* Filters */}
          <div className={`flex flex-col md:flex-row gap-4 items-center justify-between ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
            {/* Search */}
            <div className={`relative w-full md:w-96 ${language === 'ar' ? 'search-rtl' : ''}`}>
              <FaSearch className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none`} />
              <input
                type="text"
                placeholder={t('search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full ${language === 'ar' ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
              />
            </div>

            {/* Category Filter */}
            <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide`}>
              <FaFilter className="text-gray-400 flex-shrink-0" />
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                  ${selectedCategory === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {t('all')}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id.toString())}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                    ${selectedCategory === cat.id.toString() ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {language === 'ar' ? (cat.name === 'Main Course' ? 'الأطباق الرئيسية' : cat.name === 'Appetizers' ? 'المقبلات' : cat.name === 'Desserts' ? 'الحلويات' : cat.name === 'Beverages' ? 'المشروبات' : cat.name === 'Steaks' ? 'اللحوم' : cat.name === 'Seafood' ? 'طعام بحري' : cat.name === 'Pasta' ? 'معكرونة' : cat.name) : cat.name}
                </button>
              ))}
            </div>


            {/* Price Filter */}
            <div className="w-full md:w-auto">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className={`w-full md:w-auto px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white ${language === 'ar' ? 'text-right pr-4 pl-10' : 'pr-10'}`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: language === 'ar' ? 'left 0.5rem center' : 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                }}
              >
                <option value="all">{t('prices')}</option>
                <option value="low">{t('under20')}</option>
                <option value="medium">{t('between20and40')}</option>
                <option value="high">{t('over40')}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchQuery}-${priceRange}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <MenuItemCard key={item.id} item={item} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-gray-500 text-lg">{t('noDishes')}</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setPriceRange('all'); }}
                  className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                >
                  {t('clearFilters')}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Menu;



