-- Supabase Schema & Initial Migration Script
-- Run this script in your Supabase SQL Editor to setup the database tables, RLS policies, storage bucket, and seed data.

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-------------------------------------------------------
-- 1. TABLES CREATION
-------------------------------------------------------

-- 1. Site Settings (SEO, Appearance, Metadata)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  website_title TEXT NOT NULL DEFAULT 'حمود — 7mud | تصميم وتطوير مواقع الويب',
  meta_description TEXT NOT NULL DEFAULT 'أصمم وأطور مواقع ويب عصرية، سريعة، ومخصصة لهوية مشروعك بالكامل.',
  keywords TEXT DEFAULT 'تصميم مواقع, تطوير ويب, Next.js, Supabase, React, حمود',
  og_title TEXT DEFAULT 'حمود — 7mud | تصميم وتطوير مواقع الويب',
  og_description TEXT DEFAULT 'أصمم وأطور مواقع ويب عصرية، سريعة، ومخصصة لهوية مشروعك بالكامل.',
  og_image TEXT DEFAULT '',
  favicon_url TEXT DEFAULT '/favicon.ico',
  theme TEXT NOT NULL DEFAULT 'dark',
  primary_color TEXT DEFAULT '#000000',
  accent_color TEXT DEFAULT '#ffffff',
  background_settings JSONB DEFAULT '{"style": "grid", "blur": true}'::jsonb,
  animation_settings JSONB DEFAULT '{"enabled": true, "speed": "normal"}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Navigation Items
CREATE TABLE IF NOT EXISTS public.navigation (
  id TEXT PRIMARY KEY,
  label_ar TEXT NOT NULL,
  label_en TEXT NOT NULL,
  href TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Hero Content
CREATE TABLE IF NOT EXISTS public.hero_content (
  id TEXT PRIMARY KEY DEFAULT 'default',
  status_badge_ar TEXT NOT NULL DEFAULT 'متفرغ للمشاريع الجديدة',
  status_badge_en TEXT NOT NULL DEFAULT 'Available for new projects',
  title_prefix_ar TEXT NOT NULL DEFAULT 'تصميم وتطوير',
  title_prefix_en TEXT NOT NULL DEFAULT 'Designing & Building',
  title_highlight_ar TEXT NOT NULL DEFAULT 'مواقع ويب عصرية',
  title_highlight_en TEXT NOT NULL DEFAULT 'Modern Websites',
  title_suffix_ar TEXT NOT NULL DEFAULT 'وسريعة',
  title_suffix_en TEXT NOT NULL DEFAULT 'Tailored to Your Brand',
  subtitle_ar TEXT NOT NULL DEFAULT 'أصمم وأطور مواقع ويب عصرية، سريعة، ومخصصة لهوية مشروعك بالكامل.',
  subtitle_en TEXT NOT NULL DEFAULT 'Designing and building modern, high-performance websites tailored to your brand.',
  cta_primary_ar TEXT NOT NULL DEFAULT 'تواصل عبر واتساب',
  cta_primary_en TEXT NOT NULL DEFAULT 'Contact via WhatsApp',
  cta_secondary_ar TEXT NOT NULL DEFAULT 'عرض الباقات',
  cta_secondary_en TEXT NOT NULL DEFAULT 'View Packages',
  hero_image_url TEXT DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. About Content
CREATE TABLE IF NOT EXISTS public.about_content (
  id TEXT PRIMARY KEY DEFAULT 'default',
  title_ar TEXT NOT NULL DEFAULT 'عن حمود',
  title_en TEXT NOT NULL DEFAULT 'About 7mud',
  description_ar TEXT NOT NULL DEFAULT 'مطور ويب متخصص في بناء وتصميم منصات ومواقع ويب احترا فائقة السرعة.',
  description_en TEXT NOT NULL DEFAULT 'Web developer specializing in building and designing high-performance modern websites.',
  skills JSONB DEFAULT '["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Node.js"]'::jsonb,
  other_content_ar TEXT DEFAULT '',
  other_content_en TEXT DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Services Content
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  icon_name TEXT NOT NULL DEFAULT 'Code2',
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  price TEXT DEFAULT '',
  features_ar TEXT[] DEFAULT '{}',
  features_en TEXT[] DEFAULT '{}',
  image_url TEXT DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Projects Content
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  project_url TEXT DEFAULT '',
  github_url TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Contact Info
CREATE TABLE IF NOT EXISTS public.contact_info (
  id TEXT PRIMARY KEY DEFAULT 'default',
  badge_ar TEXT DEFAULT 'تواصل معي',
  badge_en TEXT DEFAULT 'GET IN TOUCH',
  title_ar TEXT DEFAULT 'دعنا نبدأ في تنفيذ موقعك',
  title_en TEXT DEFAULT 'Let''s Build Your Website',
  subtitle_ar TEXT DEFAULT 'تواصل معي مباشرة عبر إحدى الوسائل التالية أو أرسل رسالتك هنا.',
  subtitle_en TEXT DEFAULT 'Reach out directly via social channels or send a message below.',
  whatsapp_number TEXT NOT NULL DEFAULT '0930431817',
  telegram_username TEXT NOT NULL DEFAULT '@Dev7mud',
  instagram_username TEXT NOT NULL DEFAULT '@dev7mud',
  contact_text_ar TEXT DEFAULT 'أنا جاهز للاستماع لمشروعك والإجابة عن جميع استفساراتك.',
  contact_text_en TEXT DEFAULT 'I am ready to hear about your project and answer all your questions.',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-------------------------------------------------------
-- 2. ROW LEVEL SECURITY (RLS) POLICIES
-------------------------------------------------------

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

-- Public SELECT access for all visitors
CREATE POLICY "Allow public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read navigation" ON public.navigation FOR SELECT USING (true);
CREATE POLICY "Allow public read hero_content" ON public.hero_content FOR SELECT USING (true);
CREATE POLICY "Allow public read about_content" ON public.about_content FOR SELECT USING (true);
CREATE POLICY "Allow public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read contact_info" ON public.contact_info FOR SELECT USING (true);

-- Authenticated Admin full permissions (INSERT, UPDATE, DELETE)
CREATE POLICY "Allow authenticated full access site_settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access navigation" ON public.navigation FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access hero_content" ON public.hero_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access about_content" ON public.about_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access contact_info" ON public.contact_info FOR ALL USING (auth.role() = 'authenticated');

-------------------------------------------------------
-- 3. STORAGE BUCKET CONFIGURATION
-------------------------------------------------------

-- Create storage bucket for portfolio media if not present
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage bucket RLS policies
CREATE POLICY "Public Read Media" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio-media');

CREATE POLICY "Authenticated Upload Media" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'portfolio-media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated Update Media" ON storage.objects
  FOR UPDATE USING (bucket_id = 'portfolio-media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated Delete Media" ON storage.objects
  FOR DELETE USING (bucket_id = 'portfolio-media' AND auth.role() = 'authenticated');

-------------------------------------------------------
-- 4. SEED DATA
-------------------------------------------------------

-- Seed site_settings
INSERT INTO public.site_settings (id, website_title, meta_description, keywords, og_title, og_description)
VALUES (
  'default',
  'حمود — 7mud | تصميم وتطوير مواقع الويب',
  'أصمم وأطور مواقع ويب عصرية، سريعة، ومخصصة لهوية مشروعك بالكامل.',
  'تصميم مواقع, تطوير ويب, Next.js, Supabase, React, حمود',
  'حمود — 7mud | تصميم وتطوير مواقع الويب',
  'أصمم وأطور مواقع ويب عصرية، سريعة، ومخصصة لهوية مشروعك بالكامل.'
)
ON CONFLICT (id) DO NOTHING;

-- Seed navigation
INSERT INTO public.navigation (id, label_ar, label_en, href, enabled, display_order)
VALUES
  ('home', 'الرئيسية', 'Home', '#hero', true, 1),
  ('services', 'مميزات العمل', 'Features', '#services', true, 2),
  ('pricing', 'الباقات', 'Pricing', '#pricing', true, 3),
  ('contact', 'تواصل معي', 'Contact', '#contact', true, 4)
ON CONFLICT (id) DO NOTHING;

-- Seed hero_content
INSERT INTO public.hero_content (
  id, status_badge_ar, status_badge_en, title_prefix_ar, title_prefix_en,
  title_highlight_ar, title_highlight_en, title_suffix_ar, title_suffix_en,
  subtitle_ar, subtitle_en, cta_primary_ar, cta_primary_en, cta_secondary_ar, cta_secondary_en
)
VALUES (
  'default',
  'متفرغ للمشاريع الجديدة', 'Available for new projects',
  'تصميم وتطوير', 'Designing & Building',
  'مواقع ويب عصرية', 'Modern Websites',
  'وسريعة', 'Tailored to Your Brand',
  'أصمم وأطور مواقع ويب عصرية، سريعة، ومخصصة لهوية مشروعك بالكامل.',
  'Designing and building modern, high-performance websites tailored to your brand.',
  'تواصل عبر واتساب', 'Contact via WhatsApp',
  'عرض الباقات', 'View Packages'
)
ON CONFLICT (id) DO NOTHING;

-- Seed about_content
INSERT INTO public.about_content (id, title_ar, title_en, description_ar, description_en, skills)
VALUES (
  'default',
  'عن حمود (7mud)', 'About 7mud',
  'مطور مواقع متكامل خبير بإنشاء واجهات المستخدم فائقة السلاسة والأنظمة الحديثة. أعمل بأحدث تقنيات الويب لبناء حضور رقمي قوي لعلامتك التجارية.',
  'Full-stack web developer passionate about crafting seamless user experiences and modern digital platforms.',
  '["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Supabase", "Node.js", "Framer Motion"]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- Seed services
INSERT INTO public.services (id, icon_name, title_ar, title_en, description_ar, description_en, price, features_ar, features_en, display_order)
VALUES
(
  'web-apps',
  'Code2',
  'تصميم عصري وحصري',
  'Modern & Exclusive Design',
  'واجهات جذابة وسهلة الاستخدام تناسب هاتف وحاسوب العميل.',
  'Attractive, user-friendly interfaces tailored for both mobile and desktop.',
  '400$',
  ARRAY['تصميم مخصص يتناسب مع هوية مشروعك', 'واجهات جذابة وسهلة الاستخدام', 'تجاوب كامل مع مختلف أنواع الهواتف والحواسب'],
  ARRAY['Custom design tailored to your brand identity', 'Attractive and intuitive user interfaces', 'Fully responsive across mobile and desktop screens'],
  1
),
(
  'cms',
  'Sparkles',
  'لوحة تحكم خاصة',
  'Custom Control Panel',
  'تمكّنك من إدارة محتوى موقعك بنفسك بكل بساطة.',
  'Easily manage your website content independently with simplicity.',
  '750$',
  ARRAY['إضافة وتعديل المحتوى بكل سهولة', 'إدارة الصور والصفحات والمنتجات', 'تجربة إدارية بسيطة وسريعة'],
  ARRAY['Easily add and edit content', 'Manage images, pages, and items', 'Simple and quick management experience'],
  2
),
(
  'database',
  'ShoppingBag',
  'قاعدة بيانات وتسجيل دخول',
  'Database & Authentication',
  'لحفظ بياناتك وعملائك بشكل آمن وسريع.',
  'Store your data and user information safely and quickly.',
  '1,200$',
  ARRAY['حفظ طلبات العملاء والبيانات بأمان', 'نظام تسجيل دخول وصلاحيات مستخدمين', 'بنية آمنة وسريعة الاستجابة'],
  ARRAY['Securely store client orders and data', 'User login and permissions system', 'Secure and highly responsive architecture'],
  3
),
(
  'speed-seo',
  'Palette',
  'سرعة وتوافق عالي',
  'High Speed & SEO',
  'موقع سريع التصفح ومهيأ للظهور في محركات البحث.',
  'Fast-browsing website optimized for search engines and performance.',
  '400$',
  ARRAY['سرعة أداء عالية وزمن تحميل سريع', 'تهيئة أصلية لمحركات البحث (SEO)', 'أداء مستقر على جميع الشبكات'],
  ARRAY['High performance and rapid loading speed', 'Native Search Engine Optimization (SEO)', 'Stable performance across all networks'],
  4
)
ON CONFLICT (id) DO NOTHING;

-- Seed contact_info
INSERT INTO public.contact_info (
  id, badge_ar, badge_en, title_ar, title_en, subtitle_ar, subtitle_en,
  whatsapp_number, telegram_username, instagram_username, contact_text_ar, contact_text_en
)
VALUES (
  'default',
  'تواصل معي', 'GET IN TOUCH',
  'دعنا نبدأ في تنفيذ موقعك', 'Let''s Build Your Website',
  'تواصل معي مباشرة عبر إحدى الوسائل التالية أو أرسل رسالتك هنا.', 'Reach out directly via social channels or send a message below.',
  '0930431817',
  '@Dev7mud',
  '@dev7mud',
  'تواصل معي مباشرة لتنفيذ موقعك بأعلى جودة.',
  'Reach out to get your high quality website created.'
)
ON CONFLICT (id) DO NOTHING;


-------------------------------------------------------
-- 5. CENTRALIZED EDITABLE SITE COPY
-------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_content (
  id TEXT PRIMARY KEY DEFAULT 'default',
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read site_content" ON public.site_content;
DROP POLICY IF EXISTS "Allow authenticated full access site_content" ON public.site_content;
CREATE POLICY "Allow public read site_content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access site_content" ON public.site_content FOR ALL USING (auth.role() = 'authenticated');

INSERT INTO public.site_content (id, content)
VALUES ('default', '{"nav_cta_ar":"تواصل معي","nav_cta_en":"Contact Me","services_badge_ar":"مميزات العمل معي","services_badge_en":"WHAT YOU GET","services_title_ar":"ما الذي تحصل عليه عند العمل معي؟","services_title_en":"Key Features & Advantages","services_subtitle_ar":"خدمات متكاملة تضمن حصولك على موقع ويب احترافي يدعم نمو أعمالك.","services_subtitle_en":"Comprehensive web development services ensuring a professional site that grows your business.","pricing_badge_ar":"الأسعار والخدمات","pricing_badge_en":"PRICING & SERVICES","pricing_title_ar":"خيار احترافي متكامل لمشروعك","pricing_title_en":"Comprehensive Solution For Your Business","pricing_subtitle_ar":"خطة مخصصة تلبي كافة احتياجاتك البرمجية بوضوح وشفافية.","pricing_subtitle_en":"A complete custom plan designed to cover all your digital requirements.","pricing_card_title_ar":"موقع مخصص — مبني خصيصاً لاحتياجاتك","pricing_card_title_en":"Custom Website — Built For Your Needs","pricing_price_ar":"299$+","pricing_price_en":"$299+","pricing_note_ar":"يبدأ من 299$ — السعر النهائي يعتمد على حجم المشروع ومتطلباته.","pricing_note_en":"Starting from $299 — Final price depends on the project''s size and requirements.","pricing_cta_ar":"اطلب مشروعك الآن","pricing_cta_en":"Start Your Project","pricing_features_ar":["تصميم وتطوير موقع مخصص بالكامل","ربط كامل مع قاعدة البيانات","نظام تسجيل الدخول وإدارة المستخدمين","لوحة تحكم إدارية خاصة","نظام طلبات وحجوزات متكامل","نماذج اتصال واستفسارات العملاء","ربط وسائل التواصل (واتساب، تيليجرام، إنستغرام)","ربط واجهات البرمجية (APIs) والخدمات الخارجية","دمج أنظمة الدفع الإلكتروني عند الحاجة","تهيئة محركات البحث (SEO) وتسريع الأداء","تصميم متوافق بالكامل مع الهواتف والحواسب","رفع الموقع وربطه بالنطاق (Domain)"],"pricing_features_en":["Fully custom website design & development","Complete database integration","User registration & login","Admin dashboard","Orders & booking systems","Contact forms & customer inquiries","WhatsApp / Telegram / Instagram integration","API & third-party service integrations","Payment system integration when required","SEO & performance optimization","Fully responsive design for mobile, tablet and desktop","Website deployment & domain connection"],"contact_direct_ar":"وسائل التواصل المباشر","contact_direct_en":"Direct Contact Channels","contact_whatsapp_label_ar":"واتساب","contact_whatsapp_label_en":"WhatsApp","contact_telegram_label_ar":"تيليجرام","contact_telegram_label_en":"Telegram","contact_instagram_label_ar":"إنستغرام","contact_instagram_label_en":"Instagram","contact_form_success_title_ar":"شكراً لك!","contact_form_success_title_en":"Thank You!","contact_form_success_ar":"تم إرسال رسالتك بنجاح! سأتواصل معك في أقرب وقت ممكن.","contact_form_success_en":"Message sent successfully! I will respond promptly.","contact_name_label_ar":"الاسم الكامل","contact_name_label_en":"Full Name","contact_name_placeholder_ar":"اكتب اسمك هنا...","contact_name_placeholder_en":"Enter your name...","contact_email_label_ar":"البريد الإلكتروني","contact_email_label_en":"Email Address","contact_message_label_ar":"تفاصيل المشروع أو الاستفسار","contact_message_label_en":"Project Details or Inquiry","contact_message_placeholder_ar":"تحدث عن موقعك المطلوب، أهدافه، وأي تفاصيل أخرى...","contact_message_placeholder_en":"Describe your project goals, scope, and requirements...","contact_send_ar":"إرسال الرسالة","contact_send_en":"Send Message","footer_tagline_ar":"تصميم وتطوير مواقع ويب عصرية وسريعة مخصصة لعلامتك التجارية.","footer_tagline_en":"Designing and building modern, high-performance websites tailored to your brand.","footer_rights_ar":"جميع الحقوق محفوظة © 2026 حمود (7mud)","footer_rights_en":"All rights reserved © 2026 7mud","footer_scroll_top_ar":"للأعلى","footer_scroll_top_en":"Back to Top","whatsapp_hero_message_ar":"مرحبا أريد الاستفسار عن تصميم موقع","whatsapp_hero_message_en":"Hello, I''d like to inquire about building a website","whatsapp_pricing_message_ar":"مرحبا أريد الاستفسار عن خدمة تصميم وتطوير المواقع","whatsapp_pricing_message_en":"Hello, I''d like to inquire about website development services","whatsapp_footer_message_ar":"مرحبا حمود أريد الاستفسار عن تصميم موقع","whatsapp_footer_message_en":"Hello 7mud, I''d like to inquire about building a website","whatsapp_contact_message_ar":"مرحبا أريد الاستفسار عن خدماتك","whatsapp_contact_message_en":"Hello, I''d like to inquire about your services"}'::jsonb)
ON CONFLICT (id) DO NOTHING;


-------------------------------------------------------
-- 6. CONTACT MESSAGES / ADMIN INBOX
-------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public insert contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow authenticated manage contact_messages" ON public.contact_messages;
CREATE POLICY "Allow public insert contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated manage contact_messages" ON public.contact_messages FOR ALL USING (auth.role() = 'authenticated');
