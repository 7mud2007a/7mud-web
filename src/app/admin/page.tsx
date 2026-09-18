"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useApp } from "@/context/AppContext";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ImageUploader } from "@/components/admin/ImageUploader";
import {
  LayoutDashboard,
  Sparkles,
  User,
  Briefcase,
  FolderGit2,
  PhoneCall,
  Search,
  Palette,
  Navigation as NavIcon,
  LogOut,
  Save,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Moon,
  Sun,
  Menu,
  X,
  Loader2,
  Globe,
} from "lucide-react";
import { ServiceItem, ProjectItem } from "@/lib/supabase/data";

type TabType =
  | "overview"
  | "hero"
  | "about"
  | "services"
  | "projects"
  | "contact"
  | "seo"
  | "appearance"
  | "navigation";

export default function AdminDashboardPage() {
  const router = useRouter();
  const {
    language,
    theme,
    toggleTheme,
    siteSettings,
    navigation,
    heroContent,
    aboutContent,
    services,
    projects,
    contactInfo,
    refreshContent,
  } = useApp();

  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Form Local States initialized with context data
  const [heroForm, setHeroForm] = useState(heroContent);
  const [aboutForm, setAboutForm] = useState(aboutContent);
  const [contactForm, setContactForm] = useState(contactInfo);
  const [seoForm, setSeoForm] = useState(siteSettings);
  const [navForm, setNavForm] = useState(navigation);
  const [servicesList, setServicesList] = useState<ServiceItem[]>(services);
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(projects);

  // Modal / Form state for Service CRUD
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Modal / Form state for Project CRUD
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Sync state on context updates
  useEffect(() => {
    setHeroForm(heroContent);
    setAboutForm(aboutContent);
    setContactForm(contactInfo);
    setSeoForm(siteSettings);
    setNavForm(navigation);
    setServicesList(services);
    setProjectsList(projects);
  }, [heroContent, aboutContent, contactInfo, siteSettings, navigation, services, projects]);

  const showToast = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  // -------------------------------------------------------------
  // SAVE HANDLERS
  // -------------------------------------------------------------

  const saveHero = async () => {
    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("hero_content")
        .upsert({ ...heroForm, id: "default", updated_at: new Date().toISOString() });

      if (error) throw error;
      await refreshContent();
      showToast("success", "تم حفظ بيانات الهيرو بنجاح");
    } catch (err: unknown) {
      showToast("error", err instanceof Error ? err.message : "فشل حفظ البيانات");
    } finally {
      setSaving(false);
    }
  };

  const saveAbout = async () => {
    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("about_content")
        .upsert({ ...aboutForm, id: "default", updated_at: new Date().toISOString() });

      if (error) throw error;
      await refreshContent();
      showToast("success", "تم حفظ بيانات (عني) بنجاح");
    } catch (err: unknown) {
      showToast("error", err instanceof Error ? err.message : "فشل حفظ البيانات");
    } finally {
      setSaving(false);
    }
  };

  const saveContact = async () => {
    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("contact_info")
        .upsert({ ...contactForm, id: "default", updated_at: new Date().toISOString() });

      if (error) throw error;
      await refreshContent();
      showToast("success", "تم حفظ بيانات التواصل بنجاح");
    } catch (err: unknown) {
      showToast("error", err instanceof Error ? err.message : "فشل حفظ البيانات");
    } finally {
      setSaving(false);
    }
  };

  const saveSEOAndAppearance = async () => {
    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("site_settings")
        .upsert({ ...seoForm, id: "default", updated_at: new Date().toISOString() });

      if (error) throw error;
      await refreshContent();
      showToast("success", "تم حفظ إعدادات SEO والمظهر بنجاح");
    } catch (err: unknown) {
      showToast("error", err instanceof Error ? err.message : "فشل حفظ البيانات");
    } finally {
      setSaving(false);
    }
  };

  const saveNavigation = async () => {
    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("navigation").upsert(navForm);

      if (error) throw error;
      await refreshContent();
      showToast("success", "تم حفظ عناصر الملاحة بنجاح");
    } catch (err: unknown) {
      showToast("error", err instanceof Error ? err.message : "فشل حفظ البيانات");
    } finally {
      setSaving(false);
    }
  };

  // SERVICES CRUD
  const saveServiceModal = async () => {
    if (!editingService?.title_ar || !editingService?.title_en) {
      showToast("error", "يرجى كتابة عنوان الخدمة بالعربية والإنجليزية");
      return;
    }

    setSaving(true);
    try {
      const supabase = createClient();
      const payload = {
        ...editingService,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("services").upsert(payload);
      if (error) throw error;

      await refreshContent();
      setIsServiceModalOpen(false);
      setEditingService(null);
      showToast("success", "تم حفظ الخدمة بنجاح");
    } catch (err: unknown) {
      showToast("error", err instanceof Error ? err.message : "فشل حفظ الخدمة");
    } finally {
      setSaving(false);
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm("هل أنت أصلًا متأكد من حذف هذه الخدمة؟")) return;
    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;

      await refreshContent();
      showToast("success", "تم حذف الخدمة بنجاح");
    } catch (err: unknown) {
      showToast("error", err instanceof Error ? err.message : "فشل حذف الخدمة");
    } finally {
      setSaving(false);
    }
  };

  // PROJECTS CRUD
  const saveProjectModal = async () => {
    if (!editingProject?.title_ar || !editingProject?.title_en) {
      showToast("error", "يرجى كتابة عنوان المشروع بالعربية والإنجليزية");
      return;
    }

    setSaving(true);
    try {
      const supabase = createClient();
      const payload = {
        ...editingProject,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("projects").upsert(payload);
      if (error) throw error;

      await refreshContent();
      setIsProjectModalOpen(false);
      setEditingProject(null);
      showToast("success", "تم حفظ المشروع بنجاح");
    } catch (err: unknown) {
      showToast("error", err instanceof Error ? err.message : "فشل حفظ المشروع");
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المشروع؟")) return;
    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;

      await refreshContent();
      showToast("success", "تم حذف المشروع بنجاح");
    } catch (err: unknown) {
      showToast("error", err instanceof Error ? err.message : "فشل حذف المشروع");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "overview", label: "لوحة النظرة العامة", icon: LayoutDashboard },
    { id: "hero", label: "قسم الهيرو (Hero)", icon: Sparkles },
    { id: "about", label: "قسم عني (About)", icon: User },
    { id: "services", label: "الخدمات والمميزات", icon: Briefcase },
    { id: "projects", label: "المشاريع والأعمال", icon: FolderGit2 },
    { id: "contact", label: "معلومات التواصل", icon: PhoneCall },
    { id: "seo", label: "إعدادات SEO", icon: Search },
    { id: "appearance", label: "المظهر والألوان", icon: Palette },
    { id: "navigation", label: "القائمة والنظام", icon: NavIcon },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col md:flex-row font-sans selection:bg-neutral-800 selection:text-white">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-2xl border text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top duration-300 ${
            notification.type === "success"
              ? "bg-emerald-950/90 border-emerald-700 text-emerald-200"
              : "bg-red-950/90 border-red-700 text-red-200"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Mobile Top Header */}
      <div className="md:hidden bg-neutral-900 border-b border-neutral-800 p-4 flex items-center justify-between sticky top-0 z-30">
        <BrandLogo />
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-200"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-xl border border-neutral-800 bg-neutral-950 text-white"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 right-0 z-40 w-72 h-screen bg-neutral-900/95 border-l border-neutral-800/80 p-6 flex flex-col justify-between transition-transform duration-300 ${
          mobileSidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        <div className="space-y-6 overflow-y-auto">
          {/* Logo & Badge */}
          <div className="hidden md:block">
            <BrandLogo />
            <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>لوحة التحكم متصلة بـ Supabase</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as TabType);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all text-right ${
                    isActive
                      ? "bg-white text-black shadow-lg"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-black" : "text-neutral-400"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-neutral-800 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-950 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-neutral-400" /> معاينة الموقع العام
            </span>
            <ExternalLink className="w-3 h-3 text-neutral-500" />
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-xs font-bold hover:bg-red-900/60 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-6xl overflow-y-auto">
        {/* Header Bar */}
        <div className="hidden md:flex items-center justify-between mb-8 pb-4 border-b border-neutral-800">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h1>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              إدارة وتحديث محتوى الموقع بشكل مباشر ومحفوظ في Supabase Database
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 transition-colors"
              title="تغيير المظهر"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-2xl border border-neutral-800 bg-neutral-900 text-xs font-bold text-neutral-200 hover:bg-neutral-800 flex items-center gap-2 transition-colors"
            >
              <span>الموقع المباشر</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  حالة الموقع
                </p>
                <p className="text-2xl font-black text-emerald-400 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  نشط ومباشر
                </p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  عدد الخدمات
                </p>
                <p className="text-3xl font-black text-white">{servicesList.length}</p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  عدد المشاريع
                </p>
                <p className="text-3xl font-black text-white">{projectsList.length}</p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  قاعدة البيانات
                </p>
                <p className="text-lg font-bold text-neutral-200">Supabase Connected</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">إجراءات سريعة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setActiveTab("hero")}
                  className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-600 text-right transition-all group"
                >
                  <Sparkles className="w-5 h-5 text-neutral-400 group-hover:text-white mb-2" />
                  <p className="font-bold text-sm text-white">تعديل قسم الهيرو</p>
                  <p className="text-xs text-neutral-500 mt-1">تحديث العنوان والنصوص والأزرار</p>
                </button>

                <button
                  onClick={() => {
                    setEditingProject({
                      title_ar: "",
                      title_en: "",
                      description_ar: "",
                      description_en: "",
                      technologies: [],
                      project_url: "",
                      github_url: "",
                      image_url: "",
                      is_featured: true,
                    });
                    setIsProjectModalOpen(true);
                  }}
                  className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-600 text-right transition-all group"
                >
                  <FolderGit2 className="w-5 h-5 text-neutral-400 group-hover:text-white mb-2" />
                  <p className="font-bold text-sm text-white">إضافة مشروع جديد</p>
                  <p className="text-xs text-neutral-500 mt-1">رفع الصور وتفاصيل العمل</p>
                </button>

                <button
                  onClick={() => setActiveTab("contact")}
                  className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-600 text-right transition-all group"
                >
                  <PhoneCall className="w-5 h-5 text-neutral-400 group-hover:text-white mb-2" />
                  <p className="font-bold text-sm text-white">تحديث وسائل التواصل</p>
                  <p className="text-xs text-neutral-500 mt-1">واتساب وتيليجرام وإنستغرام</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HERO */}
        {activeTab === "hero" && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  بادج الحالة (عربي)
                </label>
                <input
                  type="text"
                  value={heroForm.status_badge_ar}
                  onChange={(e) => setHeroForm({ ...heroForm, status_badge_ar: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  بادج الحالة (إنجليزي)
                </label>
                <input
                  type="text"
                  value={heroForm.status_badge_en}
                  onChange={(e) => setHeroForm({ ...heroForm, status_badge_en: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  بداية العنوان الرئيسي (عربي)
                </label>
                <input
                  type="text"
                  value={heroForm.title_prefix_ar}
                  onChange={(e) => setHeroForm({ ...heroForm, title_prefix_ar: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  بداية العنوان الرئيسي (إنجليزي)
                </label>
                <input
                  type="text"
                  value={heroForm.title_prefix_en}
                  onChange={(e) => setHeroForm({ ...heroForm, title_prefix_en: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  الكلمة المميزة/المسطرة (عربي)
                </label>
                <input
                  type="text"
                  value={heroForm.title_highlight_ar}
                  onChange={(e) => setHeroForm({ ...heroForm, title_highlight_ar: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  الكلمة المميزة/المسطرة (إنجليزي)
                </label>
                <input
                  type="text"
                  value={heroForm.title_highlight_en}
                  onChange={(e) => setHeroForm({ ...heroForm, title_highlight_en: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  تكملة العنوان (عربي)
                </label>
                <input
                  type="text"
                  value={heroForm.title_suffix_ar}
                  onChange={(e) => setHeroForm({ ...heroForm, title_suffix_ar: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  تكملة العنوان (إنجليزي)
                </label>
                <input
                  type="text"
                  value={heroForm.title_suffix_en}
                  onChange={(e) => setHeroForm({ ...heroForm, title_suffix_en: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                الوصف الفرعي Subtitle (عربي)
              </label>
              <textarea
                rows={3}
                value={heroForm.subtitle_ar}
                onChange={(e) => setHeroForm({ ...heroForm, subtitle_ar: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                الوصف الفرعي Subtitle (إنجليزي)
              </label>
              <textarea
                rows={3}
                value={heroForm.subtitle_en}
                onChange={(e) => setHeroForm({ ...heroForm, subtitle_en: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white resize-none"
              />
            </div>

            <ImageUploader
              label="صورة أو شعار قسم الهيرو (اختياري)"
              value={heroForm.hero_image_url}
              onChange={(url) => setHeroForm({ ...heroForm, hero_image_url: url })}
            />

            <button
              onClick={saveHero}
              disabled={saving}
              className="px-6 py-3.5 rounded-2xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>حفظ تغييرات الهيرو</span>
            </button>
          </div>
        )}

        {/* TAB 3: ABOUT */}
        {activeTab === "about" && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  العنوان (عربي)
                </label>
                <input
                  type="text"
                  value={aboutForm.title_ar}
                  onChange={(e) => setAboutForm({ ...aboutForm, title_ar: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  العنوان (إنجليزي)
                </label>
                <input
                  type="text"
                  value={aboutForm.title_en}
                  onChange={(e) => setAboutForm({ ...aboutForm, title_en: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                الوصف والسيرة الذاتية (عربي)
              </label>
              <textarea
                rows={4}
                value={aboutForm.description_ar}
                onChange={(e) => setAboutForm({ ...aboutForm, description_ar: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                الوصف والسيرة الذاتية (إنجليزي)
              </label>
              <textarea
                rows={4}
                value={aboutForm.description_en}
                onChange={(e) => setAboutForm({ ...aboutForm, description_en: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                المهارات والتقنيات (مفصولة بفاصلة)
              </label>
              <input
                type="text"
                value={(aboutForm.skills || []).join(", ")}
                onChange={(e) =>
                  setAboutForm({
                    ...aboutForm,
                    skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
                className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white"
              />
            </div>

            <button
              onClick={saveAbout}
              disabled={saving}
              className="px-6 py-3.5 rounded-2xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>حفظ قسم عني</span>
            </button>
          </div>
        )}

        {/* TAB 4: SERVICES */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono text-neutral-400">
                إدارة مميزات وباقات الخدمات المعروضة
              </p>
              <button
                onClick={() => {
                  setEditingService({
                    title_ar: "",
                    title_en: "",
                    description_ar: "",
                    description_en: "",
                    price: "",
                    features_ar: [],
                    features_en: [],
                    icon_name: "Code2",
                  });
                  setIsServiceModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-2xl bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة خدمة جديدة</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {servicesList.map((service) => (
                <div
                  key={service.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-400">
                        {service.icon_name}
                      </span>
                      <span className="text-sm font-black text-white">{service.price}</span>
                    </div>

                    <h4 className="text-lg font-bold text-white mb-2">{service.title_ar}</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                      {service.description_ar}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-neutral-800/80">
                    <button
                      onClick={() => {
                        setEditingService(service);
                        setIsServiceModalOpen(true);
                      }}
                      className="flex-1 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-bold text-neutral-200 hover:text-white flex items-center justify-center gap-1.5"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>تعديل</span>
                    </button>

                    <button
                      onClick={() => deleteService(service.id)}
                      className="p-2 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 hover:bg-red-900/60 transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PROJECTS */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono text-neutral-400">
                إدارة ومعرض مشاريعك السابقة المباشرة
              </p>
              <button
                onClick={() => {
                  setEditingProject({
                    title_ar: "",
                    title_en: "",
                    description_ar: "",
                    description_en: "",
                    technologies: [],
                    project_url: "",
                    github_url: "",
                    image_url: "",
                    is_featured: true,
                  });
                  setIsProjectModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-2xl bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة مشروع جديد</span>
              </button>
            </div>

            {projectsList.length === 0 ? (
              <div className="p-12 text-center bg-neutral-900 border border-neutral-800 rounded-3xl">
                <FolderGit2 className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">لا توجد مشاريع مضافة حالياً</h3>
                <p className="text-xs text-neutral-400 mb-4">
                  قم بإضافة أول مشروع لعرضه على زوار الموقع
                </p>
                <button
                  onClick={() => {
                    setEditingProject({
                      title_ar: "",
                      title_en: "",
                      description_ar: "",
                      description_en: "",
                      technologies: [],
                      project_url: "",
                      github_url: "",
                      image_url: "",
                      is_featured: true,
                    });
                    setIsProjectModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-white text-black text-xs font-bold inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة مشروع جديد</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectsList.map((project) => (
                  <div
                    key={project.id}
                    className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {project.image_url ? (
                        <div className="h-44 bg-neutral-950 overflow-hidden relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={project.image_url}
                            alt={project.title_ar}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-28 bg-neutral-950 border-b border-neutral-800 flex items-center justify-center text-neutral-600">
                          <FolderGit2 className="w-8 h-8" />
                        </div>
                      )}

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-bold text-white">{project.title_ar}</h4>
                          {project.is_featured && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300">
                              مميز
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                          {project.description_ar}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {(project.technologies || []).map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-950 border border-neutral-800 text-neutral-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProject(project);
                          setIsProjectModalOpen(true);
                        }}
                        className="flex-1 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-bold text-neutral-200 hover:text-white flex items-center justify-center gap-1.5"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>تعديل</span>
                      </button>

                      <button
                        onClick={() => deleteProject(project.id)}
                        className="p-2 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 hover:bg-red-900/60 transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 6: CONTACT */}
        {activeTab === "contact" && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  رقم الواتساب WhatsApp Number (بدون +)
                </label>
                <input
                  type="text"
                  value={contactForm.whatsapp_number}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, whatsapp_number: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  معرّف تيليجرام Telegram Handle
                </label>
                <input
                  type="text"
                  value={contactForm.telegram_username}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, telegram_username: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  معرّف إنستغرام Instagram Handle
                </label>
                <input
                  type="text"
                  value={contactForm.instagram_username}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, instagram_username: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                نص قسم التواصل (عربي)
              </label>
              <textarea
                rows={3}
                value={contactForm.contact_text_ar}
                onChange={(e) =>
                  setContactForm({ ...contactForm, contact_text_ar: e.target.value })
                }
                className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                نص قسم التواصل (إنجليزي)
              </label>
              <textarea
                rows={3}
                value={contactForm.contact_text_en}
                onChange={(e) =>
                  setContactForm({ ...contactForm, contact_text_en: e.target.value })
                }
                className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white resize-none"
              />
            </div>

            <button
              onClick={saveContact}
              disabled={saving}
              className="px-6 py-3.5 rounded-2xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>حفظ بيانات التواصل</span>
            </button>
          </div>
        )}

        {/* TAB 7: SEO */}
        {activeTab === "seo" && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-6">
            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                عنوان الموقع (Title Tag)
              </label>
              <input
                type="text"
                value={seoForm.website_title}
                onChange={(e) => setSeoForm({ ...seoForm, website_title: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                وصف الموقع Meta Description
              </label>
              <textarea
                rows={3}
                value={seoForm.meta_description}
                onChange={(e) => setSeoForm({ ...seoForm, meta_description: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                الكلمات المفتاحية Keywords
              </label>
              <input
                type="text"
                value={seoForm.keywords}
                onChange={(e) => setSeoForm({ ...seoForm, keywords: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Open Graph Title
                </label>
                <input
                  type="text"
                  value={seoForm.og_title}
                  onChange={(e) => setSeoForm({ ...seoForm, og_title: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Open Graph Description
                </label>
                <input
                  type="text"
                  value={seoForm.og_description}
                  onChange={(e) => setSeoForm({ ...seoForm, og_description: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white"
                />
              </div>
            </div>

            <ImageUploader
              label="صورة المشاركة الاجتماعية (Open Graph Image)"
              value={seoForm.og_image}
              onChange={(url) => setSeoForm({ ...seoForm, og_image: url })}
            />

            <button
              onClick={saveSEOAndAppearance}
              disabled={saving}
              className="px-6 py-3.5 rounded-2xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>حفظ إعدادات SEO</span>
            </button>
          </div>
        )}

        {/* TAB 8: APPEARANCE */}
        {activeTab === "appearance" && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-6">
            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-2">
                الوضع الافتراضي للمظهر (Light/Dark Theme)
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setSeoForm({ ...seoForm, theme: "dark" })}
                  className={`flex-1 py-3 rounded-2xl font-bold text-xs border flex items-center justify-center gap-2 ${
                    seoForm.theme === "dark"
                      ? "bg-white text-black border-white"
                      : "bg-neutral-950 text-neutral-400 border-neutral-800"
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  <span>داكن (Dark)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSeoForm({ ...seoForm, theme: "light" })}
                  className={`flex-1 py-3 rounded-2xl font-bold text-xs border flex items-center justify-center gap-2 ${
                    seoForm.theme === "light"
                      ? "bg-white text-black border-white"
                      : "bg-neutral-950 text-neutral-400 border-neutral-800"
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  <span>فاتح (Light)</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  اللون الرئيسي Main Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={seoForm.primary_color || "#000000"}
                    onChange={(e) => setSeoForm({ ...seoForm, primary_color: e.target.value })}
                    className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 cursor-pointer p-1"
                  />
                  <input
                    type="text"
                    value={seoForm.primary_color || "#000000"}
                    onChange={(e) => setSeoForm({ ...seoForm, primary_color: e.target.value })}
                    className="flex-1 px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  لون الإبراز Accent Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={seoForm.accent_color || "#ffffff"}
                    onChange={(e) => setSeoForm({ ...seoForm, accent_color: e.target.value })}
                    className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 cursor-pointer p-1"
                  />
                  <input
                    type="text"
                    value={seoForm.accent_color || "#ffffff"}
                    onChange={(e) => setSeoForm({ ...seoForm, accent_color: e.target.value })}
                    className="flex-1 px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-white"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={saveSEOAndAppearance}
              disabled={saving}
              className="px-6 py-3.5 rounded-2xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>حفظ إعدادات المظهر</span>
            </button>
          </div>
        )}

        {/* TAB 9: NAVIGATION */}
        {activeTab === "navigation" && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-6">
            <p className="text-xs font-mono text-neutral-400">
              تعديل مسميات الروابط وتفعيل/تعطيل عناصر الهيدر العلوي
            </p>

            <div className="space-y-3">
              {navForm.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-mono font-bold text-neutral-400 shrink-0">
                    {idx + 1}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 w-full">
                    <input
                      type="text"
                      value={item.label_ar}
                      onChange={(e) => {
                        const updated = [...navForm];
                        updated[idx].label_ar = e.target.value;
                        setNavForm(updated);
                      }}
                      placeholder="الاسم بالعربية"
                      className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                    />

                    <input
                      type="text"
                      value={item.label_en}
                      onChange={(e) => {
                        const updated = [...navForm];
                        updated[idx].label_en = e.target.value;
                        setNavForm(updated);
                      }}
                      placeholder="Name in English"
                      className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-neutral-300 shrink-0">
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      onChange={(e) => {
                        const updated = [...navForm];
                        updated[idx].enabled = e.target.checked;
                        setNavForm(updated);
                      }}
                      className="w-4 h-4 rounded bg-neutral-900 border-neutral-800 accent-white"
                    />
                    <span>مفوّض/مفعل</span>
                  </label>
                </div>
              ))}
            </div>

            <button
              onClick={saveNavigation}
              disabled={saving}
              className="px-6 py-3.5 rounded-2xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>حفظ التغييرات بالقائمة</span>
            </button>
          </div>
        )}
      </main>

      {/* SERVICE EDIT MODAL */}
      {isServiceModalOpen && editingService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 max-w-xl w-full space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-lg font-bold text-white">
                {editingService.id ? "تعديل الخدمة" : "إضافة خدمة جديدة"}
              </h3>
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="p-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  العنوان (عربي)
                </label>
                <input
                  type="text"
                  value={editingService.title_ar || ""}
                  onChange={(e) => setEditingService({ ...editingService, title_ar: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  العنوان (إنجليزي)
                </label>
                <input
                  type="text"
                  value={editingService.title_en || ""}
                  onChange={(e) => setEditingService({ ...editingService, title_en: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  أيقونة Lucide (مثلاً Code2, Sparkles, ShoppingBag, Palette)
                </label>
                <input
                  type="text"
                  value={editingService.icon_name || "Code2"}
                  onChange={(e) => setEditingService({ ...editingService, icon_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  السعر Price
                </label>
                <input
                  type="text"
                  value={editingService.price || ""}
                  onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                الوصف (عربي)
              </label>
              <textarea
                rows={2}
                value={editingService.description_ar || ""}
                onChange={(e) => setEditingService({ ...editingService, description_ar: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                الوصف (إنجليزي)
              </label>
              <textarea
                rows={2}
                value={editingService.description_en || ""}
                onChange={(e) => setEditingService({ ...editingService, description_en: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                المميزات بالعربية (مفصولة بفاصلة)
              </label>
              <input
                type="text"
                value={(editingService.features_ar || []).join(", ")}
                onChange={(e) =>
                  setEditingService({
                    ...editingService,
                    features_ar: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                المميزات بالإنجليزية (مفصولة بفاصلة)
              </label>
              <input
                type="text"
                value={(editingService.features_en || []).join(", ")}
                onChange={(e) =>
                  setEditingService({
                    ...editingService,
                    features_en: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
              />
            </div>

            <ImageUploader
              label="صورة الخدمة (اختياري)"
              value={editingService.image_url}
              onChange={(url) => setEditingService({ ...editingService, image_url: url })}
            />

            <div className="flex gap-3 pt-2">
              <button
                onClick={saveServiceModal}
                disabled={saving}
                className="flex-1 py-3 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>حفظ الخدمة</span>
              </button>

              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="px-5 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 font-bold text-xs"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT EDIT MODAL */}
      {isProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 max-w-xl w-full space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-lg font-bold text-white">
                {editingProject.id ? "تعديل المشروع" : "إضافة مشروع جديد"}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="p-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  عنوان المشروع (عربي)
                </label>
                <input
                  type="text"
                  value={editingProject.title_ar || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, title_ar: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  عنوان المشروع (إنجليزي)
                </label>
                <input
                  type="text"
                  value={editingProject.title_en || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, title_en: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                وصف المشروع (عربي)
              </label>
              <textarea
                rows={2}
                value={editingProject.description_ar || ""}
                onChange={(e) => setEditingProject({ ...editingProject, description_ar: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                وصف المشروع (إنجليزي)
              </label>
              <textarea
                rows={2}
                value={editingProject.description_en || ""}
                onChange={(e) => setEditingProject({ ...editingProject, description_en: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                التقنيات المستعملة (مفصولة بفاصلة)
              </label>
              <input
                type="text"
                value={(editingProject.technologies || []).join(", ")}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
                placeholder="Next.js, Tailwind, Supabase"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  رابط المعاينة المباشر (URL)
                </label>
                <input
                  type="text"
                  value={editingProject.project_url || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, project_url: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  رابط GitHub
                </label>
                <input
                  type="text"
                  value={editingProject.github_url || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                />
              </div>
            </div>

            <ImageUploader
              label="صورة المشروع"
              value={editingProject.image_url}
              onChange={(url) => setEditingProject({ ...editingProject, image_url: url })}
            />

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-neutral-300">
              <input
                type="checkbox"
                checked={editingProject.is_featured || false}
                onChange={(e) => setEditingProject({ ...editingProject, is_featured: e.target.checked })}
                className="w-4 h-4 rounded bg-neutral-950 border-neutral-800 accent-white"
              />
              <span>مشروع مميز (Featured Project)</span>
            </label>

            <div className="flex gap-3 pt-2">
              <button
                onClick={saveProjectModal}
                disabled={saving}
                className="flex-1 py-3 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>حفظ المشروع</span>
              </button>

              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="px-5 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 font-bold text-xs"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
