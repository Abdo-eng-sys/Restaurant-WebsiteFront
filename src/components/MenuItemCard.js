import React from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaStar, FaClock } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';

// 1. Define your Railway Backend URL here
// Make sure this matches your Railway production URL exactly
const BACKEND_URL = "https://web-production-0d124.up.railway.app";

const MenuItemCard = ({ item, index }) => {
  const { addToCart } = useCart();
  const { t, language } = useLanguage();

  const handleAddToCart = () => {
    addToCart(item);
    toast.success(language === 'ar' ? `تمت إضافة ${item.name} إلى السلة!` : `${item.name} added to cart!`);
  };

  // 2. Helper to format the image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop`;

    // If the image path is already a full URL, use it
    if (imagePath.startsWith('http')) return imagePath;

    // Otherwise, point to the Railway backend storage folder
    return `${BACKEND_URL}/storage/${imagePath}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`bg-white rounded-2xl shadow-md overflow-hidden card-hover group ${language === 'ar' ? 'text-right' : ''}`}
    >
      <div className="relative overflow-hidden">
        <img
          // 3. Use the helper function here
          src={getImageUrl(item.image_url)}
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {item.is_featured && (
          <div className={`absolute top-3 ${language === 'ar' ? 'right-3' : 'left-3'} bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full`}>
            {t('chefsChoice')}
          </div>
        )}
        {item.is_vegetarian && (
          <div className={`absolute top-3 ${language === 'ar' ? 'left-3' : 'right-3'} bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full`}>
            {t('veg')}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5">
        <div className={`flex justify-between items-start mb-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <h3 className="text-lg font-serif font-semibold text-gray-900">{item.name}</h3>
          <span className="text-xl font-bold text-primary-600">${item.price}</span>
        </div>

        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{item.description}</p>

        <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-3 text-sm text-gray-400`}>
            <span className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-1`}>
              <FaStar className="text-gold-400" />
              <span>{item.rating || '4.5'}</span>
            </span>
            <span className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-1`}>
              <FaClock className="text-gray-400" />
              <span>{item.preparation_time || '20-30'} {t('min')}</span>
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors shadow-lg"
          >
            <FaPlus />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItemCard;