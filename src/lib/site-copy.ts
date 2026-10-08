export interface SiteCopy {
  nav_cta_ar: string;
  nav_cta_en: string;
  services_badge_ar: string;
  services_badge_en: string;
  services_title_ar: string;
  services_title_en: string;
  services_subtitle_ar: string;
  services_subtitle_en: string;
  pricing_badge_ar: string;
  pricing_badge_en: string;
  pricing_title_ar: string;
  pricing_title_en: string;
  pricing_subtitle_ar: string;
  pricing_subtitle_en: string;
  pricing_card_title_ar: string;
  pricing_card_title_en: string;
  pricing_price_ar: string;
  pricing_price_en: string;
  pricing_note_ar: string;
  pricing_note_en: string;
  pricing_cta_ar: string;
  pricing_cta_en: string;
  pricing_features_ar: string[];
  pricing_features_en: string[];
  contact_direct_ar: string;
  contact_direct_en: string;
  contact_whatsapp_label_ar: string;
  contact_whatsapp_label_en: string;
  contact_telegram_label_ar: string;
  contact_telegram_label_en: string;
  contact_instagram_label_ar: string;
  contact_instagram_label_en: string;
  contact_form_success_title_ar: string;
  contact_form_success_title_en: string;
  contact_form_success_ar: string;
  contact_form_success_en: string;
  contact_name_label_ar: string;
  contact_name_label_en: string;
  contact_name_placeholder_ar: string;
  contact_name_placeholder_en: string;
  contact_email_label_ar: string;
  contact_email_label_en: string;
  contact_message_label_ar: string;
  contact_message_label_en: string;
  contact_message_placeholder_ar: string;
  contact_message_placeholder_en: string;
  contact_send_ar: string;
  contact_send_en: string;
  footer_tagline_ar: string;
  footer_tagline_en: string;
  footer_rights_ar: string;
  footer_rights_en: string;
  footer_scroll_top_ar: string;
  footer_scroll_top_en: string;
  whatsapp_hero_message_ar: string;
  whatsapp_hero_message_en: string;
  whatsapp_pricing_message_ar: string;
  whatsapp_pricing_message_en: string;
  whatsapp_footer_message_ar: string;
  whatsapp_footer_message_en: string;
  whatsapp_contact_message_ar: string;
  whatsapp_contact_message_en: string;
}

export const defaultSiteCopy: SiteCopy = {
  nav_cta_ar: "تواصل معي",
  nav_cta_en: "Contact Me",
  services_badge_ar: "مميزات العمل معي",
  services_badge_en: "WHAT YOU GET",
  services_title_ar: "ما الذي تحصل عليه عند العمل معي؟",
  services_title_en: "Key Features & Advantages",
  services_subtitle_ar: "خدمات متكاملة تضمن حصولك على موقع ويب احترافي يدعم نمو أعمالك.",
  services_subtitle_en: "Comprehensive web development services ensuring a professional site that grows your business.",
  pricing_badge_ar: "الأسعار والخدمات",
  pricing_badge_en: "PRICING & SERVICES",
  pricing_title_ar: "خيار احترافي متكامل لمشروعك",
  pricing_title_en: "Comprehensive Solution For Your Business",
  pricing_subtitle_ar: "خطة مخصصة تلبي كافة احتياجاتك البرمجية بوضوح وشفافية.",
  pricing_subtitle_en: "A complete custom plan designed to cover all your digital requirements.",
  pricing_card_title_ar: "موقع مخصص — مبني خصيصاً لاحتياجاتك",
  pricing_card_title_en: "Custom Website — Built For Your Needs",
  pricing_price_ar: "299$+",
  pricing_price_en: "$299+",
  pricing_note_ar: "يبدأ من 299$ — السعر النهائي يعتمد على حجم المشروع ومتطلباته.",
  pricing_note_en: "Starting from $299 — Final price depends on the project's size and requirements.",
  pricing_cta_ar: "اطلب مشروعك الآن",
  pricing_cta_en: "Start Your Project",
  pricing_features_ar: [
    "تصميم وتطوير موقع مخصص بالكامل",
    "ربط كامل مع قاعدة البيانات",
    "نظام تسجيل الدخول وإدارة المستخدمين",
    "لوحة تحكم إدارية خاصة",
    "نظام طلبات وحجوزات متكامل",
    "نماذج اتصال واستفسارات العملاء",
    "ربط وسائل التواصل (واتساب، تيليجرام، إنستغرام)",
    "ربط واجهات البرمجية (APIs) والخدمات الخارجية",
    "دمج أنظمة الدفع الإلكتروني عند الحاجة",
    "تهيئة محركات البحث (SEO) وتسريع الأداء",
    "تصميم متوافق بالكامل مع الهواتف والحواسب",
    "رفع الموقع وربطه بالنطاق (Domain)"
  ],
  pricing_features_en: [
    "Fully custom website design & development",
    "Complete database integration",
    "User registration & login",
    "Admin dashboard",
    "Orders & booking systems",
    "Contact forms & customer inquiries",
    "WhatsApp / Telegram / Instagram integration",
    "API & third-party service integrations",
    "Payment system integration when required",
    "SEO & performance optimization",
    "Fully responsive design for mobile, tablet and desktop",
    "Website deployment & domain connection"
  ],
  contact_direct_ar: "وسائل التواصل المباشر",
  contact_direct_en: "Direct Contact Channels",
  contact_whatsapp_label_ar: "واتساب",
  contact_whatsapp_label_en: "WhatsApp",
  contact_telegram_label_ar: "تيليجرام",
  contact_telegram_label_en: "Telegram",
  contact_instagram_label_ar: "إنستغرام",
  contact_instagram_label_en: "Instagram",
  contact_form_success_title_ar: "شكراً لك!",
  contact_form_success_title_en: "Thank You!",
  contact_form_success_ar: "تم إرسال رسالتك بنجاح! سأتواصل معك في أقرب وقت ممكن.",
  contact_form_success_en: "Message sent successfully! I will respond promptly.",
  contact_name_label_ar: "الاسم الكامل",
  contact_name_label_en: "Full Name",
  contact_name_placeholder_ar: "اكتب اسمك هنا...",
  contact_name_placeholder_en: "Enter your name...",
  contact_email_label_ar: "البريد الإلكتروني",
  contact_email_label_en: "Email Address",
  contact_message_label_ar: "تفاصيل المشروع أو الاستفسار",
  contact_message_label_en: "Project Details or Inquiry",
  contact_message_placeholder_ar: "تحدث عن موقعك المطلوب، أهدافه، وأي تفاصيل أخرى...",
  contact_message_placeholder_en: "Describe your project goals, scope, and requirements...",
  contact_send_ar: "إرسال الرسالة",
  contact_send_en: "Send Message",
  footer_tagline_ar: "تصميم وتطوير مواقع ويب عصرية وسريعة مخصصة لعلامتك التجارية.",
  footer_tagline_en: "Designing and building modern, high-performance websites tailored to your brand.",
  footer_rights_ar: "جميع الحقوق محفوظة © 2026 حمود (7mud)",
  footer_rights_en: "All rights reserved © 2026 7mud",
  footer_scroll_top_ar: "للأعلى",
  footer_scroll_top_en: "Back to Top",
  whatsapp_hero_message_ar: "مرحبا أريد الاستفسار عن تصميم موقع",
  whatsapp_hero_message_en: "Hello, I'd like to inquire about building a website",
  whatsapp_pricing_message_ar: "مرحبا أريد الاستفسار عن خدمة تصميم وتطوير المواقع",
  whatsapp_pricing_message_en: "Hello, I'd like to inquire about website development services",
  whatsapp_footer_message_ar: "مرحبا حمود أريد الاستفسار عن تصميم موقع",
  whatsapp_footer_message_en: "Hello 7mud, I'd like to inquire about building a website",
  whatsapp_contact_message_ar: "مرحبا أريد الاستفسار عن خدماتك",
  whatsapp_contact_message_en: "Hello, I'd like to inquire about your services"
};
