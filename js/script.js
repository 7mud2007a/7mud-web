(() => {
  "use strict";

  const body = document.body;
  const loader = document.querySelector(".loader");
  const crystal = document.querySelector(".hero-crystal");
  const navItems = [...document.querySelectorAll(".nav-link")];
  const activePill = document.querySelector(".active-pill");
  const themeToggle = document.querySelector(".theme-toggle");
  const languageToggle = document.querySelector(".language-toggle");
  const nav = document.querySelector(".liquid-nav");

  /* =========================
     LOADER
  ========================= */

  window.addEventListener("load", () => {
    setTimeout(() => {
      if (loader) {
        loader.classList.add("is-hidden");

        setTimeout(() => {
          loader.remove();
        }, 900);
      }
    }, 650);
  });


  /* =========================
     ACTIVE NAV PILL
  ========================= */

  function moveActivePill(item) {
    if (!item || !activePill) return;

    const navBox = item.parentElement.getBoundingClientRect();
    const itemBox = item.getBoundingClientRect();

    const x = itemBox.left - navBox.left;

    activePill.style.width = `${itemBox.width}px`;
    activePill.style.transform = `translateX(${x}px)`;
  }

  function setActiveNav(item) {
    navItems.forEach((link) => {
      link.classList.remove("active");
    });

    if (item) {
      item.classList.add("active");
      moveActivePill(item);
    }
  }

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      setActiveNav(item);
    });
  });

  window.addEventListener("resize", () => {
    const active = document.querySelector(".nav-link.active");

    if (active) {
      moveActivePill(active);
    }
  });


  /* =========================
     CURSOR GLARE
  ========================= */

  if (nav) {
    nav.addEventListener("pointermove", (event) => {
      const rect = nav.getBoundingClientRect();

      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      nav.style.setProperty("--glare-x", `${x}%`);
      nav.style.setProperty("--glare-y", `${y}%`);
    });

    nav.addEventListener("pointerleave", () => {
      nav.style.setProperty("--glare-x", "50%");
      nav.style.setProperty("--glare-y", "50%");
    });
  }


  /* =========================
     CRYSTAL POINTER MOVEMENT
  ========================= */

  let pointerX = 0;
  let pointerY = 0;

  window.addEventListener("pointermove", (event) => {
    pointerX =
      (event.clientX / window.innerWidth - 0.5) * 2;

    pointerY =
      (event.clientY / window.innerHeight - 0.5) * 2;
  });

  function updateCrystal() {
    if (!crystal) return;

    const scroll = window.scrollY;
    const heroHeight = window.innerHeight;

    const progress = Math.min(scroll / heroHeight, 1);

    const rotateX = pointerY * -4;
    const rotateY = pointerX * 6;

    const moveY = progress * -150;
    const scale = 1 - progress * 0.35;
    const opacity = 1 - progress * 1.15;

    crystal.style.transform = `
      translate3d(0, ${moveY}px, 0)
      scale(${scale})
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;

    crystal.style.opacity = Math.max(opacity, 0);
  }

  window.addEventListener("pointermove", updateCrystal);
  window.addEventListener("scroll", updateCrystal, {
    passive: true
  });

  updateCrystal();


  /* =========================
     SCROLL REVEAL
  ========================= */

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });


  /* =========================
     ACTIVE SECTION
  ========================= */

  const sections = [
    ...document.querySelectorAll("section[id]")
  ];

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (a, b) =>
            b.intersectionRatio - a.intersectionRatio
        );

      if (!visible.length) return;

      const currentId = visible[0].target.id;

      const matchingLink = navItems.find((link) => {
        return (
          link.getAttribute("href") === `#${currentId}`
        );
      });

      if (matchingLink) {
        setActiveNav(matchingLink);
      }
    },
    {
      threshold: [0.15, 0.35, 0.6],
      rootMargin: "-15% 0px -55% 0px"
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });


  /* =========================
     THEME
  ========================= */

  const savedTheme =
    localStorage.getItem("daniel-theme");

  if (savedTheme === "dark") {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }

  function updateThemeIcon() {
    if (!themeToggle) return;

    const isDark = body.classList.contains("dark");

    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );

    themeToggle.setAttribute(
      "title",
      isDark ? "Light mode" : "Dark mode"
    );

    themeToggle.innerHTML = isDark
      ? "☼"
      : "◐";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark");

      const isDark =
        body.classList.contains("dark");

      localStorage.setItem(
        "daniel-theme",
        isDark ? "dark" : "light"
      );

      updateThemeIcon();
    });
  }

  updateThemeIcon();


  /* =========================
     LANGUAGE
  ========================= */

  const translations = {
    en: {
      home: "Home",
      work: "Work",
      about: "About",
      contact: "Contact",

      heroKicker: "Independent Developer",
      heroTitle: "Designing digital experiences.",
      heroText:
        "I build modern websites and digital products with a focus on design, technology and smooth experiences.",

      aboutKicker: "About",
      aboutTitle: "I turn ideas into digital experiences.",
      aboutText:
        "I'm Daniel, a developer focused on creating premium websites, interactive experiences and modern digital products.",

      workKicker: "Selected Work",
      workTitle: "Projects I've built.",

      project1Title: "Garaue Chocolate",
      project1Text:
        "A premium chocolate experience with a modern visual identity.",

      project2Title: "Biz AI",
      project2Text:
        "An AI-powered content and social media assistant for businesses.",

      project3Title: "EDGE AI Trader",
      project3Text:
        "A private AI-powered forex intelligence platform.",

      statement:
        "Good design is not decoration. It's how an experience feels.",

      contactKicker: "Contact",
      contactTitle: "Let's build something.",
      contactText:
        "Have an idea, project or collaboration in mind? Let's talk.",

      telegram: "Telegram",
      phone: "Phone",

      footer:
        "Designed & built by Daniel."
    },

    ar: {
      home: "الرئيسية",
      work: "أعمالي",
      about: "عني",
      contact: "تواصل",

      heroKicker: "مطور مستقل",
      heroTitle: "أصمم تجارب رقمية مختلفة.",
      heroText:
        "أبني مواقع ومنتجات رقمية حديثة مع التركيز على التصميم والتقنية وسلاسة التجربة.",

      aboutKicker: "عني",
      aboutTitle: "أحوّل الأفكار إلى تجارب رقمية.",
      aboutText:
        "أنا دانيال، مطور أركز على بناء مواقع احترافية وتجارب تفاعلية ومنتجات رقمية حديثة.",

      workKicker: "أعمال مختارة",
      workTitle: "مشاريع قمت ببنائها.",

      project1Title: "Garaue Chocolate",
      project1Text:
        "تجربة شوكولاتة فاخرة بهوية بصرية عصرية.",

      project2Title: "Biz AI",
      project2Text:
        "مساعد ذكي لإنشاء المحتوى وإدارة أفكار السوشال ميديا.",

      project3Title: "EDGE AI Trader",
      project3Text:
        "منصة خاصة لتحليل الفوركس بالذكاء الاصطناعي.",

      statement:
        "التصميم الجيد ليس مجرد شكل، بل هو الإحساس الذي تتركه التجربة.",

      contactKicker: "تواصل",
      contactTitle: "لنبني شيئاً مميزاً.",
      contactText:
        "عندك فكرة أو مشروع أو تعاون؟ تواصل معي.",

      telegram: "تيليغرام",
      phone: "الهاتف",

      footer:
        "تصميم وتطوير دانيال."
    }
  };


  let currentLanguage =
    localStorage.getItem("daniel-language") || "en";

  function applyLanguage(language) {
    const dictionary =
      translations[language] || translations.en;

    document.documentElement.lang = language;

    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]")
      .forEach((element) => {
        const key =
          element.getAttribute("data-i18n");

        if (dictionary[key]) {
          element.textContent = dictionary[key];
        }
      });

    if (languageToggle) {
      languageToggle.textContent =
        language === "ar" ? "EN" : "AR";

      languageToggle.setAttribute(
        "aria-label",
        language === "ar"
          ? "Switch to English"
          : "التبديل إلى العربية"
      );
    }

    localStorage.setItem(
      "daniel-language",
      language
    );

    requestAnimationFrame(() => {
      const active =
        document.querySelector(".nav-link.active");

      if (active) {
        moveActivePill(active);
      }
    });
  }

  if (languageToggle) {
    languageToggle.addEventListener("click", () => {
      currentLanguage =
        currentLanguage === "en"
          ? "ar"
          : "en";

      applyLanguage(currentLanguage);
    });
  }

  applyLanguage(currentLanguage);


  /* =========================
     SMOOTH ANCHOR SCROLL
  ========================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId =
          link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target =
          document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });


  /* =========================
     MAGNETIC BUTTON EFFECT
  ========================= */

  const magneticElements =
    document.querySelectorAll(
      ".magnetic, .glass-button"
    );

  magneticElements.forEach((element) => {
    element.addEventListener(
      "pointermove",
      (event) => {
        if (window.innerWidth < 768) return;

        const rect =
          element.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;

        element.style.transform =
          `translate(${x * 0.08}px, ${y * 0.08}px)`;
      }
    );

    element.addEventListener(
      "pointerleave",
      () => {
        element.style.transform = "";
      }
    );
  });


  /* =========================
     REDUCED MOTION
  ========================= */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

  if (reducedMotion.matches) {
    document.documentElement.classList.add(
      "reduced-motion"
    );
  }

  reducedMotion.addEventListener?.(
    "change",
    (event) => {
      document.documentElement.classList.toggle(
        "reduced-motion",
        event.matches
      );
    }
  );

})();
