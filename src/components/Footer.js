import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaUtensils, FaTiktok } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-2`}>
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-gold-500 rounded-full flex items-center justify-center">
                <FaUtensils className="text-white" />
              </div>
              <span className="text-2xl font-serif font-bold">Royal Rest.</span>
            </div>
            <p className={`text-gray-400 text-sm leading-relaxed ${language === 'ar' ? 'text-right' : ''}`}>
              {t('footerDesc')}
            </p>
            <div className={`flex ${language === 'ar' ? 'space-x-reverse' : ''} space-x-4`}>
              <a href="/" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaFacebook />
              </a>
              <a href="/" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaInstagram />
              </a>
              <a href="/" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={language === 'ar' ? 'text-right' : ''}>
            <h3 className="text-lg font-serif font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {[
                { path: '/', label: t('home') },
                { path: '/menu', label: t('menu') },
                { path: '/reservations', label: t('reservations') },
                { path: '/about', label: t('about') },
                { path: '/contact', label: t('contact') },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div className={language === 'ar' ? 'text-right' : ''}>
            <h3 className="text-lg font-serif font-semibold mb-4">{t('openingHours')}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className={`flex justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <span>{t('monFri')}</span>
                <span dir="ltr">11:00 AM - 10:00 PM</span>
              </li>
              <li className={`flex justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <span>{t('sat')}</span>
                <span dir="ltr">10:00 AM - 11:00 PM</span>
              </li>
              <li className={`flex justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <span>{t('sun')}</span>
                <span dir="ltr">10:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={language === 'ar' ? 'text-right' : ''}>
            <h3 className="text-lg font-serif font-semibold mb-4">{t('contactUs')}</h3>
            <ul className="space-y-3">
              <li className={`flex items-start ${language === 'ar' ? 'space-x-reverse' : ''} space-x-3 text-sm text-gray-400`}>
                <FaMapMarkerAlt className="text-primary-500 mt-1 flex-shrink-0" />
                <span>{t('address')}</span>
              </li>
              <li className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-3 text-sm text-gray-400`}>
                <FaPhone className="text-primary-500 flex-shrink-0" />
                <span dir="ltr">+(963) 994 202 655</span>
              </li>
              <li className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-3 text-sm text-gray-400`}>
                <FaEnvelope className="text-primary-500 flex-shrink-0" />
                <span>info@royalrest.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p dir="ltr">© {new Date().getFullYear()} Royal Rest. {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
