import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const translations = {
  en: {
    // Navbar
    home: 'Home',
    menu: 'Menu',
    reservations: 'Reservations',
    about: 'About',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    dashboard: 'Dashboard',
    cart: 'Cart',
    
    // Home Hero
    welcome: 'Welcome to Royal Rest.',
    heroTitle: 'Where Every Bite',
    heroSubtitle: 'Tells a Story',
    heroDesc: 'Experience the art of fine dining with our carefully curated menu, exceptional service, and unforgettable ambiance.',
    exploreMenu: 'Explore Menu',
    bookTable: 'Book a Table',
    
    // Home Features
    whyChooseUs: 'Why Choose Us',
    experienceTitle: 'The Royal Rest. Experience',
    feat1Title: 'Exquisite Cuisine',
    feat1Desc: 'Crafted by world-renowned chefs using the finest ingredients',
    feat2Title: 'Easy Reservations',
    feat2Desc: 'Book your table in seconds with our seamless reservation system',
    feat3Title: 'Fast Delivery',
    feat3Desc: 'Enjoy restaurant-quality meals delivered to your doorstep',
    feat4Title: 'Award Winning',
    feat4Desc: 'Recognized with multiple culinary excellence awards',
    
    // Home Popular
    specialties: 'Our Specialties',
    popularDishes: 'Popular Dishes',
    viewFullMenu: 'View Full Menu',
    
    // Home Testimonials
    testimonials: 'Testimonials',
    whatGuestsSay: 'What Our Guests Say',
    
    // Home CTA
    readyToDine: 'Ready for an Unforgettable Dining Experience?',
    reserveDesc: 'Reserve your table today and let us create a memorable evening for you and your loved ones.',
    reserveNow: 'Reserve Now',
    
    // Footer
    footerDesc: 'Experience the finest culinary delights in an elegant atmosphere. Where every dish tells a story and every visit creates a memory.',
    quickLinks: 'Quick Links',
    openingHours: 'Opening Hours',
    monFri: 'Monday - Friday',
    sat: 'Saturday',
    sun: 'Sunday',
    address: 'AlGarbia, Homs, Syria',
    rights: 'All rights reserved.',
    
    // Contact Page
    getInTouch: 'Get in Touch',
    contactUs: 'Contact Us',
    sendAMessage: 'Send us a Message',
    yourName: 'Your Name',
    emailAddress: 'Email Address',
    subject: 'Subject',
    message: 'Message',
    sendMessage: 'Send Message',
    contactInfo: 'Contact Information',
    phone: 'Phone',
    email: 'Email',
    followUs: 'Follow Us',
    stayUpdated: 'Stay updated with our latest news, events, and special offers.',
    editDetails: 'Edit Personal Details',
    saveDetails: 'Save Details',
    personalDetails: 'Personal Details',
    addressLabel: 'Address',
    phoneLabel: 'Phone Number',
    updateSuccess: 'Personal details updated successfully!',
    updateError: 'Failed to update details.',
    loginToEdit: 'Please login to edit your details.',
    
    // General
    loading: 'Loading...',
    search: 'Search dishes...',
    all: 'All',
    prices: 'All Prices',
    under20: 'Under $20',
    between20and40: '$20 - $40',
    over40: '$40+',
    noDishes: 'No dishes found matching your criteria.',
    clearFilters: 'Clear Filters',
    chefsChoice: "Chef's Choice",
    veg: 'Veg',
    min: 'min',
    
    // Dashboard
    myDashboard: 'My Dashboard',
    welcomeBack: 'Welcome back',
    memberSince: 'Member Since',
    myReservations: 'My Reservations',
    noReservations: 'No reservations yet',
    cancel: 'Cancel',
    editProfile: 'Edit Profile',
    syria: 'Syria',
    
    // Auth
    createAccount: 'Create Account',
    joinToday: 'Join Royal Rest. today',
    fullName: 'Full Name',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    alreadyHaveAccount: 'Already have an account?',
    signInHere: 'Sign in here',
    welcomeBackTitle: 'Welcome Back',
    signInDesc: 'Sign in to your Royal Rest. account',
    dontHaveAccount: "Don't have an account?",
    registerHere: 'Register here',
    signingIn: 'Signing in...',
    signIn: 'Sign In',
    creatingAccount: 'Creating Account...',
  },
  ar: {
    // Navbar
    home: 'الرئيسية',
    menu: 'القائمة',
    reservations: 'الحجوزات',
    about: 'من نحن',
    contact: 'اتصل بنا',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    dashboard: 'لوحة التحكم',
    cart: 'السلة',
    
    // Home Hero
    welcome: 'مرحباً بكم في رويال ريست',
    heroTitle: 'حيث كل لقمة',
    heroSubtitle: 'تحكي قصة',
    heroDesc: 'اختبر فن الطعام الراقي مع قائمتنا المنسقة بعناية، وخدمتنا الاستثنائية، وأجوائنا التي لا تُنسى.',
    exploreMenu: 'استكشف القائمة',
    bookTable: 'احجز طاولة',
    
    // Home Features
    whyChooseUs: 'لماذا تختارنا',
    experienceTitle: 'تجربة رويال ريست',
    feat1Title: 'مطبخ متميز',
    feat1Desc: 'مُعد من قبل طهاة عالميين باستخدام أجود المكونات',
    feat2Title: 'حجوزات سهلة',
    feat2Desc: 'احجز طاولتك في ثوانٍ مع نظام الحجز السلس لدينا',
    feat3Title: 'توصيل سريع',
    feat3Desc: 'استمتع بوجبات بجودة المطاعم تصل إلى باب منزلك',
    feat4Title: 'حائز على جوائز',
    feat4Desc: 'معترف بنا بالعديد من جوائز التميز في الطهي',
    
    // Home Popular
    specialties: 'تخصصاتنا',
    popularDishes: 'الأطباق الشهيرة',
    viewFullMenu: 'عرض القائمة الكاملة',
    
    // Home Testimonials
    testimonials: 'آراء العملاء',
    whatGuestsSay: 'ماذا يقول ضيوفنا',
    
    // Home CTA
    readyToDine: 'هل أنت مستعد لتجربة عشاء لا تُنسى؟',
    reserveDesc: 'احجز طاولتك اليوم ودعنا نخلق أمسية لا تُنسى لك ولأحبائك.',
    reserveNow: 'احجز الآن',
    
    // Footer
    footerDesc: 'استمتع بأرقى المأكولات في أجواء أنيقة. حيث تحكي كل وجبة قصة وكل زيارة تخلق ذكرى.',
    quickLinks: 'روابط سريعة',
    openingHours: 'ساعات العمل',
    monFri: 'الاثنين - الجمعة',
    sat: 'السبت',
    sun: 'الأحد',
    address: 'الغربية، حمص، سوريا',
    rights: 'جميع الحقوق محفوظة.',
    
    // Contact Page
    getInTouch: 'تواصل معنا',
    contactUs: 'اتصل بنا',
    sendAMessage: 'أرسل لنا رسالة',
    yourName: 'اسمك',
    emailAddress: 'البريد الإلكتروني',
    subject: 'الموضوع',
    message: 'الرسالة',
    sendMessage: 'إرسال الرسالة',
    contactInfo: 'معلومات الاتصال',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    followUs: 'تابعنا',
    stayUpdated: 'ابق على اطلاع بآخر أخبارنا وفعالياتنا وعروضنا الخاصة.',
    editDetails: 'تعديل البيانات الشخصية',
    saveDetails: 'حفظ البيانات',
    personalDetails: 'البيانات الشخصية',
    addressLabel: 'العنوان',
    phoneLabel: 'رقم الهاتف',
    updateSuccess: 'تم تحديث البيانات الشخصية بنجاح!',
    updateError: 'فشل تحديث البيانات.',
    loginToEdit: 'يرجى تسجيل الدخول لتعديل بياناتك.',
    
    // General
    loading: 'جاري التحميل...',
    search: 'ابحث عن الأطباق...',
    all: 'الكل',
    prices: 'جميع الأسعار',
    under20: 'أقل من 20 دولار',
    between20and40: '20 - 40 دولار',
    over40: '+40 دولار',
    noDishes: 'لم يتم العثور على أطباق تطابق معاييرك.',
    clearFilters: 'مسح التصفية',
    chefsChoice: 'اختيار الشيف',
    veg: 'نباتي',
    min: 'دقيقة',
    
    // Dashboard
    myDashboard: 'لوحة التحكم الخاصة بي',
    welcomeBack: 'مرحباً بعودتك',
    memberSince: 'عضو منذ',
    myReservations: 'حجوزاتي',
    noReservations: 'لا توجد حجوزات بعد',
    cancel: 'إلغاء',
    editProfile: 'تعديل الملف الشخصي',
    syria: 'سوريا',
    
    // Auth
    createAccount: 'إنشاء حساب',
    joinToday: 'انضم إلى رويال ريست اليوم',
    fullName: 'الاسم الكامل',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',
    signInHere: 'سجل دخولك هنا',
    welcomeBackTitle: 'مرحباً بعودتك',
    signInDesc: 'سجل دخولك إلى حساب رويال ريست الخاص بك',
    dontHaveAccount: 'ليس لديك حساب؟',
    registerHere: 'سجل هنا',
    signingIn: 'جاري تسجيل الدخول...',
    signIn: 'تسجيل الدخول',
    creatingAccount: 'جاري إنشاء الحساب...',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key) => translations[language][key] || key;

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
