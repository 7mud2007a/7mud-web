export interface ServiceItem {
  id: string;
  iconName: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  features: { ar: string[]; en: string[] };
}

export const servicesData: ServiceItem[] = [
  {
    id: "web-apps",
    iconName: "Code2",
    title: {
      ar: "تصميم عصري وحصري",
      en: "Modern & Exclusive Design",
    },
    description: {
      ar: "واجهات جذابة وسهلة الاستخدام تناسب هاتف وحاسوب العميل.",
      en: "Attractive, user-friendly interfaces tailored for both mobile and desktop.",
    },
    features: {
      ar: [
        "تصميم مخصص يتناسب مع هوية مشروعك",
        "واجهات جذابة وسهلة الاستخدام",
        "تجاوب كامل مع مختلف أنواع الهواتف والحواسب",
      ],
      en: [
        "Custom design tailored to your brand identity",
        "Attractive and intuitive user interfaces",
        "Fully responsive across mobile and desktop screens",
      ],
    },
  },
  {
    id: "cms",
    iconName: "Sparkles",
    title: {
      ar: "لوحة تحكم خاصة",
      en: "Custom Control Panel",
    },
    description: {
      ar: "تمكّنك من إدارة محتوى موقعك بنفسك بكل بساطة.",
      en: "Easily manage your website content independently with simplicity.",
    },
    features: {
      ar: [
        "إضافة وتعديل المحتوى بكل سهولة",
        "إدارة الصور والصفحات والمنتجات",
        "تجربة إدارية بسيطة وسريعة",
      ],
      en: [
        "Easily add and edit content",
        "Manage images, pages, and items",
        "Simple and quick management experience",
      ],
    },
  },
  {
    id: "database",
    iconName: "ShoppingBag",
    title: {
      ar: "قاعدة بيانات وتسجيل دخول",
      en: "Database & Authentication",
    },
    description: {
      ar: "لحفظ بياناتك وعملائك بشكل آمن وسريع.",
      en: "Store your data and user information safely and quickly.",
    },
    features: {
      ar: [
        "حفظ طلبات العملاء والبيانات بأمان",
        "نظام تسجيل دخول وصلاحيات مستخدمين",
        "بنية آمنة وسريعة الاستجابة",
      ],
      en: [
        "Securely store client orders and data",
        "User login and permissions system",
        "Secure and highly responsive architecture",
      ],
    },
  },
  {
    id: "speed-seo",
    iconName: "Palette",
    title: {
      ar: "سرعة وتوافق عالي",
      en: "High Speed & SEO",
    },
    description: {
      ar: "موقع سريع التصفح ومهيأ للظهور في محركات البحث.",
      en: "Fast-browsing website optimized for search engines and performance.",
    },
    features: {
      ar: [
        "سرعة أداء عالية وزمن تحميل سريع",
        "تهيئة أصلية لمحركات البحث (SEO)",
        "أداء مستقر على جميع الشبكات",
      ],
      en: [
        "High performance and rapid loading speed",
        "Native Search Engine Optimization (SEO)",
        "Stable performance across all networks",
      ],
    },
  },
];
