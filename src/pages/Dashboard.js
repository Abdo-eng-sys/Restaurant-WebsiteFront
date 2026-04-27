import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaCalendarAlt, FaShoppingBag, FaHeart, FaClock, FaMapMarkerAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useReservations } from '../hooks/useReservations';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, updateProfile } = useAuth();
  const { reservations, loading, cancelReservation } = useReservations();
  const { t, language } = useLanguage();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [personalData, setPersonalData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (user) {
      setPersonalData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handlePersonalChange = (e) => {
    setPersonalData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveProfile = async () => {
    setSaveLoading(true);
    try {
      await updateProfile(personalData);
      toast.success(t('updateSuccess'));
      setIsEditingProfile(false);
    } catch (error) {
      toast.error(error.response?.data?.message || t('updateError'));
    } finally {
      setSaveLoading(false);
    }
  };

  const stats = [
    { icon: FaCalendarAlt, label: t('reservations'), value: reservations.length, color: 'bg-blue-100 text-blue-600' },
    { icon: FaShoppingBag, label: language === 'ar' ? 'الطلبات' : 'Orders', value: 12, color: 'bg-green-100 text-green-600' },
    { icon: FaHeart, label: language === 'ar' ? 'المفضلة' : 'Favorites', value: 8, color: 'bg-red-100 text-red-600' },
    {
      icon: FaClock, label: t('memberSince'), value: user?.created_at
        ? new Date(user.created_at).toLocaleDateString(language === 'ar' ? 'ar-SY' : 'en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
        : '2026', color: 'bg-purple-100 text-purple-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 ${language === 'ar' ? 'text-right' : ''}`}
        >
          <h1 className="text-4xl font-serif font-bold text-gray-900">{t('myDashboard')}</h1>
          <p className="text-gray-500 mt-2">{t('welcomeBack')}, {user?.name}!</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-md p-6 ${language === 'ar' ? 'text-right' : ''}`}
            >
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4 ${language === 'ar' ? 'mr-auto ml-0' : 'mx-auto'}`}>
                <stat.icon className="text-xl" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`bg-white rounded-2xl shadow-lg p-8 ${language === 'ar' ? 'text-right' : ''}`}
          >
            <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-4 mb-6`}>
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-gold-500 rounded-full flex items-center justify-center">
                <FaUser className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-semibold">{user?.name}</h3>
                <p className="text-gray-500 text-sm">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-3 text-gray-600`}>
                <FaMapMarkerAlt className="text-primary-500" />
                <span>{user?.address || t('syria')}</span>
              </div>
              <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-3 text-gray-600`}>
                <FaCalendarAlt className="text-primary-500" />
                <span>
                  {t('memberSince')} {user?.created_at ?
                    new Date(user.created_at).toLocaleDateString(language === 'ar' ? 'ar-SY' : 'en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                    : '...'}
                </span>
              </div>
              {user?.phone && (
                <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-3 text-gray-600`}>
                  <FaClock className="text-primary-500" />
                  <span dir="ltr">{user.phone}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsEditingProfile(true)}
              className={`w-full mt-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''} space-x-2`}
            >
              <FaEdit style={{
                ...(language === "ar" && { margin: '5px' })
              }} />
              <span>{t('editProfile')}</span>
            </button>

          </motion.div>

          {/* Reservations */}
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 ${language === 'ar' ? 'text-right' : ''}`}
          >
            <h3 className="text-xl font-serif font-semibold mb-6">{t('myReservations')}</h3>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : reservations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FaCalendarAlt className="text-4xl mx-auto mb-2 text-gray-300" />
                <p>{t('noReservations')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className={`border border-gray-100 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-4`}>
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <FaCalendarAlt className="text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold" dir="ltr">{reservation.date}</p>
                        <p className="text-sm text-gray-500" dir="ltr">{reservation.time} • {reservation.guests} {language === 'ar' ? 'ضيوف' : 'guests'}</p>
                      </div>
                    </div>
                    <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-3`}>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium
                        ${reservation.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                          reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-red-100 text-red-600'}`}>
                        {reservation.status === 'confirmed' ? (language === 'ar' ? 'مؤكد' : 'confirmed') :
                          reservation.status === 'pending' ? (language === 'ar' ? 'قيد الانتظار' : 'pending') :
                            (language === 'ar' ? 'ملغى' : 'cancelled')}
                      </span>
                      <button
                        onClick={() => cancelReservation(reservation.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        {t('cancel')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditingProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsEditingProfile(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md ${language === 'ar' ? 'text-right' : ''}`}
            >
              <div className={`flex items-center justify-between mb-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <h2 className="text-2xl font-serif font-semibold">{t('editProfile')}</h2>
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <div className="space-y-4">
                <div className={language === 'ar' ? 'text-right' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('fullName')}</label>
                  <input
                    type="text"
                    name="name"
                    value={personalData.name}
                    onChange={handlePersonalChange}
                    className={`w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${language === 'ar' ? 'text-right' : ''}`}
                  />
                </div>
                <div className={language === 'ar' ? 'text-right' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('emailAddress')}</label>
                  <input
                    type="email"
                    name="email"
                    value={personalData.email}
                    onChange={handlePersonalChange}
                    className={`w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${language === 'ar' ? 'text-right' : ''}`}
                  />
                </div>
                <div className={language === 'ar' ? 'text-right' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('phoneLabel')}</label>
                  <input
                    type="text"
                    name="phone"
                    value={personalData.phone}
                    onChange={handlePersonalChange}
                    className={`w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${language === 'ar' ? 'text-right' : ''}`}
                    placeholder="+963..."
                  />
                </div>
                <div className={language === 'ar' ? 'text-right' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('addressLabel')}</label>
                  <textarea
                    name="address"
                    rows="2"
                    value={personalData.address}
                    onChange={handlePersonalChange}
                    className={`w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${language === 'ar' ? 'text-right' : ''}`}
                    placeholder={t('address')}
                  />
                </div>
              </div>

              <div className={`flex gap-3 mt-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={saveLoading}
                  className={`flex-1 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                >
                  <FaSave style={{
                    ...(language === "ar" ? { margin: '5px' } : { marginRight: '0.5rem' })
                  }} />
                  <span>{saveLoading ? t('loading') : t('saveDetails')}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
