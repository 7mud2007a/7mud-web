/* =========================================================
   DANIEL — PORTFOLIO ENGINE & INTERACTIVITY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const html = document.documentElement;
  const loader = document.getElementById("loader");

  const nav = document.getElementById("nav");
  const navItems = [...document.querySelectorAll(".nav-btn")];
  const activePill = document.getElementById("active-pill");

  const themeBtn = document.getElementById("theme-btn");
  const langBtn = document.getElementById("lang-btn");

  const crystal = document.getElementById("crystal");
  const cursorGlow = document.getElementById("cursorGlow");

  const sections = [...document.querySelectorAll("#home, #about, #work, #contact")];
  const revealElements = [...document.querySelectorAll(".reveal")];
  const tiltElements = [...document.querySelectorAll("[data-tilt]")];


  /* =======================================================
     1. INTRO / LOADER SEQUENCE
     ======================================================= */

  window.addEventListener("load", () => {
    setTimeout(() => {
      if (loader) {
        loader.classList.add("hidden");
        loader.setAttribute("aria-hidden", "true");
      }
    }, 750);
  });


  /* =======================================================
     2. DYNAMIC YEAR
     ======================================================= */

  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =======================================================
     3. THEME MANAGEMENT (LIGHT / DARK)
     ======================================================= */

  const savedTheme = localStorage.getItem("daniel-theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    html.dataset.theme = savedTheme;
  } else {
    html.dataset.theme = "light";
  }

  function setTheme(theme) {
    html.dataset.theme = theme;
    localStorage.setItem("daniel-theme", theme);
  }

  themeBtn?.addEventListener("click", () => {
    const current = html.dataset.theme === "dark" ? "dark" : "light";
    setTheme(current === "dark" ? "light" : "dark");
  });


  /* =======================================================
     4. INTERNATIONALIZATION (EN / AR RTL)
     ======================================================= */

  const translations = {
    en: {
      loading: "Loading",
      home: "Home",
      work: "Work",
      about: "About",
      contact: "Contact",

      eyebrow: "DIGITAL CREATOR · WEB DEVELOPER",
      hero1: "I build digital",
      hero2: "experiences that feel different.",
      heroCopy: "A personal portfolio of selected work by Daniel — from AI products to immersive web experiences.",
      explore: "Explore my work",
      scroll: "Scroll to explore",

      status: "Building on the web",
      aboutLabel: "01 / ABOUT",
      hi: "Hi, I'm",
      aboutText: "I design and build modern websites, AI-powered products and digital experiences with a focus on clean visuals, motion and strong user experience.",
      selected: "Selected projects",
      focus: "Product focus",
      design: "Design & development",

      workLabel: "02 / SELECTED WORK",
      built: "Things I've",
      workNote: "A few projects that represent the direction I like to build in.",

      garaueText: "Premium product experience with a polished visual identity.",
      bizText: "AI-powered content generation for businesses and creators.",
      edgeText: "Private AI-powered forex intelligence experience.",
      p4Title: "Creative Lab",
      p4Text: "Upcoming experimental web interactive concepts & digital spatial interfaces.",

      approach: "THE APPROACH",
      approachTitle: "Simple on the surface.\nThoughtful underneath.",
      approachText: "Every detail has a reason — from the first interaction to the final pixel.",

      contactLabel: "03 / CONTACT",
      contactTitle: "Have an idea?\nLet's build it.",
      contactText: "For projects, collaborations or just a conversation, reach me directly.",
      phone: "Phone",

      footer: "Designed & built with intention."
    },

    ar: {
      loading: "جاري التحميل",
      home: "الرئيسية",
      work: "أعمالي",
      about: "عني",
      contact: "تواصل",

      eyebrow: "صانع تجارب رقمية · مطور ويب",
      hero1: "أبني تجارب",
      hero2: "رقمية ذات طابع مختلف.",
      heroCopy: "معرض شخصي لأعمال مختارة بواسطة دانيال — من منتجات الذكاء الاصطناعي إلى تجارب الويب الغامرة.",
      explore: "استكشف أعمالي",
      scroll: "مرر للاستكشاف",

      status: "أبني على الويب",
      aboutLabel: "01 / عني",
      hi: "مرحباً، أنا",
      aboutText: "أصمم وأطور مواقع حديثة، ومنتجات مدعومة بالذكاء الاصطناعي، وتجارب رقمية بالتركيز على بساطة التصميم، الحركة، وتجربة المستخدم الممتازة.",
      selected: "مشاريع مختارة",
      focus: "التركيز الرئيسي",
      design: "تصميم وتطوير",

      workLabel: "02 / أعمال مختارة",
      built: "أشياء بنيتها.",
      workNote: "نماذج من المشاريع التي تعبر عن الأسلوب والاتجاه الذي أفضله.",

      garaueText: "تجربة منتج فاخرة بتصميم وهوية بصرية مصقولة.",
      bizText: "منصة ذكاء اصطناعي لتوليد المحتوى الذكي للشركات وصناع المحتوى.",
      edgeText: "تجربة خاصة لتحليل أسواق الفوركس بالذكاء الاصطناعي.",
      p4Title: "المختبر الإبداعي",
      p4Text: "مفاهيم تفاعلية تجريبية مستقبليّة وواجهات ويب ثلاثية الأبعاد.",

      approach: "النهج",
      approachTitle: "بسيط من الخارج.\nمدروس من الداخل.",
      approachText: "كل تفصيل له سبب — من أول تفاعل حتى آخر بكسل.",

      contactLabel: "03 / تواصل",
      contactTitle: "لديك فكرة؟\nدعنا نبنيها معاً.",
      contactText: "للمشاريع، التعاون، أو لمجرد الحديث والتواصل، تواصل معي مباشرة.",
      phone: "الهاتف",

      footer: "صُمم وبُني بعناية وإتقان."
    }
  };

  function applyLanguage(lang) {
    const dict = translations[lang] || translations.en;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key] !== undefined) {
        if (dict[key].includes("\n")) {
          el.innerHTML = dict[key].replace("\n", "<br>");
        } else {
          el.textContent = dict[key];
        }
      }
    });

    if (langBtn) {
      langBtn.textContent = lang === "en" ? "AR" : "EN";
    }

    localStorage.setItem("daniel-language", lang);

    requestAnimationFrame(() => {
      const activeBtn = document.querySelector(".nav-btn.active") || navItems[0];
      updateActivePill(activeBtn, true);
    });
  }

  const savedLang = localStorage.getItem("daniel-language");
  applyLanguage(savedLang === "ar" ? "ar" : "en");

  langBtn?.addEventListener("click", () => {
    const current = html.lang === "ar" ? "ar" : "en";
    applyLanguage(current === "ar" ? "en" : "ar");
  });


  /* =======================================================
     5. BOTTOM GLASS NAV & SLIDING ACTIVE PILL
     ======================================================= */

  function updateActivePill(button, instant = false) {
    if (!button || !activePill) return;

    const parent = button.parentElement;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    const x = buttonRect.left - parentRect.left;

    activePill.style.width = `${buttonRect.width}px`;

    if (instant) {
      activePill.style.transition = "none";
      activePill.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(() => {
        activePill.style.transition = "";
      });
    } else {
      activePill.style.transform = `translateX(${x}px)`;
    }
  }

  function setActiveNav(button) {
    navItems.forEach(btn => btn.classList.toggle("active", btn === button));
    updateActivePill(button);
  }

  navItems.forEach(button => {
    button.addEventListener("click", event => {
      const target = button.getAttribute("href");
      if (!target?.startsWith("#")) return;

      const section = document.querySelector(target);
      if (!section) return;

      event.preventDefault();
      setActiveNav(button);

      const offset = window.innerWidth <= 600 ? 15 : 25;
      const top = section.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: "smooth"
      });
    });
  });

  const initialActive = document.querySelector(".nav-btn.active") || navItems[0];
  requestAnimationFrame(() => updateActivePill(initialActive, true));

  window.addEventListener("resize", () => {
    const currentActive = document.querySelector(".nav-btn.active");
    updateActivePill(currentActive, true);
  });


  /* =======================================================
     6. SCROLL OBSERVER FOR SECTIONS & NAV SHOW/HIDE
     ======================================================= */

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          const button = document.querySelector(`.nav-btn[data-section="${id}"]`);
          if (button) setActiveNav(button);
        });
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  let lastScrollY = window.scrollY;
  let scrollTicking = false;

  function handleNavVisibility() {
    const currentY = window.scrollY;
    const diff = currentY - lastScrollY;

    if (currentY < 40) {
      nav?.classList.remove("nav-hidden");
    } else if (diff > 8) {
      nav?.classList.add("nav-hidden");
    } else if (diff < -6) {
      nav?.classList.remove("nav-hidden");
    }

    lastScrollY = currentY;
    scrollTicking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        requestAnimationFrame(handleNavVisibility);
        scrollTicking = true;
      }
    },
    { passive: true }
  );


  /* =======================================================
     7. HERO CRYSTAL D INTERACTION & SCROLL TRANSFORM
     ======================================================= */

  let pointerX = 0;
  let pointerY = 0;
  let smoothX = 0;
  let smoothY = 0;

  window.addEventListener(
    "pointermove",
    event => {
      pointerX = event.clientX / window.innerWidth - 0.5;
      pointerY = event.clientY / window.innerHeight - 0.5;

      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
    },
    { passive: true }
  );

  function animateCrystal() {
    if (!crystal) return;

    smoothX += (pointerX - smoothX) * 0.05;
    smoothY += (pointerY - smoothY) * 0.05;

    const scroll = window.scrollY;
    const heroHeight = Math.max(window.innerHeight, 1);
    const progress = Math.min(Math.max(scroll / heroHeight, 0), 1);

    const rotateY = smoothX * 10;
    const rotateX = -smoothY * 10;
    const moveY = progress * -200;
    const scale = Math.max(0, 1 - progress * 0.45);
    const opacity = Math.max(0, 1 - progress * 1.3);

    crystal.style.transform = `translate3d(0, ${moveY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    crystal.style.opacity = opacity;

    requestAnimationFrame(animateCrystal);
  }

  animateCrystal();


  /* =======================================================
     8. NAV GLARE EFFECT
     ======================================================= */

  const glare = document.getElementById("glare");

  nav?.addEventListener(
    "pointermove",
    event => {
      const rect = nav.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      nav.style.setProperty("--glare-x", `${x}px`);
      nav.style.setProperty("--glare-y", `${y}px`);
      if (glare) glare.style.opacity = "0.7";
    },
    { passive: true }
  );

  nav?.addEventListener("pointerleave", () => {
    if (glare) glare.style.opacity = "0.4";
  });


  /* =======================================================
     9. REVEAL ANIMATION (STAGGERED INTERSECTION OBSERVER)
     ======================================================= */

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add("visible"));
  }


  /* =======================================================
     10. 3D CARD TILT & MAGNETIC BUTTON INTERACTION
     ======================================================= */

  tiltElements.forEach(card => {
    let rect;

    card.addEventListener("pointerenter", () => {
      rect = card.getBoundingClientRect();
    });

    card.addEventListener(
      "pointermove",
      event => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (!rect) rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 3;
        const rotateX = ((centerY - y) / centerY) * 3;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
      },
      { passive: true }
    );

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
      rect = null;
    });
  });

  const magneticButtons = document.querySelectorAll(".primary-button, .round-arrow, .contact-link");

  magneticButtons.forEach(btn => {
    btn.addEventListener(
      "pointermove",
      event => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const rect = btn.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      },
      { passive: true }
    );

    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "";
    });
  });

});
