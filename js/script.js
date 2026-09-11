/* ==========================================================================
   DANIEL — Portfolio Main Interactive Script
   Includes: Preloader, Canvas Crystal "D", Localization, Theme Toggle,
   Scroll-direction Bottom Navigation, Reveal Animations, Mouse Parallax
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       01. TRANSLATION DATA DICTIONARY
       -------------------------------------------------------------------------- */
    const translations = {
        en: {
            loading: "Loading",
            available_status: "Available for select projects",
            hero_badge: "DIGITAL CREATOR · WEB DEVELOPER",
            hero_title: 'I build digital <br><span class="gradient-text">experiences</span> that feel different.',
            hero_desc: "A personal portfolio of selected work by Daniel — from AI products to immersive web experiences.",
            explore_work: "Explore my work",
            get_in_touch: "Get in touch",
            about_label: "ABOUT",
            about_heading: "Hi, I'm Daniel.",
            about_bio: "I design and build modern websites, AI-powered products and digital experiences with a focus on clean visuals, motion and strong user experience.",
            stat_1: "Selected projects",
            stat_2: "Product focus",
            stat_3: "Design & development",
            work_label: "SELECTED WORK",
            work_title: "Things I've built.",
            p1_cat: "Brand Experience / E-Commerce",
            p1_desc: "A high-end luxury chocolate digital showcase featuring rich aesthetic art direction, smooth interactions, and fluid visual storytelling.",
            p2_cat: "AI Intelligence Platform",
            p2_desc: "Next-generation AI business suite offering streamlined intelligence workflows, predictive analytics, and automated decision tools.",
            p3_cat: "Fintech / AI Trading System",
            p3_desc: "Algorithmic trading interface and analytics dashboard engineered for high-frequency market analysis and real-time execution.",
            visit_project: "Visit project",
            statement_tag: "THE APPROACH",
            statement_heading: "Simple on the surface.<br>Thoughtful underneath.",
            statement_desc: "Every detail has a reason — from the first interaction to the final pixel.",
            contact_label: "CONTACT",
            contact_title: 'Have an idea?<br><span class="gradient-text">Let\'s build it.</span>',
            contact_desc: "For projects, collaborations or just a conversation, reach me directly.",
            telegram: "Telegram",
            phone: "Phone",
            footer_tagline: "Designed & built with intention.",
            nav_home: "Home",
            nav_work: "Work",
            nav_about: "About",
            nav_contact: "Contact"
        },
        ar: {
            loading: "جاري التحميل",
            available_status: "متاح للمشاريع المختارة",
            hero_badge: "صانع تجارب رقمية · مطور ويب",
            hero_title: 'أصمم وأبني <br><span class="gradient-text">تجارب رقمية</span> فريدة ومختلفة.',
            hero_desc: "معرض أعمال شخصي لمشاريع مختارة بواسطة دانيال — من منتجات الذكاء الاصطناعي إلى تجارب الويب التفاعلية.",
            explore_work: "استكشف أعمالي",
            get_in_touch: "تواصل معي",
            about_label: "عني",
            about_heading: "أهلاً، أنا دانيال.",
            about_bio: "أقوم بتصميم وبناء المواقع الحديثة، ومنتجات الذكاء الاصطناعي، والتجارب الرقمية مع التركيز على الجماليات النظيفة، والحركة، وتجربة المستخدم الممتازة.",
            stat_1: "مشاريع مختارة",
            stat_2: "تركيز المنتجات",
            stat_3: "تصميم وتطوير",
            work_label: "أعمال مختارة",
            work_title: "مشاريع قمت ببحائها.",
            p1_cat: "تجربة علامة تجارية / تجارة إلكترونية",
            p1_desc: "واجهة إلكترونية فاخرة لشوكولاتة جاراوي تتميز بتوجيه فني غني، وتفاعلات سلسة، وسرد بصري انسيابي.",
            p2_cat: "منصة ذكاء اصطناعي للأعمال",
            p2_desc: "منظومة ذكاء اصطناعي متقدمة تقدم مساحات عمل ذكية، وتحليلات تنبؤية، وأدوات صنع القرار الآلي.",
            p3_cat: "تكنولوجيا مالية / نظام تداول بالذكاء الاصطناعي",
            p3_desc: "لوحة تحكم وتحليل لتداول الخوارزميات مصممة للتحليل المالي عالي التردد والتنفيذ المباشر.",
            visit_project: "زيارة المشروع",
            statement_tag: "النهج",
            statement_heading: "بسيط على السطح.<br>عميق في التفاصيل.",
            statement_desc: "كل تفصيل له سبب — من التفاعل الأول حتى البكسل الأخير.",
            contact_label: "تواصل معي",
            contact_title: 'لديك فكرة؟<br><span class="gradient-text">دعنا نبنيها معاً.</span>',
            contact_desc: "للمشاريع، أو التعاون، أو مجرد إجراء محادثة، تواصل معي مباشرة.",
            telegram: "تيليجرام",
            phone: "الهاتف",
            footer_tagline: "تم التصميم والتطوير بإتقان.",
            nav_home: "الرئيسية",
            nav_work: "الأعمال",
            nav_about: "عني",
            nav_contact: "تواصل"
        }
    };

    let currentLang = 'en';

    /* --------------------------------------------------------------------------
       02. STATE & THEME MANAGEMENT
       -------------------------------------------------------------------------- */
    const htmlEl = document.documentElement;
    const themeToggleBtn = document.getElementById('themeToggle');
    const langToggleBtn = document.getElementById('langToggle');
    const langLabel = document.getElementById('langLabel');

    // Load saved theme preference
    const savedTheme = localStorage.getItem('daniel_theme') || 'dark';
    if (savedTheme === 'light') {
        htmlEl.classList.remove('dark');
        htmlEl.classList.add('light');
    } else {
        htmlEl.classList.remove('light');
        htmlEl.classList.add('dark');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (htmlEl.classList.contains('dark')) {
            htmlEl.classList.remove('dark');
            htmlEl.classList.add('light');
            localStorage.setItem('daniel_theme', 'light');
        } else {
            htmlEl.classList.remove('light');
            htmlEl.classList.add('dark');
            localStorage.setItem('daniel_theme', 'dark');
        }
    });

    // Language Toggle
    function setLanguage(lang) {
        currentLang = lang;
        htmlEl.setAttribute('lang', lang);
        htmlEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        langLabel.textContent = lang === 'ar' ? 'EN' : 'AR';

        // Translate text elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Update active nav indicator position after layout shift
        setTimeout(updateNavIndicator, 100);
    }

    langToggleBtn.addEventListener('click', () => {
        const targetLang = currentLang === 'en' ? 'ar' : 'en';
        setLanguage(targetLang);
    });

    /* --------------------------------------------------------------------------
       03. CRYSTAL "D" CANVAS RENDERING (PRELOADER & HERO)
       -------------------------------------------------------------------------- */
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    window.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        // Update custom cursor position
        const cursorGlow = document.getElementById('cursorGlow');
        if (cursorGlow) {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
            cursorGlow.style.opacity = '1';
        }
    });

    document.addEventListener('mouseleave', () => {
        const cursorGlow = document.getElementById('cursorGlow');
        if (cursorGlow) cursorGlow.style.opacity = '0';
    });

    // Helper to render static/interactive 3D Crystal Gemstone "D"
    function drawCrystalD(ctx, width, height, rotationX, rotationY, scale = 1) {
        ctx.clearRect(0, 0, width, height);
        ctx.save();
        ctx.translate(width / 2, height / 2);

        const isDark = htmlEl.classList.contains('dark');
        const primaryColor = isDark ? 'rgba(168, 85, 247, ' : 'rgba(124, 58, 237, ';
        const strokeColor = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(124, 58, 237, 0.6)';

        // Facet vertices for 3D Gemstone Letter "D"
        const vertices = [
            // Outer D Loop Facets
            {x: -70, y: -110, z: 20},
            {x: 10, y: -110, z: 20},
            {x: 80, y: -50, z: 20},
            {x: 80, y: 50, z: 20},
            {x: 10, y: 110, z: 20},
            {x: -70, y: 110, z: 20},

            // Inner D Hole Facets
            {x: -20, y: -60, z: 30},
            {x: 20, y: -60, z: 30},
            {x: 40, y: 0, z: 30},
            {x: 20, y: 60, z: 30},
            {x: -20, y: 60, z: 30},

            // Back Vertices for Depth
            {x: -70, y: -110, z: -30},
            {x: 10, y: -110, z: -30},
            {x: 80, y: -50, z: -30},
            {x: 80, y: 50, z: -30},
            {x: 10, y: 110, z: -30},
            {x: -70, y: 110, z: -30}
        ];

        // Apply 3D Rotation Transformations
        const radX = rotationX;
        const radY = rotationY;
        const cosX = Math.cos(radX), sinX = Math.sin(radX);
        const cosY = Math.cos(radY), sinY = Math.sin(radY);

        const projected = vertices.map(v => {
            // Rotate Y
            let x1 = v.x * cosY + v.z * sinY;
            let z1 = -v.x * sinY + v.z * cosY;
            // Rotate X
            let y1 = v.y * cosX - z1 * sinX;
            let z2 = v.y * sinX + z1 * cosX;

            const perspective = 400 / (400 + z2);
            return {
                x: x1 * perspective * scale,
                y: y1 * perspective * scale,
                z: z2
            };
        });

        // Facets Definitions (Polygons)
        const facets = [
            [0, 1, 7, 6],
            [1, 2, 8, 7],
            [2, 3, 9, 8],
            [3, 4, 10, 9],
            [4, 5, 10, 6],
            [0, 6, 10, 5],
            // Front Bevels to back
            [0, 1, 12, 11],
            [1, 2, 13, 12],
            [2, 3, 14, 13],
            [3, 4, 15, 14],
            [4, 5, 16, 15]
        ];

        // Sort facets by z-depth
        facets.sort((a, b) => {
            const zA = a.reduce((sum, idx) => sum + projected[idx].z, 0) / a.length;
            const zB = b.reduce((sum, idx) => sum + projected[idx].z, 0) / b.length;
            return zB - zA;
        });

        // Render Facets
        facets.forEach((facet, index) => {
            ctx.beginPath();
            ctx.moveTo(projected[facet[0]].x, projected[facet[0]].y);
            for (let i = 1; i < facet.length; i++) {
                ctx.lineTo(projected[facet[i]].x, projected[facet[i]].y);
            }
            ctx.closePath();

            // Refractive Gemstone Gradient Fill
            const grad = ctx.createLinearGradient(-100, -100, 100, 100);
            const alpha = 0.12 + (index % 5) * 0.08;
            grad.addColorStop(0, `${primaryColor}${alpha + 0.1})`);
            grad.addColorStop(0.5, `${primaryColor}${alpha})`);
            grad.addColorStop(1, 'rgba(255, 255, 255, 0.05)');

            ctx.fillStyle = grad;
            ctx.fill();

            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 1.2;
            ctx.stroke();
        });

        // Specular Center Highlight Glow
        ctx.beginPath();
        ctx.arc(0, 0, 80 * scale, 0, Math.PI * 2);
        const centerGlow = ctx.createRadialGradient(0, 0, 5, 0, 0, 90 * scale);
        centerGlow.addColorStop(0, `${primaryColor}0.3)`);
        centerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = centerGlow;
        ctx.fill();

        ctx.restore();
    }

    // Canvas Instances
    const preloaderCanvas = document.getElementById('preloaderCanvas');
    const heroCanvas = document.getElementById('heroCrystalCanvas');

    let preloaderCtx = preloaderCanvas ? preloaderCanvas.getContext('2d') : null;
    let heroCtx = heroCanvas ? heroCanvas.getContext('2d') : null;

    let heroScale = 1;
    let heroAlpha = 1;
    let heroYOffset = 0;

    function animateCrystalCanvases() {
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        // Render Preloader Crystal
        if (preloaderCtx && preloaderCanvas) {
            drawCrystalD(preloaderCtx, preloaderCanvas.width, preloaderCanvas.height, 0.1, 0.2, 0.6);
        }

        // Render Hero Crystal with Scroll Fade & Parallax
        if (heroCtx && heroCanvas) {
            heroCanvas.style.transform = `translateY(${heroYOffset}px) scale(${heroScale})`;
            heroCanvas.style.opacity = heroAlpha;
            drawCrystalD(heroCtx, heroCanvas.width, heroCanvas.height, mouseY * 0.2, mouseX * 0.3, 1.3);
        }

        requestAnimationFrame(animateCrystalCanvases);
    }

    animateCrystalCanvases();

    /* --------------------------------------------------------------------------
       04. PRELOADER DISMISSAL
       -------------------------------------------------------------------------- */
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }
    }, 1200);

    /* --------------------------------------------------------------------------
       05. FLOATING NAVIGATION & SCROLL DIRECTION BEHAVIOR
       -------------------------------------------------------------------------- */
    const nav = document.getElementById('floatingNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.getElementById('navIndicator');
    const sections = document.querySelectorAll('section[id]');

    let lastScrollY = window.scrollY;

    function updateNavIndicator() {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink && navIndicator) {
            const linkRect = activeLink.getBoundingClientRect();
            const pillRect = activeLink.closest('.floating-nav-pill').getBoundingClientRect();

            const offsetLeft = linkRect.left - pillRect.left;
            navIndicator.style.width = `${linkRect.width}px`;
            navIndicator.style.transform = `translateX(${offsetLeft - 8}px)`;
        }
    }

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Hide navigation on scroll down, show on scroll up or top
        if (currentScrollY > 100 && currentScrollY > lastScrollY) {
            nav.classList.add('nav-hidden');
        } else {
            nav.classList.remove('nav-hidden');
        }
        lastScrollY = currentScrollY;

        // Parallax & Fade Crystal D in Hero on Scroll
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            const scrollRatio = Math.min(1, currentScrollY / heroHeight);
            heroYOffset = -scrollRatio * 100;
            heroScale = 1 - scrollRatio * 0.3;
            heroAlpha = 1 - scrollRatio * 1.2;
        }

        // Highlight active section in nav
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            if (currentScrollY >= sectionTop && currentScrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === currentSectionId) {
                    link.classList.add('active');
                }
            });
            updateNavIndicator();
        }
    });

    window.addEventListener('resize', updateNavIndicator);
    updateNavIndicator();

    /* --------------------------------------------------------------------------
       06. INTERSECTION OBSERVER FOR SCROLL REVEALS
       -------------------------------------------------------------------------- */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal-element').forEach(el => {
        revealObserver.observe(el);
    });

});
