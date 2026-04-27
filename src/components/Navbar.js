import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaUtensils,
  FaCalendarAlt,
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaGlobe
} from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const { language, t, toggleLanguage } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: t('home'), icon: FaHome },
    { path: '/menu', label: t('menu'), icon: FaUtensils },
    { path: '/reservations', label: t('reservations'), icon: FaCalendarAlt },
    { path: '/about', label: t('about'), icon: FaInfoCircle },
    { path: '/contact', label: t('contact'), icon: FaPhone },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-2`}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-gold-500 rounded-full flex items-center justify-center">
              <FaUtensils className="text-white text-lg" />
            </div>
            <span className="text-2xl font-serif font-bold text-gradient">
              Royal Rest.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-1`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-1
                  ${isActive(link.path)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
              >
                <link.icon className="text-sm" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className={`hidden md:flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-4`}>
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-all"
            >
              <FaGlobe className={language === 'ar' ? 'ml-1' : 'mr-1'} />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>

            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors">
              <FaShoppingCart className="text-xl" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-3`}>
                <Link to="/dashboard" className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-2 text-gray-600 hover:text-primary-600`}>
                  <FaUser />
                  <span className="text-sm font-medium">{user?.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  title={t('logout')}
                >
                  <FaSignOutAlt className={language === 'ar' ? 'rotate-180' : ''} />
                </button>
              </div>
            ) : (
              <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-2`}>
                <Link
                  to="/login"
                  className={`px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-1`}
                >
                  <FaSignInAlt className={language === 'ar' ? 'rotate-180' : ''} />
                  <span>{t('login')}</span>
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-1`}
                >
                  <FaUserPlus />
                  <span>{t('register')}</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-600 hover:text-primary-600"
            >
              <FaGlobe />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-primary-600"
            >
              {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${isActive(link.path)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <link.icon />
                  <span>{link.label}</span>
                </Link>
              ))}
              <div className="border-t pt-2 mt-2">
                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg`}
                >
                  <FaShoppingCart />
                  <span>{t('cart')} ({totalItems})</span>
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg`}
                    >
                      <FaUser />
                      <span>{t('dashboard')}</span>
                    </Link>
                    <button
                      onClick={() => { logout(); setIsOpen(false); }}
                      className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full`}
                    >
                      <FaSignOutAlt className={language === 'ar' ? 'rotate-180' : ''} />
                      <span>{t('logout')}</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-3 px-4 py-3 text-primary-600 hover:bg-primary-50 rounded-lg`}
                    >
                      <FaSignInAlt className={language === 'ar' ? 'rotate-180' : ''} />
                      <span>{t('login')}</span>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-3 px-4 py-3 text-primary-600 hover:bg-primary-50 rounded-lg`}
                    >
                      <FaUserPlus />
                      <span>{t('register')}</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
