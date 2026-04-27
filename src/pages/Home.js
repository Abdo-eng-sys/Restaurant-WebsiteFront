import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUtensils, FaCalendarAlt, FaTruck, FaAward, FaStar, FaQuoteLeft } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import diningImage from "../assests/home/pexels-naimbic-2287523.jpg";
import landingImage from "../assests/home/pexels-magda-ehlers-pexels-3822749.jpg"
import truffleRisotto from "../assests/home/pexels-lucaluperto-17237176.jpg";
import waguySteak from "../assests/home/pexels-tartanribbonmx-33732005.jpg";
import lobsterThermidor from "../assests/home/pexels-christa-8332229-33748244.jpg";

const Home = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: FaUtensils,
      title: t('feat1Title'),
      description: t('feat1Desc'),
    },
    {
      icon: FaCalendarAlt,
      title: t('feat2Title'),
      description: t('feat2Desc'),
    },
    {
      icon: FaTruck,
      title: t('feat3Title'),
      description: t('feat3Desc'),
    },
    {
      icon: FaAward,
      title: t('feat4Title'),
      description: t('feat4Desc'),
    },
  ];

  const testimonials = [
    {
      name: language === 'ar' ? 'عدنان الأحمد' : 'Adnan Al-Ahmed',
      role: language === 'ar' ? 'ناقد طعام' : 'Food Critic',
      text: language === 'ar' ? 'تجربة عشاء رائعة حقاً. النكهات كانت متوازنة تماماً والتقديم كان فنياً.' : 'An absolutely divine dining experience. The flavors were perfectly balanced and the presentation was artful.',
      rating: 5,
    },
    {
      name: language === 'ar' ? 'البراء صابرين' : 'Albarra Sabrin',
      role: language === 'ar' ? 'عميل دائم' : 'Regular Customer',
      text: language === 'ar' ? 'أصبح رويال ريست المكان المفضل لعائلتنا. الموظفون مهتمون للغاية والطعام رائع دائماً.' : 'Royal Rest. has become our familys favorite spot. The staff is incredibly attentive and the food is consistently amazing.',
      rating: 5,
    },
    {
      name: language === 'ar' ? 'عبد الله ستونز' : 'Abd Ullah Stones',
      role: language === 'ar' ? 'منظم فعاليات' : 'Event Planner',
      text: language === 'ar' ? 'مكان مثالي للمناسبات الخاصة. الأجواء أنيقة وخيارات العشاء الخاص ممتازة.' : 'Perfect venue for special occasions. The ambiance is elegant and the private dining options are excellent.',
      rating: 5,
    },
  ];

  const popularDishes = [
    {
      name: language === 'ar' ? 'ريزوتو الكمأة' : 'Truffle Risotto',
      description: language === 'ar' ? 'أرز أربوريو كريمي مع الكمأة السوداء والبارميزان' : 'Creamy Arborio rice with black truffle and parmesan',
      price: 28,
      image: truffleRisotto,
    },
    {
      name: language === 'ar' ? 'ستيك واغيو' : 'Wagyu Steak',
      description: language === 'ar' ? 'واغيو A5 ممتاز مع زبدة الثوم والخضروات المشوية' : 'Premium A5 Wagyu with garlic butter and roasted vegetables',
      price: 65,
      image: waguySteak,
    },
    {
      name: language === 'ar' ? 'لوبستر ثيرميدور' : 'Lobster Thermidor',
      description: language === 'ar' ? 'تحضير فرنسي كلاسيكي مع صلصة كريم الكونياك' : 'Classic French preparation with cognac cream sauce',
      price: 52,
      image: lobsterThermidor,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={landingImage}
            alt="Restaurant Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold-400 text-lg font-medium tracking-widest uppercase mb-4 block">
              {t('welcome')}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              {t('heroTitle')}
              <span className="block text-gold-400">{t('heroSubtitle')}</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              {t('heroDesc')}
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${language === 'ar' ? 'sm:flex-row-reverse' : ''}`}>
              <Link to="/menu" className="btn-primary text-lg px-8 py-4">
                {t('exploreMenu')}
              </Link>
              <Link to="/reservations" className="btn-secondary text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900">
                {t('bookTable')}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/80 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-medium tracking-widest uppercase text-sm">{t('whyChooseUs')}</span>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mt-2">
              {t('experienceTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-2xl text-primary-600" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-medium tracking-widest uppercase text-sm">{t('specialties')}</span>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mt-2">
              {t('popularDishes')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularDishes.map((dish, index) => (
              <motion.div
                key={dish.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 ${language === 'ar' ? 'text-right' : ''}`}>
                    <span className="text-gold-400 font-bold text-2xl">${dish.price}</span>
                  </div>
                </div>
                <div className={`p-6 ${language === 'ar' ? 'text-right' : ''}`}>
                  <h3 className="text-xl font-serif font-semibold mb-2">{dish.name}</h3>
                  <p className="text-gray-500 mb-4">{dish.description}</p>
                  <Link to="/menu" className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
                    {t('viewFullMenu')} {language === 'ar' ? '←' : '→'}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-medium tracking-widest uppercase text-sm">{t('testimonials')}</span>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mt-2">
              {t('whatGuestsSay')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gray-50 p-8 rounded-2xl relative ${language === 'ar' ? 'text-right' : ''}`}
              >
                <FaQuoteLeft className={`text-4xl text-primary-200 mb-4 ${language === 'ar' ? 'mr-auto rotate-180' : ''}`} />
                <p className="text-gray-600 mb-6 italic">{testimonial.text}</p>
                <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-1 mb-3`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-gold-400" />
                  ))}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <span className="text-sm text-gray-500">{testimonial.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={diningImage}
            alt="Dining Experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary-900/80" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              {t('readyToDine')}
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              {t('reserveDesc')}
            </p>
            <Link to="/reservations" className="inline-block bg-gold-500 text-white px-10 py-4 rounded-lg text-lg font-medium hover:bg-gold-600 transition-colors shadow-xl">
              {t('reserveNow')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
