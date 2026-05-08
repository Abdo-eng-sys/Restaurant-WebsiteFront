import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';

// Define the absolute URL to bridge the gap between Netlify and Railway
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://restaurant-websiteback-production.up.railway.app';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { user } = useAuth();
  const { t, language } = useLanguage();

  const handleCheckout = async () => {
    try {
      const orderData = {
        items: cartItems.map(item => ({
          menu_item_id: item.id,
          quantity: item.quantity,
          special_instructions: item.notes || ""
        })),
        delivery_address: user?.address || "No address provided",
        phone: user?.phone || "",
        notes: "Please deliver as soon as possible."
      };

      // UPDATED: Prepend API_BASE_URL to fix the 404 error seen in image_0e0d71.jpg
      const response = await axios.post(`${API_BASE_URL}/api/orders`, orderData);

      if (response.status === 201) {
        toast.success(language === 'ar' ? 'تم تقديم الطلب بنجاح!' : response.data.message);
        clearCart();
      }

    } catch (error) {
      if (error.response) {
        const serverMessage = error.response.data.message;
        toast.error(`${language === 'ar' ? 'فشل الطلب' : 'Order failed'}: ${serverMessage}`);
      } else {
        toast.error(language === 'ar' ? 'فشل الاتصال بالخادم.' : 'Connection to server failed.');
      }
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <FaShoppingCart className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
            {language === 'ar' ? 'سلة التسوق فارغة' : 'Your Cart is Empty'}
          </h2>
          <p className="text-gray-500 mb-6">
            {language === 'ar' ? 'يبدو أنك لم تضف أي أطباق بعد.' : "Looks like you haven't added any items yet."}
          </p>
          <Link to="/menu" className={`btn-primary inline-flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-2`}>
            <FaArrowLeft className={language === 'ar' ? 'rotate-180' : ''} />
            <span>{language === 'ar' ? 'تصفح القائمة' : 'Browse Menu'}</span>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <span className="text-primary-600 font-medium tracking-widest uppercase text-sm">{t('cart')}</span>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mt-2">
            {language === 'ar' ? 'طلبك' : 'Your Order'}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: language === 'ar' ? -20 : 20 }}
                  className={`bg-white rounded-xl shadow-md p-6 flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-4`}
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className={`flex-grow ${language === 'ar' ? 'text-right' : ''}`}>
                    <h3 className="font-serif font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-500 text-sm">${item.price} {language === 'ar' ? 'لكل طبق' : 'each'}</p>
                  </div>

                  <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-3`}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <FaMinus className="text-xs" />
                    </button>
                    <span className="font-medium w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </div>

                  <div className={`${language === 'ar' ? 'text-left' : 'text-right'} min-w-[80px]`}>
                    <p className="font-bold text-lg text-primary-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-2"
                  >
                    <FaTrash />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className={`flex justify-between items-center pt-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Link to="/menu" className={`text-primary-600 hover:text-primary-700 font-medium flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-2`}>
                <FaArrowLeft className={language === 'ar' ? 'rotate-180' : ''} />
                <span>{language === 'ar' ? 'متابعة التسوق' : 'Continue Shopping'}</span>
              </Link>
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                {language === 'ar' ? 'مسح السلة' : 'Clear Cart'}
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-2xl shadow-lg p-8 h-fit ${language === 'ar' ? 'text-right' : ''}`}
          >
            <h3 className="text-xl font-serif font-semibold mb-6">{language === 'ar' ? 'ملخص الطلب' : 'Order Summary'}</h3>

            <div className="space-y-3 mb-6">
              <div className={`flex justify-between ${language === 'ar' ? 'flex-row-reverse' : ''} text-gray-600`}>
                <span>{language === 'ar' ? 'الأطباق' : 'Items'} ({totalItems})</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className={`flex justify-between ${language === 'ar' ? 'flex-row-reverse' : ''} text-gray-600`}>
                <span>{language === 'ar' ? 'الضريبة' : 'Tax'} (8%)</span>
                <span>${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className={`flex justify-between ${language === 'ar' ? 'flex-row-reverse' : ''} text-xl font-bold`}>
                  <span>{language === 'ar' ? 'المجموع' : 'Total'}</span>
                  <span className="text-primary-600">${(totalPrice * 1.08).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full btn-primary py-4 text-lg"
            >
              {language === 'ar' ? 'إتمام الطلب' : 'Place Order'}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;