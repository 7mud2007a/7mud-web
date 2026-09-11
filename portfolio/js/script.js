/* =========================================================
   PORTFOLIO ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const root =
        document.documentElement;

    const themeButton =
        document.getElementById("theme-btn");

    const nav =
        document.getElementById("navbar");

    const navGlare =
        document.getElementById("nav-glare");

    const navButtons =
        document.querySelectorAll(".nav-btn");

    const activePill =
        document.getElementById("active-pill");

    const projectsGrid =
        document.getElementById("projects-grid");


    /* =====================================================
       THEME
    ====================================================== */

    const savedTheme =
        localStorage.getItem("portfolio-theme");

    if (savedTheme) {

        root.setAttribute(
            "data-theme",
            savedTheme
        );

    }


    themeButton.addEventListener(
        "click",
        () => {

            const current =
                root.getAttribute(
                    "data-theme"
                );

            const next =
                current === "dark"
                    ? "light"
                    : "dark";

            root.setAttribute(
                "data-theme",
                next
            );

            localStorage.setItem(
                "portfolio-theme",
                next
            );

        }
    );


    /* =====================================================
       NAV ACTIVE PILL
    ====================================================== */

    function moveActivePill(button, instant = false) {

        if (!button) return;

        const parent =
            button.parentElement;

        const parentRect =
            parent.getBoundingClientRect();

        const buttonRect =
            button.getBoundingClientRect();

        const x =
            buttonRect.left -
            parentRect.left;

        if (instant) {

            activePill.style.transition =
                "none";

        } else {

            activePill.style.transition =
                "transform .45s cubic-bezier(.16,1,.3,1), width .45s cubic-bezier(.16,1,.3,1)";

        }

        activePill.style.width =
            `${buttonRect.width}px`;

        activePill.style.transform =
            `translateX(${x}px)`;

    }


    function setActive(button) {

        navButtons.forEach(
            item =>
                item.classList.remove(
                    "active"
                )
        );

        button.classList.add(
            "active"
        );

        moveActivePill(button);

    }


    navButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                setActive(button);

            }
        );

    });


    const initial =
        document.querySelector(
            ".nav-btn.active"
        );

    if (initial) {

        setTimeout(
            () =>
                moveActivePill(
                    initial,
                    true
                ),
            100
        );

    }


    window.addEventListener(
        "resize",
        () => {

            const active =
                document.querySelector(
                    ".nav-btn.active"
                );

            moveActivePill(
                active,
                true
            );

        }
    );


    /* =====================================================
       NAV MOUSE GLARE
    ====================================================== */

    nav.addEventListener(
        "mousemove",
        event => {

            const rect =
                nav.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            navGlare.style.left =
                `${x}px`;

            navGlare.style.top =
                `${y}px`;

            navGlare.style.opacity =
                "1";

        }
    );


    nav.addEventListener(
        "mouseleave",
        () => {

            navGlare.style.opacity =
                "0";

        }
    );


    /* =====================================================
       PROJECTS
    ====================================================== */

    if (
        typeof projects !==
        "undefined"
    ) {

        projectsGrid.innerHTML =
            projects
                .map(
                    project => `

                    <a
                        href="${project.link}"
                        class="project-card glass-card reveal"
                        target="_blank"
                        rel="noopener noreferrer"
                    >

                        <div
                            class="project-visual ${project.visualClass}"
                        >

                            <div class="project-glow"></div>

                        </div>

                        <span class="project-number">
                            ${project.number}
                        </span>

                        <div class="project-content">

                            <div class="project-category">
                                ${project.category}
                            </div>

                            <div class="project-title">
                                ${project.title}
                            </div>

                            <div class="project-description">
                                ${project.description}
                            </div>

                        </div>

                    </a>

                `
                )
                .join("");

    }


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

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
                                .add(
                                    "visible"
                                );

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


    function observeRevealElements() {

        document
            .querySelectorAll(
                ".reveal"
            )
            .forEach(
                element =>
                    revealObserver
                        .observe(element)
            );

    }


    observeRevealElements();


    /* =====================================================
       SMOOTH NAV + ACTIVE SECTION
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const id =
                                entry.target.id;

                            const button =
                                document.querySelector(
                                    `.nav-btn[href="#${id}"]`
                                );

                            if (button) {

                                setActive(
                                    button
                                );

                            }

                        }

                    }
                );

            },
            {
                threshold: .35
            }
        );


    sections.forEach(
        section =>
            sectionObserver.observe(
                section
            )
    );


    /* =====================================================
       PROJECT CARD TILT
    ====================================================== */

    document.addEventListener(
        "mousemove",
        event => {

            const card =
                event.target.closest(
                    ".project-card"
                );

            if (!card) return;

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const rotateY =
                ((x / rect.width) - .5) * 4;

            const rotateX =
                ((y / rect.height) - .5) * -4;

            card.style.transform =
                `perspective(900px)
                 translateY(-8px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    document.addEventListener(
        "mouseout",
        event => {

            const card =
                event.target.closest(
                    ".project-card"
                );

            if (!card) return;

            if (
                card.contains(
                    event.relatedTarget
                )
            ) return;

            card.style.transform =
                "";

        }
    );


});
