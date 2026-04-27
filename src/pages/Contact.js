import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(language === 'ar' ? 'تم إرسال الرسالة بنجاح! سنرد عليك قريباً.' : 'Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=600&fit=crop"
            alt="Contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-gold-400 text-lg font-medium tracking-widest uppercase">{t('getInTouch')}</span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mt-2">
              {t('contactUs')}
            </h1>
          </motion.div>
        </div>
      </section>

      <div className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className={`text-2xl font-serif font-semibold mb-6 ${language === 'ar' ? 'text-right' : ''}`}>{t('sendAMessage')}</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={language === 'ar' ? 'text-right' : ''}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('yourName')}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className={language === 'ar' ? 'text-right' : ''}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('emailAddress')}</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className={language === 'ar' ? 'text-right' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('subject')}</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={language === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help?'}
                  />
                </div>

                <div className={language === 'ar' ? 'text-right' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('message')}</label>
                  <textarea
                    name="message"
                    rows="5"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={language === 'ar' ? 'رسالتك...' : 'Your message...'}
                  />
                </div>

                <button type="submit" className="w-full btn-primary py-4 text-lg">
                  {t('sendMessage')}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: language === 'ar' ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className={`text-xl font-serif font-semibold mb-6 ${language === 'ar' ? 'text-right' : ''}`}>{t('contactInfo')}</h3>

                <div className="space-y-6">
                  <div className={`flex items-start ${language === 'ar' ? 'space-x-reverse' : ''} space-x-4`}>
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaMapMarkerAlt className="text-primary-600" />
                    </div>
                    <div className={language === 'ar' ? 'text-right' : ''}>
                      <h4 className="font-semibold">{t('addressLabel')}</h4>
                      <p className="text-gray-500">{t('address')}</p>
                    </div>
                  </div>

                  <div className={`flex items-start ${language === 'ar' ? 'space-x-reverse' : ''} space-x-4`}>
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaPhone className="text-primary-600" />
                    </div>
                    <div className={language === 'ar' ? 'text-right' : ''}>
                      <h4 className="font-semibold">{t('phone')}</h4>
                      <p className="text-gray-500" dir="ltr">+(963) 994 202 655<br />+(963) 982 509 464</p>
                    </div>
                  </div>

                  <div className={`flex items-start ${language === 'ar' ? 'space-x-reverse' : ''} space-x-4`}>
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="text-primary-600" />
                    </div>
                    <div className={language === 'ar' ? 'text-right' : ''}>
                      <h4 className="font-semibold">{t('email')}</h4>
                      <p className="text-gray-500">info@royalrest.com<br />reservations@royalrest.com</p>
                    </div>
                  </div>

                  <div className={`flex items-start ${language === 'ar' ? 'space-x-reverse' : ''} space-x-4`}>
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaClock className="text-primary-600" />
                    </div>
                    <div className={language === 'ar' ? 'text-right' : ''}>
                      <h4 className="font-semibold">{t('openingHours')}</h4>
                      <p className="text-gray-500">
                        {t('monFri')}: <span dir="ltr">11:00 AM - 10:00 PM</span><br />
                        {t('sat')}: <span dir="ltr">10:00 AM - 11:00 PM</span><br />
                        {t('sun')}: <span dir="ltr">10:00 AM - 9:00 PM</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary-900 rounded-2xl shadow-lg p-8 text-white">
                <h3 className={`text-xl font-serif font-semibold mb-4 ${language === 'ar' ? 'text-right' : ''}`}>{t('followUs')}</h3>
                <p className={`text-gray-300 mb-6 ${language === 'ar' ? 'text-right' : ''}`}>{t('stayUpdated')}</p>
                <div className={`flex ${language === 'ar' ? 'space-x-reverse' : ''} space-x-4`}>
                  <a href="/" className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                    <FaFacebook className="text-xl" />
                  </a>
                  <a href="/" className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                    <FaInstagram className="text-xl" />
                  </a>
                  <a href="/" className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                    <FaTiktok className="text-xl" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
