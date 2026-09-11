/* =========================================================
   DANIEL — PORTFOLIO SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const html = document.documentElement;

  const loader = document.getElementById("loader");

  const nav = document.getElementById("nav");
  const navItems = [...document.querySelectorAll(".nav-btn")];
  const activePill = document.getElementById("active-pill");

  const themeBtn = document.getElementById("theme-btn");
  const langBtn = document.getElementById("lang-btn");

  const crystal = document.getElementById("crystal");

  const sections = [
    ...document.querySelectorAll(
      "#home, #about, #work, #contact"
    )
  ];

  const revealElements = [
    ...document.querySelectorAll(".reveal")
  ];

  const tiltElements = [
    ...document.querySelectorAll("[data-tilt]")
  ];


  /* =======================================================
     LOADER
     ======================================================= */

  window.addEventListener("load", () => {

    setTimeout(() => {

      if (loader) {
        loader.classList.add("hidden");
      }

    }, 700);

  });


  /* =======================================================
     YEAR
     ======================================================= */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =======================================================
     THEME
     ======================================================= */

  const savedTheme =
    localStorage.getItem("daniel-theme");

  if (
    savedTheme === "dark" ||
    savedTheme === "light"
  ) {
    html.dataset.theme = savedTheme;
  } else {
    html.dataset.theme = "light";
  }


  function setTheme(theme) {

    html.dataset.theme = theme;

    localStorage.setItem(
      "daniel-theme",
      theme
    );

  }


  themeBtn?.addEventListener("click", () => {

    const current =
      html.dataset.theme === "dark"
        ? "dark"
        : "light";

    setTheme(
      current === "dark"
        ? "light"
        : "dark"
    );

  });


  /* =======================================================
     LANGUAGE
     ======================================================= */

  const translations = {

    en: {

      loading: "Loading",

      home: "Home",
      work: "Work",
      about: "About",
      contact: "Contact",

      eyebrow:
        "DIGITAL CREATOR · WEB DEVELOPER",

      hero1:
        "I build digital",

      hero2:
        "experiences that feel different.",

      heroCopy:
        "A personal portfolio of selected work by Daniel — from AI products to immersive web experiences.",

      explore:
        "Explore my work",

      scroll:
        "Scroll to explore",

      status:
        "Building on the web",

      aboutLabel:
        "01 / ABOUT",

      hi:
        "Hi, I'm",

      aboutText:
        "I design and build modern websites, AI-powered products and digital experiences with a focus on clean visuals, motion and strong user experience.",

      selected:
        "Selected projects",

      focus:
        "Product focus",

      design:
        "Design & development",

      workLabel:
        "02 / SELECTED WORK",

      built:
        "Things I've built.",

      workNote:
        "A few projects that represent the direction I like to build in.",

      garaueText:
        "Premium product experience with a polished visual identity.",

      bizText:
        "AI-powered content generation for businesses and creators.",

      edgeText:
        "Private AI-powered forex intelligence experience.",

      approach:
        "THE APPROACH",

      approachTitle:
        "Simple on the surface. Thoughtful underneath.",

      approachText:
        "Every detail has a reason — from the first interaction to the final pixel.",

      contactLabel:
        "03 / CONTACT",

      contactTitle:
        "Have an idea? Let's build it.",

      contactText:
        "For projects, collaborations or just a conversation, reach me directly.",

      phone:
        "Phone",

      footer:
        "Designed & built with intention."

    },


    ar: {

      loading:
        "جاري التحميل",

      home:
        "الرئيسية",

      work:
        "أعمالي",

      about:
        "عني",

      contact:
        "تواصل",

      eyebrow:
        "مطور ويب · صانع تجارب رقمية",

      hero1:
        "أبني تجارب",

      hero2:
        "رقمية مختلفة.",

      heroCopy:
        "معرض شخصي لأعمال دانيال — من منتجات الذكاء الاصطناعي إلى تجارب الويب الغامرة.",

      explore:
        "استكشف أعمالي",

      scroll:
        "مرر للاستكشاف",

      status:
        "أبني على الويب",

      aboutLabel:
        "01 / عني",

      hi:
        "مرحباً، أنا",

      aboutText:
        "أصمم وأطور مواقع حديثة ومنتجات مدعومة بالذكاء الاصطناعي وتجارب رقمية، مع التركيز على التصميم النظيف والحركة وتجربة المستخدم.",

      selected:
        "مشاريع مختارة",

      focus:
        "تركيزي",

      design:
        "تصميم وتطوير",

      workLabel:
        "02 / أعمال مختارة",

      built:
        "أشياء بنيتها.",

      workNote:
        "مجموعة من المشاريع التي تمثل الاتجاه الذي أحب البناء فيه.",

      garaueText:
        "تجربة رقمية فاخرة لمنتج مع هوية بصرية مصقولة.",

      bizText:
        "منصة لتوليد المحتوى بالذكاء الاصطناعي للشركات وصناع المحتوى.",

      edgeText:
        "تجربة خاصة لتحليل أسواق الفوركس بالذكاء الاصطناعي.",

      approach:
        "النهج",

      approachTitle:
        "بسيط من الخارج. مدروس من الداخل.",

      approachText:
        "كل تفصيل له سبب — من أول تفاعل حتى آخر بكسل.",

      contactLabel:
        "03 / تواصل",

      contactTitle:
        "عندك فكرة؟ خلينا نبنيها.",

      contactText:
        "للمشاريع أو التعاون أو حتى مجرد حديث، تواصل معي مباشرة.",

      phone:
        "الهاتف",

      footer:
        "مصمم ومبني بعناية."

    }

  };


  function applyLanguage(language) {

    const dictionary =
      translations[language] ||
      translations.en;

    html.lang = language;

    html.dir =
      language === "ar"
        ? "rtl"
        : "ltr";


    document
      .querySelectorAll("[data-i18n]")
      .forEach(element => {

        const key =
          element.dataset.i18n;

        if (
          dictionary[key] !== undefined
        ) {

          element.textContent =
            dictionary[key];

        }

      });


    if (langBtn) {

      langBtn.textContent =
        language === "en"
          ? "AR"
          : "EN";

    }

    localStorage.setItem(
      "daniel-language",
      language
    );

  }


  const savedLanguage =
    localStorage.getItem(
      "daniel-language"
    );

  applyLanguage(
    savedLanguage === "ar"
      ? "ar"
      : "en"
  );


  langBtn?.addEventListener(
    "click",
    () => {

      const current =
        html.lang === "ar"
          ? "ar"
          : "en";

      applyLanguage(
        current === "ar"
          ? "en"
          : "ar"
      );

      requestAnimationFrame(
        updateActivePill
      );

    }
  );


  /* =======================================================
     ACTIVE NAV PILL
     ======================================================= */

  function updateActivePill(
    button,
    instant = false
  ) {

    if (!button || !activePill) {
      return;
    }

    const parent =
      button.parentElement;

    if (!parent) {
      return;
    }

    const parentRect =
      parent.getBoundingClientRect();

    const buttonRect =
      button.getBoundingClientRect();

    const x =
      buttonRect.left -
      parentRect.left;

    activePill.style.width =
      `${buttonRect.width}px`;

    if (instant) {

      activePill.style.transition =
        "none";

      activePill.style.transform =
        `translateX(${x}px)`;

      requestAnimationFrame(() => {

        activePill.style.transition =
          "";

      });

    } else {

      activePill.style.transform =
        `translateX(${x}px)`;

    }

  }


  function setActiveNav(button) {

    navItems.forEach(item => {

      item.classList.toggle(
        "active",
        item === button
      );

    });

    updateActivePill(button);

  }


  navItems.forEach(button => {

    button.addEventListener(
      "click",
      event => {

        const target =
          button.getAttribute("href");

        if (!target?.startsWith("#")) {
          return;
        }

        const element =
          document.querySelector(target);

        if (!element) {
          return;
        }

        event.preventDefault();

        setActiveNav(button);

        const offset =
          window.innerWidth <= 650
            ? 20
            : 25;

        const top =
          element.getBoundingClientRect().top +
          window.scrollY -
          offset;

        window.scrollTo({
          top,
          behavior: "smooth"
        });

      }
    );

  });


  /* Initial pill */

  const initialActive =
    document.querySelector(
      ".nav-btn.active"
    ) ||
    navItems[0];

  requestAnimationFrame(() => {

    updateActivePill(
      initialActive,
      true
    );

  });


  window.addEventListener(
    "resize",
    () => {

      const active =
        document.querySelector(
          ".nav-btn.active"
        );

      updateActivePill(
        active,
        true
      );

    }
  );


  /* =======================================================
     SECTION OBSERVER
     ======================================================= */

  if ("IntersectionObserver" in window) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }

            const id =
              entry.target.id;

            const button =
              document.querySelector(
                `.nav-btn[data-section="${id}"]`
              );

            if (button) {
              setActiveNav(button);
            }

          });

        },
        {
          root: null,

          rootMargin:
            "-42% 0px -45% 0px",

          threshold: 0
        }
      );


    sections.forEach(section => {

      sectionObserver.observe(section);

    });

  }


  /* =======================================================
     NAV SHOW / HIDE ON SCROLL
     ======================================================= */

  let lastScrollY =
    window.scrollY;

  let ticking = false;


  function handleNavScroll() {

    const currentY =
      window.scrollY;

    const difference =
      currentY - lastScrollY;


    if (currentY < 30) {

      nav?.classList.remove(
        "nav-hidden"
      );

    } else if (difference > 7) {

      nav?.classList.add(
        "nav-hidden"
      );

    } else if (difference < -5) {

      nav?.classList.remove(
        "nav-hidden"
      );

    }


    lastScrollY = currentY;

    ticking = false;

  }


  window.addEventListener(
    "scroll",
    () => {

      if (!ticking) {

        requestAnimationFrame(
          handleNavScroll
        );

        ticking = true;

      }

    },
    {
      passive: true
    }
  );


  /* =======================================================
     CRYSTAL POINTER PARALLAX
     ======================================================= */

  let pointerX = 0;
  let pointerY = 0;

  let smoothX = 0;
  let smoothY = 0;


  function pointerMove(
    clientX,
    clientY
  ) {

    pointerX =
      (clientX / window.innerWidth - .5);

    pointerY =
      (clientY / window.innerHeight - .5);

  }


  window.addEventListener(
    "pointermove",
    event => {

      pointerMove(
        event.clientX,
        event.clientY
      );

      document.documentElement.style
        .setProperty(
          "--mouse-x",
          `${event.clientX}px`
        );

      document.documentElement.style
        .setProperty(
          "--mouse-y",
          `${event.clientY}px`
        );

    },
    {
      passive: true
    }
  );


  /* =======================================================
     CRYSTAL SCROLL ANIMATION
     ======================================================= */

  function updateCrystal() {

    if (!crystal) {
      return;
    }

    smoothX +=
      (pointerX - smoothX) * .045;

    smoothY +=
      (pointerY - smoothY) * .045;


    const scroll =
      window.scrollY;

    const heroHeight =
      Math.max(
        window.innerHeight,
        1
      );

    const progress =
      Math.min(
        Math.max(
          scroll / heroHeight,
          0
        ),
        1
      );


    const rotateY =
      smoothX * 8;

    const rotateX =
      -smoothY * 7;

    const moveY =
      progress * -190;

    const scale =
      1 - progress * .42;

    const opacity =
      Math.max(
        0,
        1 - progress * 1.25
      );


    crystal.style.transform =
      `translate3d(0, ${moveY}px, 0)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       scale(${scale})`;

    crystal.style.opacity =
      opacity;

  }


  function crystalLoop() {

    updateCrystal();

    requestAnimationFrame(
      crystalLoop
    );

  }

  crystalLoop();


  /* =======================================================
     NAV GLARE
     ======================================================= */

  const glare =
    document.getElementById("glare");


  nav?.addEventListener(
    "pointermove",
    event => {

      const rect =
        nav.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;

      nav.style
        .setProperty(
          "--glare-x",
          `${x}px`
        );

      nav.style
        .setProperty(
          "--glare-y",
          `${y}px`
        );

      glare?.style
        .setProperty(
          "opacity",
          ".8"
        );

    },
    {
      passive: true
    }
  );


  nav?.addEventListener(
    "pointerleave",
    () => {

      glare?.style
        .setProperty(
          "opacity",
          ".45"
        );

    }
  );


  /* =======================================================
     REVEAL ANIMATION
     ======================================================= */

  if (
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                entry.target
                  .classList
                  .add("visible");

                revealObserver
                  .unobserve(
                    entry.target
                  );

              }

            }
          );

        },
        {
          threshold: .12
        }
      );


    revealElements.forEach(
      element => {

        revealObserver.observe(
          element
        );

      }
    );

  } else {

    revealElements.forEach(
      element => {

        element.classList.add(
          "visible"
        );

      }
    );

  }


  /* =======================================================
     CARD 3D TILT
     ======================================================= */

  tiltElements.forEach(card => {

    let rect;


    card.addEventListener(
      "pointerenter",
      () => {

        rect =
          card.getBoundingClientRect();

      }
    );


    card.addEventListener(
      "pointermove",
      event => {

        if (
          window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches
        ) {
          return;
        }

        if (!rect) {

          rect =
            card.getBoundingClientRect();

        }


        const x =
          event.clientX -
          rect.left;

        const y =
          event.clientY -
          rect.top;


        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;


        const rotateY =
          ((x - centerX) /
            centerX) * 2.7;

        const rotateX =
          ((centerY - y) /
            centerY) * 2.7;


        card.style.transform =
          `perspective(1000px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-3px)`;

      },
      {
        passive: true
      }
    );


    card.addEventListener(
      "pointerleave",
      () => {

        card.style.transform =
          "";

        rect = null;

      }
    );

  });


  /* =======================================================
     MAGNETIC BUTTONS
     ======================================================= */

  const magneticButtons =
    document.querySelectorAll(
      ".primary-button, .round-arrow, .contact-link"
    );


  magneticButtons.forEach(button => {

    button.addEventListener(
      "pointermove",
      event => {

        if (
          window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches
        ) {
          return;
        }


        const rect =
          button.getBoundingClientRect();


        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;


        button.style.transform =
          `translate(
            ${x * .08}px,
            ${y * .08}px
          )`;

      },
      {
        passive: true
      }
    );


    button.addEventListener(
      "pointerleave",
      () => {

        button.style.transform =
          "";

      }
    );

  });


  /* =======================================================
     KEYBOARD ACCESS
     ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        nav?.classList.remove(
          "nav-hidden"
        );

      }

    }
  );


  /* =======================================================
     REDUCED MOTION
     ======================================================= */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );


  if (reducedMotion.matches) {

    nav?.classList.remove(
      "nav-hidden"
    );

    if (crystal) {

      crystal.style.transform =
        "none";

      crystal.style.opacity =
        "1";

    }

  }

});
