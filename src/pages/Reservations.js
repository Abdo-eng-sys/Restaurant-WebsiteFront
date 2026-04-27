import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaUser, FaPhone, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import { useReservations } from '../hooks/useReservations';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Reservations = () => {
  const { createReservation, loading: submitLoading } = useReservations();
  const { isAuthenticated, user } = useAuth();
  const { t, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    date: '',
    time: '',
    guests: 2,
    special_requests: '',
  });

  const timeSlots = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
  ];

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error(t('loginToEdit'));
      return;
    }

    try {
      await createReservation(formData);
      setSubmitted(true);
      toast.success(language === 'ar' ? 'تم تأكيد الحجز!' : 'Reservation confirmed!');
    } catch (error) {
      toast.error(error.response?.data?.message || t('updateError'));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
            {language === 'ar' ? 'تم تأكيد الحجز!' : 'Reservation Confirmed!'}
          </h2>
          <p className="text-gray-500 mb-6">
            {language === 'ar'
              ? 'شكراً لاختيارك رويال ريست. لقد أرسلنا تأكيداً إلى بريدك الإلكتروني.'
              : "Thank you for choosing Royal Rest. We've sent a confirmation to your email."}
          </p>
          <button
            onClick={() => { setSubmitted(false); setFormData({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', date: '', time: '', guests: 2, special_requests: '' }); }}
            className="btn-primary w-full"
          >
            {language === 'ar' ? 'حجز آخر' : 'Make Another Reservation'}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <span className="text-primary-600 font-medium tracking-widest uppercase text-sm">{t('reservations')}</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-2">
            {t('bookTable')}
          </h1>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'احجز مكانك لتجربة طعام لا تُنسى'
              : 'Reserve your spot for an unforgettable dining experience'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={language === 'ar' ? 'text-right' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaUser className={`inline ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                    {t('fullName')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={t('yourName')}
                  />
                </div>
                <div className={language === 'ar' ? 'text-right' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaEnvelope className={`inline ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                    {t('emailAddress')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={language === 'ar' ? 'text-right' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaPhone className={`inline ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                    {t('phoneLabel')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+963 999 999 999"
                  />
                </div>
                <div className={language === 'ar' ? 'text-right' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaUser className={`inline ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                    {language === 'ar' ? 'عدد الضيوف' : 'Number of Guests'}
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white ${language === 'ar' ? 'text-right pr-4 pl-10' : 'pr-10'}`}
                    style={{
                      backgroundPosition: language === 'ar' ? 'left 0.75rem center' : 'right 0.75rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? (language === 'ar' ? 'ضيف' : 'Guest') : (language === 'ar' ? 'ضيوف' : 'Guests')}</option>
                    ))}
                    <option value="10+">10+ {language === 'ar' ? 'ضيوف' : 'Guests'}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={language === 'ar' ? 'text-right' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaCalendarAlt className={`inline ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                    {language === 'ar' ? 'التاريخ' : 'Date'}
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className={language === 'ar' ? 'text-right' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaClock className={`inline ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                    {language === 'ar' ? 'الوقت' : 'Time'}
                  </label>
                  <select
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white ${language === 'ar' ? 'text-right pr-4 pl-10' : 'pr-10'}`}
                    style={{
                      backgroundPosition: language === 'ar' ? 'left 0.75rem center' : 'right 0.75rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                    }}
                  >
                    <option value="">{language === 'ar' ? 'اختر الوقت' : 'Select Time'}</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={language === 'ar' ? 'text-right' : ''}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'طلبات خاصة (اختياري)' : 'Special Requests (Optional)'}
                </label>
                <textarea
                  name="special_requests"
                  rows="3"
                  value={formData.special_requests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder={language === 'ar' ? 'حساسية، قيود غذائية، مناسبات خاصة...' : 'Allergies, dietary restrictions, special occasions...'}
                />
              </div>

              {!isAuthenticated && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                  {language === 'ar' ? (
                    <>يرجى <Link to="/login" className="font-medium underline">تسجيل الدخول</Link> أو <Link to="/register" className="font-medium underline">إنشاء حساب</Link> لإجراء حجز.</>
                  ) : (
                    <>Please <Link to="/login" className="font-medium underline">login</Link> or <Link to="/register" className="font-medium underline">register</Link> to make a reservation.</>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={submitLoading || !isAuthenticated}
                className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitLoading ? (language === 'ar' ? 'جاري التأكيد...' : 'Confirming...') : (language === 'ar' ? 'تأكيد الحجز' : 'Confirm Reservation')}
              </button>
            </form>
          </motion.div>

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className={`text-xl font-serif font-semibold mb-4 ${language === 'ar' ? 'text-right' : ''}`}>{language === 'ar' ? 'سياسة الحجز' : 'Reservation Policy'}</h3>
              <ul className={`space-y-3 text-gray-600 ${language === 'ar' ? 'text-right' : ''}`}>
                <li className={`flex items-start ${language === 'ar' ? 'space-x-reverse' : ''} space-x-2`}>
                  <span className="text-primary-600 mt-1">•</span>
                  <span>{language === 'ar' ? 'يمكن إجراء الحجوزات قبل ما يصل إلى 30 يوماً' : 'Reservations can be made up to 30 days in advance'}</span>
                </li>
                <li className={`flex items-start ${language === 'ar' ? 'space-x-reverse' : ''} space-x-2`}>
                  <span className="text-primary-600 mt-1">•</span>
                  <span>{language === 'ar' ? 'يرجى الوصول في غضون 15 دقيقة من وقت الحجز' : 'Please arrive within 15 minutes of your reservation time'}</span>
                </li>
                <li className={`flex items-start ${language === 'ar' ? 'space-x-reverse' : ''} space-x-2`}>
                  <span className="text-primary-600 mt-1">•</span>
                  <span>{language === 'ar' ? 'يجب إجراء الإلغاء قبل ساعتين على الأقل' : 'Cancellations must be made at least 2 hours prior'}</span>
                </li>
                <li className={`flex items-start ${language === 'ar' ? 'space-x-reverse' : ''} space-x-2`}>
                  <span className="text-primary-600 mt-1">•</span>
                  <span>{language === 'ar' ? 'للمجموعات التي تزيد عن 10 أشخاص، يرجى الاتصال بنا مباشرة' : 'For parties larger than 10, please call us directly'}</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary-900 rounded-2xl shadow-lg p-8 text-white">
              <h3 className={`text-xl font-serif font-semibold mb-4 ${language === 'ar' ? 'text-right' : ''}`}>{language === 'ar' ? 'تحتاج مساعدة؟' : 'Need Help?'}</h3>
              <p className={`text-gray-300 mb-4 ${language === 'ar' ? 'text-right' : ''}`}>
                {language === 'ar'
                  ? 'فريقنا هنا لمساعدتك في أي ترتيبات خاصة أو أسئلة.'
                  : 'Our team is here to assist you with any special arrangements or questions.'}
              </p>
              <div className="space-y-2">
                <p className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-2`}>
                  <FaPhone className="text-gold-400" />
                  <span dir="ltr">+(963) 994 202 655</span>
                </p>
                <p className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-2`}>
                  <FaEnvelope className="text-gold-400" />
                  <span>reservations@royalrest.com</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
