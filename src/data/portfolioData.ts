export interface ProjectItem {
  id: string;
  category: "fullstack" | "landing" | "ecommerce";
  title: { ar: string; en: string };
  shortDesc: { ar: string; en: string };
  fullDesc: { ar: string; en: string };
  tags: string[];
  metrics: { ar: string; en: string };
  client: { ar: string; en: string };
  duration: { ar: string; en: string };
  liveUrl: string;
  gradient: string;
}

export interface ServiceItem {
  id: string;
  iconName: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  features: { ar: string[]; en: string[] };
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: { ar: string; en: string };
  company: string;
  quote: { ar: string; en: string };
  rating: number;
}

export const projectsData: ProjectItem[] = [
  {
    id: "apex-fintech",
    category: "fullstack",
    title: {
      ar: "منصة إيبكس للحلول المالية (Apex Fintech)",
      en: "Apex Fintech Dashboard & App",
    },
    shortDesc: {
      ar: "لوحة تحكم مالية فائقة السرعة مع تحليلات لحظية وإشارات تداول ذكية.",
      en: "Ultra-fast financial analytics dashboard with real-time trading signals.",
    },
    fullDesc: {
      ar: "تم تطوير المنصة باستخدام Next.js 15 وTypeScript مع اتصال WebSockets مباشر لتحليل بيانات الأسهم. واجهة زجاجية تفاعلية مع أداء 100/100 على Lighthouse.",
      en: "Engineered with Next.js 15, TypeScript, and WebSockets for real-time market streams. Liquid glass UI achieving flawless 100/100 Lighthouse performance.",
    },
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "WebSockets", "Chart.js"],
    metrics: {
      ar: "+320% سرعة استجابة | 100/100 أداء",
      en: "+320% Response Speed | 100/100 Score",
    },
    client: { ar: "مجموعة إيبكس الدولية", en: "Apex Global Capital" },
    duration: { ar: "3 أسابيع", en: "3 Weeks" },
    liveUrl: "https://example.com/apex",
    gradient: "from-blue-500/20 via-indigo-500/10 to-purple-500/20",
  },
  {
    id: "lumina-hyper-landing",
    category: "landing",
    title: {
      ar: "لومينا — صفحة هبوط لمنتج ذكاء اصطناعي",
      en: "Lumina AI — HyperOS Landing Page",
    },
    shortDesc: {
      ar: "صفحة هبوط فاخرة ثلاثية الأبعاد بأسلوب Glassmorphism ومؤثرات حركية خفيفة.",
      en: "Luxury 3D glassmorphic landing page with smooth interactive transitions.",
    },
    fullDesc: {
      ar: "تصميم فريد يعتمد على واجهات HyperOS السائلة مع متتبع إضاءة الماوس ومكتبة Framer Motion لرفع معدلات التحويل للمنتج بنسبة 45%.",
      en: "Unique design utilizing HyperOS liquid aesthetics, spotlight cursor borders, and Framer Motion micro-animations boosting conversion by 45%.",
    },
    tags: ["React", "Framer Motion", "Tailwind CSS", "Glassmorphism", "i18n"],
    metrics: {
      ar: "+45% ارتفاع التحويل | +2.5x مدة البقاء",
      en: "+45% Conversion Boost | +2.5x Time on Site",
    },
    client: { ar: "مختبرات لومينا للذكاء الاصطناعي", en: "Lumina AI Labs" },
    duration: { ar: "أسبوعان", en: "2 Weeks" },
    liveUrl: "https://example.com/lumina",
    gradient: "from-purple-500/20 via-pink-500/10 to-rose-500/20",
  },
  {
    id: "aether-ecom",
    category: "ecommerce",
    title: {
      ar: "متجر إيثر للساعات الفاخرة (Aether Luxury)",
      en: "Aether Luxury Horology E-Store",
    },
    shortDesc: {
      ar: "منصة تجارة إلكترونية راقية توفر تجربة تسوق ثلاثية الأبعاد للساعات والمقتنيات الثمينة.",
      en: "High-end horology e-commerce platform with 3D product previews and instant checkout.",
    },
    fullDesc: {
      ar: "بناء متجر مخصص بالكامل بدون قالب تقليدي، يدمج بين السرعة الخاطفة وسهولة إتمام الشراء بنقرة واحدة وتعدد العملات واللغات.",
      en: "Custom e-commerce build without generic templates, combining lightning performance, 1-click checkout, and multi-currency i18n.",
    },
    tags: ["Next.js", "Stripe API", "Zustand", "Tailwind CSS", "i18n"],
    metrics: {
      ar: "+180% زيادة المبيعات | تحميل أقل من 0.8 ثانية",
      en: "+180% Sales Growth | Sub-0.8s Load Time",
    },
    client: { ar: "دار إيثر للساعات الفاخرة", en: "Aether Luxury Watches" },
    duration: { ar: "4 أسابيع", en: "4 Weeks" },
    liveUrl: "https://example.com/aether",
    gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
  },
  {
    id: "hyper-agency-saas",
    category: "fullstack",
    title: {
      ar: "منصة هايبراغي لإدارة الأعمال المتقدمة",
      en: "HyperAgency Management SaaS",
    },
    shortDesc: {
      ar: "نظام إدارة مشاريع وتواصل رقمي مصمم للوكالات الفاخرة وفرق العمل المبدعة.",
      en: "Project management & client portal SaaS built for high-end digital agencies.",
    },
    fullDesc: {
      ar: "نظام SaaS متكامل يدعم الدفع الاشتراكي، الجداول التفاعلية، التقارير الذكية ونظام إشعارات لحظية.",
      en: "Comprehensive SaaS platform featuring subscription payments, interactive Kanban timelines, smart analytics, and instant notifications.",
    },
    tags: ["Next.js App Router", "Prisma", "PostgreSQL", "Tailwind CSS"],
    metrics: {
      ar: "أكثر من 10k مستخدم نشط | ثبات 99.99%",
      en: "10k+ Active Users | 99.99% Uptime",
    },
    client: { ar: "استوديو هايبراغي برلين", en: "HyperAgency Berlin" },
    duration: { ar: "5 أسابيع", en: "5 Weeks" },
    liveUrl: "https://example.com/hyperagency",
    gradient: "from-amber-500/20 via-orange-500/10 to-yellow-500/20",
  },
];

export const servicesData: ServiceItem[] = [
  {
    id: "web-apps",
    iconName: "Code2",
    title: {
      ar: "تطوير تطبيقات ويب فائقة الأداء",
      en: "Full-Stack Web Applications",
    },
    description: {
      ar: "تطوير منصات ويب سريعة وآمنة وقابلة للتوسع باستخدام أحدث تقنيات Next.js 15 وTypeScript.",
      en: "Building secure, lightning-fast, and scalable web platforms using Next.js 15 & TypeScript.",
    },
    features: {
      ar: [
        "بنية سحابية حديثة",
        "دعم كامل للغتين العربية والإنجليزية (RTL/LTR)",
        "سرعة أداء Lighthouse 100/100",
        "تكامل سلس مع قواعد البيانات والأنظمة الخلفية",
      ],
      en: [
        "Modern cloud architecture",
        "Native bilingual RTL/LTR support",
        "100/100 Lighthouse performance",
        "Seamless database & backend API integrations",
      ],
    },
  },
  {
    id: "landing-pages",
    iconName: "Sparkles",
    title: {
      ar: "صفحات هبوط فاخرة (Luxury Landings)",
      en: "High-Converting Luxury Landings",
    },
    description: {
      ar: "تصميم وتطوير صفحات هبوط بلمسات زجاجية شفافة وتفاعلات سائلة تجذب انتباه الزوار وتضاعف التحويل.",
      en: "Bespoke glassmorphic landing pages with fluid micro-interactions engineered to maximize ROI.",
    },
    features: {
      ar: [
        "تصميم زجاجي HyperOS / iOS",
        "حركات متقدمة بـ Framer Motion",
        "تحسين الاستجابة لكافة الهواتف والشاشات",
        "ربط مع أدوات التحليل وجمع البيانات",
      ],
      en: [
        "Apple iOS & HyperOS glassmorphism aesthetics",
        "Advanced Framer Motion micro-interactions",
        "Flawless responsiveness across all displays",
        "Integrated analytics & lead captures",
      ],
    },
  },
  {
    id: "e-commerce",
    iconName: "ShoppingBag",
    title: {
      ar: "متاجر إلكترونية فاخرة مخصصة",
      en: "Custom High-End E-Commerce",
    },
    description: {
      ar: "حلول تجارة إلكترونية مبتكرة خالية من القوالب التكرارية، توفر تجربة شراء سلسة وسريعة.",
      en: "Template-free custom e-commerce experiences with effortless checkout and premium showcases.",
    },
    features: {
      ar: [
        "تجربة شراء بنقرة واحدة",
        "دعم بوابة الدفع وسلة التسوق المتقدمة",
        "تحميل فوري للمنتجات والصور",
        "لوحة تحكم خاصة لإدارة المبيعات",
      ],
      en: [
        "1-click effortless checkout process",
        "Multi-currency & gateway payment integration",
        "Instant image & product loading",
        "Custom management dashboard",
      ],
    },
  },
  {
    id: "design-systems",
    iconName: "Palette",
    title: {
      ar: "هندسة الواجهات وأنظمة التصميم (Design Systems)",
      en: "UI/UX & Design System Engineering",
    },
    description: {
      ar: "بناء مكتبة مكونات متناسقة وقابلة لإعادة الاستخدام تضمن فخامة وهوية علاماتك التجارية.",
      en: "Crafting reusable, cohesive UI component libraries that embody luxury and prestige.",
    },
    features: {
      ar: [
        "مكونات Tailwind CSS و Radix UI",
        "أنظمة الألوان المظلمة والمضاءة",
        "دليل استخدام وتوثيق كامل",
        "مراعاة أعلى معايير إمكانية الوصول (Accessibility)",
      ],
      en: [
        "Tailwind CSS & custom component libraries",
        "Fluid dark & light theme tokens",
        "Comprehensive UI documentation",
        "Strict WCAG accessibility standards",
      ],
    },
  },
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: "t1",
    name: "سعود بن عبد العزيز",
    role: {
      ar: "المؤسس التنفيذي لشركة Apex Fintech",
      en: "CEO & Founder at Apex Fintech",
    },
    company: "Apex Fintech",
    quote: {
      ar: "العمل مع دانيال كان نقطة تحول لمنصتنا. الدقة في المواعيد، التصميم الزجاجي الفاخر، والأداء الذي أبهر مستثمرينا يجعل منه مهندس البرمجيات رقم واحد بالنسبة لنا.",
      en: "Working with Daniel was a game-changer for our platform. His eye for luxury design, combined with sub-second performance, impressed our top investors.",
    },
    rating: 5,
  },
  {
    id: "t2",
    name: "Alexandre Laurent",
    role: {
      ar: "مدير العلامة التجارية في Aether Luxury",
      en: "Brand Director at Aether Luxury",
    },
    company: "Aether Luxury",
    quote: {
      ar: "7mud قدم لنا متجراً إلكترونياً يتفوق بسنوات على المنافسين. التفاعلات السائلة والسرعة الخاطفة رفعت مبيعاتنا بشكل ملحوظ.",
      en: "7mud delivered an e-commerce platform years ahead of the competition. The fluid interactions and raw speed directly boosted our conversion rates.",
    },
    rating: 5,
  },
  {
    id: "t3",
    name: "خالد المنصوري",
    role: {
      ar: "شريك مؤسس في مختبرات Lumina AI",
      en: "Co-Founder at Lumina AI Labs",
    },
    company: "Lumina AI",
    quote: {
      ar: "أفضل تجربة تطوير خضناها على الإطلاق! التجاوب المباشر والاحترافية العالية جعلتنا نطلب التعامل معه لمشاريعنا القادمة بلا تردد.",
      en: "Hands down the best development experience we've ever had. Professionalism, direct communication, and unmatched execution speed.",
    },
    rating: 5,
  },
];

export const estimatorOptions = {
  projectTypes: [
    {
      id: "landing",
      label: { ar: "صفحة هبوط فاخرة (Landing Page)", en: "Luxury Landing Page" },
      baseCost: 1200,
      baseDays: 5,
    },
    {
      id: "webapp",
      label: { ar: "تطبيق ويب متكامل (Full-Stack Web App)", en: "Full-Stack Web Application" },
      baseCost: 2800,
      baseDays: 14,
    },
    {
      id: "ecom",
      label: { ar: "متجر إلكتروني مخصص (E-Commerce Store)", en: "Custom E-Commerce Store" },
      baseCost: 3500,
      baseDays: 21,
    },
    {
      id: "saas",
      label: { ar: "منصة سحابية متقدمة (SaaS Platform)", en: "Advanced SaaS Platform" },
      baseCost: 4800,
      baseDays: 30,
    },
  ],
  timelines: [
    {
      id: "standard",
      label: { ar: "جدول عادي (قياسي)", en: "Standard Pace" },
      multiplier: 1.0,
    },
    {
      id: "express",
      label: { ar: "تسليم سريع (Express +30%)", en: "Express Rush (+30%)" },
      multiplier: 1.3,
    },
  ],
  features: [
    {
      id: "i18n",
      label: { ar: "تعدد اللغات (عربي / إنجليزي RTL/LTR)", en: "Bilingual i18n (Arabic & English)" },
      cost: 400,
    },
    {
      id: "design_system",
      label: { ar: "نظام تصميم مخصص HyperOS Glass UI", en: "HyperOS Glass Design System" },
      cost: 600,
    },
    {
      id: "cms_api",
      label: { ar: "ربط لوحة تحكم وإدارات محتوى (CMS/APIs)", en: "Custom CMS & Backend API" },
      cost: 800,
    },
    {
      id: "seo_perf",
      label: { ar: "تحسين محركات البحث والأداء 100%", en: "Lighthouse 100% SEO & Speed Optimization" },
      cost: 350,
    },
  ],
};
