import { createClient } from "@/lib/supabase/client";

export interface SiteSettings {
  id: string;
  website_title: string;
  meta_description: string;
  keywords: string;
  og_title: string;
  og_description: string;
  og_image: string;
  favicon_url: string;
  theme: "dark" | "light";
  primary_color: string;
  accent_color: string;
  background_settings: { style: string; blur: boolean };
  animation_settings: { enabled: boolean; speed: string };
  updated_at?: string;
}

export interface NavigationItem {
  id: string;
  label_ar: string;
  label_en: string;
  href: string;
  enabled: boolean;
  display_order: number;
}

export interface HeroContent {
  id: string;
  status_badge_ar: string;
  status_badge_en: string;
  title_prefix_ar: string;
  title_prefix_en: string;
  title_highlight_ar: string;
  title_highlight_en: string;
  title_suffix_ar: string;
  title_suffix_en: string;
  subtitle_ar: string;
  subtitle_en: string;
  cta_primary_ar: string;
  cta_primary_en: string;
  cta_secondary_ar: string;
  cta_secondary_en: string;
  hero_image_url?: string;
  updated_at?: string;
}

export interface AboutContent {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  skills: string[];
  other_content_ar?: string;
  other_content_en?: string;
  updated_at?: string;
}

export interface ServiceItem {
  id: string;
  icon_name: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  price?: string;
  features_ar: string[];
  features_en: string[];
  image_url?: string;
  display_order?: number;
}

export interface ProjectItem {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  technologies: string[];
  project_url?: string;
  github_url?: string;
  image_url?: string;
  is_featured: boolean;
  display_order?: number;
}

export interface ContactInfo {
  id: string;
  badge_ar: string;
  badge_en: string;
  title_ar: string;
  title_en: string;
  subtitle_ar: string;
  subtitle_en: string;
  whatsapp_number: string;
  telegram_username: string;
  instagram_username: string;
  contact_text_ar: string;
  contact_text_en: string;
}

// Default Fallbacks
export const defaultSiteSettings: SiteSettings = {
  id: "default",
  website_title: "حمود — 7mud | تصميم وتطوير مواقع الويب",
  meta_description: "أصمم وأطور مواقع ويب عصرية، سريعة، ومخصصة لهوية مشروعك بالكامل.",
  keywords: "تصميم مواقع, تطوير ويب, Next.js, Supabase, React, حمود",
  og_title: "حمود — 7mud | تصميم وتطوير مواقع الويب",
  og_description: "أصمم وأطور مواقع ويب عصرية، سريعة، ومخصصة لهوية مشروعك بالكامل.",
  og_image: "",
  favicon_url: "/favicon.ico",
  theme: "dark",
  primary_color: "#000000",
  accent_color: "#ffffff",
  background_settings: { style: "grid", blur: true },
  animation_settings: { enabled: true, speed: "normal" },
};

export const defaultNavigation: NavigationItem[] = [
  { id: "home", label_ar: "الرئيسية", label_en: "Home", href: "#hero", enabled: true, display_order: 1 },
  { id: "services", label_ar: "مميزات العمل", label_en: "Features", href: "#services", enabled: true, display_order: 2 },
  { id: "pricing", label_ar: "الباقات", label_en: "Pricing", href: "#pricing", enabled: true, display_order: 3 },
  { id: "contact", label_ar: "تواصل معي", label_en: "Contact", href: "#contact", enabled: true, display_order: 4 },
];

export const defaultHeroContent: HeroContent = {
  id: "default",
  status_badge_ar: "متفرغ للمشاريع الجديدة",
  status_badge_en: "Available for new projects",
  title_prefix_ar: "تصميم وتطوير",
  title_prefix_en: "Designing & Building",
  title_highlight_ar: "مواقع ويب عصرية",
  title_highlight_en: "Modern Websites",
  title_suffix_ar: "وسريعة",
  title_suffix_en: "Tailored to Your Brand",
  subtitle_ar: "أصمم وأطور مواقع ويب عصرية، سريعة، ومخصصة لهوية مشروعك بالكامل.",
  subtitle_en: "Designing and building modern, high-performance websites tailored to your brand.",
  cta_primary_ar: "تواصل عبر واتساب",
  cta_primary_en: "Contact via WhatsApp",
  cta_secondary_ar: "عرض الباقات",
  cta_secondary_en: "View Packages",
  hero_image_url: "",
};

export const defaultAboutContent: AboutContent = {
  id: "default",
  title_ar: "عن حمود (7mud)",
  title_en: "About 7mud",
  description_ar: "مطور مواقع متكامل خبير بإنشاء واجهات المستخدم فائقة السلاسة والأنظمة الحديثة. أعمل بأحدث تقنيات الويب لبناء حضور رقمي قوي لعلامتك التجارية.",
  description_en: "Full-stack web developer passionate about crafting seamless user experiences and modern digital platforms.",
  skills: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Supabase", "Node.js", "Framer Motion"],
  other_content_ar: "",
  other_content_en: "",
};

export const defaultServices: ServiceItem[] = [
  {
    id: "web-apps",
    icon_name: "Code2",
    title_ar: "تصميم عصري وحصري",
    title_en: "Modern & Exclusive Design",
    description_ar: "واجهات جذابة وسهلة الاستخدام تناسب هاتف وحاسوب العميل.",
    description_en: "Attractive, user-friendly interfaces tailored for both mobile and desktop.",
    price: "400$",
    features_ar: [
      "تصميم مخصص يتناسب مع هوية مشروعك",
      "واجهات جذابة وسهلة الاستخدام",
      "تجاوب كامل مع مختلف أنواع الهواتف والحواسب",
    ],
    features_en: [
      "Custom design tailored to your brand identity",
      "Attractive and intuitive user interfaces",
      "Fully responsive across mobile and desktop screens",
    ],
    display_order: 1,
  },
  {
    id: "cms",
    icon_name: "Sparkles",
    title_ar: "لوحة تحكم خاصة",
    title_en: "Custom Control Panel",
    description_ar: "تمكّنك من إدارة محتوى موقعك بنفسك بكل بساطة.",
    description_en: "Easily manage your website content independently with simplicity.",
    price: "750$",
    features_ar: [
      "إضافة وتعديل المحتوى بكل سهولة",
      "إدارة الصور والصفحات والمنتجات",
      "تجربة إدارية بسيطة وسريعة",
    ],
    features_en: [
      "Easily add and edit content",
      "Manage images, pages, and items",
      "Simple and quick management experience",
    ],
    display_order: 2,
  },
  {
    id: "database",
    icon_name: "ShoppingBag",
    title_ar: "قاعدة بيانات وتسجيل دخول",
    title_en: "Database & Authentication",
    description_ar: "لحفظ بياناتك وعملائك بشكل آمن وسريع.",
    description_en: "Store your data and user information safely and quickly.",
    price: "1,200$",
    features_ar: [
      "حفظ طلبات العملاء والبيانات بأمان",
      "نظام تسجيل دخول وصلاحيات مستخدمين",
      "بنية آمنة وسريعة الاستجابة",
    ],
    features_en: [
      "Securely store client orders and data",
      "User login and permissions system",
      "Secure and highly responsive architecture",
    ],
    display_order: 3,
  },
  {
    id: "speed-seo",
    icon_name: "Palette",
    title_ar: "سرعة وتوافق عالي",
    title_en: "High Speed & SEO",
    description_ar: "موقع سريع التصفح ومهيأ للظهور في محركات البحث.",
    description_en: "Fast-browsing website optimized for search engines and performance.",
    price: "400$",
    features_ar: [
      "سرعة أداء عالية وزمن تحميل سريع",
      "تهيئة أصلية لمحركات البحث (SEO)",
      "أداء مستقر على جميع الشبكات",
    ],
    features_en: [
      "High performance and rapid loading speed",
      "Native Search Engine Optimization (SEO)",
      "Stable performance across all networks",
    ],
    display_order: 4,
  },
];

export const defaultProjects: ProjectItem[] = [];

export const defaultContactInfo: ContactInfo = {
  id: "default",
  badge_ar: "تواصل معي",
  badge_en: "GET IN TOUCH",
  title_ar: "دعنا نبدأ في تنفيذ موقعك",
  title_en: "Let's Build Your Website",
  subtitle_ar: "تواصل معي مباشرة عبر إحدى الوسائل التالية أو أرسل رسالتك هنا.",
  subtitle_en: "Reach out directly via social channels or send a message below.",
  whatsapp_number: "963951708141",
  telegram_username: "@Dev7mud",
  instagram_username: "@dev7mud",
  contact_text_ar: "تواصل معي مباشرة لتنفيذ موقعك بأعلى جودة.",
  contact_text_en: "Reach out to get your high quality website created.",
};

// Data Fetching Functions
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("site_settings").select("*").single();
    if (error || !data) return defaultSiteSettings;
    return { ...defaultSiteSettings, ...data };
  } catch {
    return defaultSiteSettings;
  }
}

export async function getNavigation(): Promise<NavigationItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("navigation").select("*").order("display_order", { ascending: true });
    if (error || !data || data.length === 0) return defaultNavigation;
    return data;
  } catch {
    return defaultNavigation;
  }
}

export async function getHeroContent(): Promise<HeroContent> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("hero_content").select("*").single();
    if (error || !data) return defaultHeroContent;
    return { ...defaultHeroContent, ...data };
  } catch {
    return defaultHeroContent;
  }
}

export async function getAboutContent(): Promise<AboutContent> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("about_content").select("*").single();
    if (error || !data) return defaultAboutContent;
    return { ...defaultAboutContent, ...data };
  } catch {
    return defaultAboutContent;
  }
}

export async function getServices(): Promise<ServiceItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("services").select("*").order("display_order", { ascending: true });
    if (error || !data || data.length === 0) return defaultServices;
    return data;
  } catch {
    return defaultServices;
  }
}

export async function getProjects(): Promise<ProjectItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("projects").select("*").order("display_order", { ascending: true });
    if (error || !data) return defaultProjects;
    return data;
  } catch {
    return defaultProjects;
  }
}

export async function getContactInfo(): Promise<ContactInfo> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("contact_info").select("*").single();
    if (error || !data) return defaultContactInfo;
    return { ...defaultContactInfo, ...data };
  } catch {
    return defaultContactInfo;
  }
}
