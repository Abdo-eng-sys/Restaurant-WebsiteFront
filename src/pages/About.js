import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaUsers, FaLeaf, FaHeart } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

import chef1 from "../assests/about/pexels-gustavo-fring-6050294.jpg"
import chef2 from "../assests/about/pexels-kampus-8629106.jpg"
import chef3 from "../assests/about/pexels-rhk-photo-67119324-15963714.jpg"
import chef4 from "../assests/about/pexels-thirdman-8487251.jpg"

import landingImage from "../assests/about/pexels-immortelleana-10445929.jpg"

import cutVegs from "../assests/about/pexels-chetanvlad-2600204.jpg"
import mojito from "../assests/about/pexels-christian-alvarez-116752650-12786935.jpg"

const About = () => {
  const { t, language } = useLanguage();

  const values = [
    {
      icon: FaAward,
      title: t('feat4Title'), // Excellence
      description: language === 'ar' ? 'نحن نسعى للكمال في كل طبق نصنعه، باستخدام أجود المكونات فقط.' : 'We strive for perfection in every dish we create, using only the finest ingredients.',
    },
    {
      icon: FaUsers,
      title: language === 'ar' ? 'المجتمع' : 'Community',
      description: language === 'ar' ? 'نؤمن بخلق بيئة دافئة ومرحبة حيث يشعر الجميع وكأنهم في منزلهم.' : 'We believe in creating a warm, welcoming environment where everyone feels at home.',
    },
    {
      icon: FaLeaf,
      title: language === 'ar' ? 'الاستدامة' : 'Sustainability',
      description: language === 'ar' ? 'نحن نحصل على مواردنا محلياً وبشكل مستدام، لدعم مجتمعنا وحماية كوكبنا.' : 'We source locally and sustainably, supporting our community and protecting our planet.',
    },
    {
      icon: FaHeart,
      title: language === 'ar' ? 'الشغف' : 'Passion',
      description: language === 'ar' ? 'يتم صنع كل طبق بحب وتفانٍ من قبل فريق الطهي الموهوب لدينا.' : 'Every dish is crafted with love and dedication by our talented culinary team.',
    },
  ];

  const team = [
    {
      name: language === 'ar' ? 'الشيف ماهر علي' : 'Chef Maher Ali',
      role: language === 'ar' ? 'شيف تنفيذي' : 'Executive Chef',
      image: chef1,
      bio: language === 'ar' ? 'مع خبرة 20 عاماً في مطاعم حائزة على نجمة ميشلان في جميع أنحاء أوروبا.' : 'With 20 years of experience in Michelin-starred restaurants across Europe.',
    },
    {
      name: language === 'ar' ? 'سالم عبدو' : 'Salem Abdo',
      role: language === 'ar' ? 'شيف حلويات' : 'Pastry Chef',
      image: chef2,
      bio: language === 'ar' ? 'متخصص في الحلويات الفرنسية وتقنيات الحلويات الحديثة.' : 'Specializes in French pastries and modern dessert techniques.',
    },
    {
      name: language === 'ar' ? 'علي عزو' : 'ALi Ezzo',
      role: language === 'ar' ? 'خبير مشروبات' : 'Sommelier',
      image: chef3,
      bio: language === 'ar' ? 'خبير معتمد مع خبرة في المشروبات القديمة والحديثة.' : 'Certified sommelier with expertise in Old and New World wines.',
    },
    {
      name: language === 'ar' ? 'أحمد يوسف' : 'Ahmed Yousef',
      role: language === 'ar' ? 'مدير المطعم' : 'Restaurant Manager',
      image: chef4,
      bio: language === 'ar' ? 'ضمان حصول كل ضيف على خدمة وضيافة استثنائية.' : 'Ensuring every guest receives exceptional service and hospitality.',
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={landingImage}
            alt="About Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-gold-400 text-lg font-medium tracking-widest uppercase">{language === 'ar' ? 'قصتنا' : 'Our Story'}</span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mt-2">
              {language === 'ar' ? 'عن رويال ريست' : 'About Royal Rest.'}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${language === 'ar' ? 'text-right' : ''}`}>
            <motion.div
              initial={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary-600 font-medium tracking-widest uppercase text-sm">{language === 'ar' ? 'منذ 2010' : 'Since 2010'}</span>
              <h2 className="text-4xl font-serif font-bold text-gray-900 mt-2 mb-6">
                {language === 'ar' ? 'إرث من التميز في الطهي' : 'A Legacy of Culinary Excellence'}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {language === 'ar' ? 'تأسس رويال ريست في عام 2010 بمهمة بسيطة: خلق تجارب طعام استثنائية تجمع الناس معاً. ما بدأ كمطعم عائلي صغير نما ليصبح أحد أكثر وجهات الطعام شهرة في المدينة.' : 'Royal Rest. was founded in 2010 with a simple mission: to create extraordinary dining experiences that bring people together. What started as a small family restaurant has grown into one of the most celebrated dining destinations in the city.'}
                </p>
                <p>
                  {language === 'ar' ? 'تتمحور فلسفتنا حول ثلاث ركائز: مكونات استثنائية، تقنيات مبتكرة، وضيافة حقيقية. نحن نؤمن بأن الطعام الرائع هو أكثر من مجرد طعم - إنه يتعلق بالذكريات التي تخلق حول الطاولة.' : 'Our philosophy centers on three pillars: exceptional ingredients, innovative techniques, and genuine hospitality. We believe that great food is about more than taste—it\'s about the memories created around the table.'}
                </p>
                <p>
                  {language === 'ar' ? 'كل طبق في قائمتنا يحكي قصة، مستوحاة من الرحلات والتقاليد والرؤية الإبداعية لفريق الطهي الموهوب لدينا. ندعوكم لتكونوا جزءاً من قصتنا.' : 'Every dish on our menu tells a story, inspired by travels, traditions, and the creative vision of our talented culinary team. We invite you to be part of our story.'}
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: language === 'ar' ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src={cutVegs}
                alt="Kitchen"
                className="rounded-2xl shadow-lg"
              />
              <img
                src={mojito}
                alt="Dining"
                className="rounded-2xl shadow-lg mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-medium tracking-widest uppercase text-sm">{language === 'ar' ? 'قيمنا' : 'Our Values'}</span>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mt-2">
              {language === 'ar' ? 'ما نؤمن به' : 'What We Stand For'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-2xl text-primary-600" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-500">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-medium tracking-widest uppercase text-sm">{language === 'ar' ? 'الفريق' : 'The Team'}</span>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mt-2">
              {language === 'ar' ? 'تعرف على خبراء الطهي لدينا' : 'Meet Our Culinary Experts'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-4 group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 object-cover rounded-full mx-auto shadow-lg group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 rounded-full bg-primary-600/0 group-hover:bg-primary-600/20 transition-colors" />
                </div>
                <h3 className="text-xl font-serif font-semibold">{member.name}</h3>
                <p className="text-primary-600 font-medium text-sm mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
