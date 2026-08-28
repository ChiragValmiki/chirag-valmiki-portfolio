/* ============================================================
   CHIRAG VALMIKI PORTFOLIO
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE NAVIGATION
    ========================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-navigation");

    if (menuToggle && nav) {

        const closeMenu = () => {
            nav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open menu");
        };

        menuToggle.addEventListener("click", () => {
            const open = nav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(open)
            );

            menuToggle.setAttribute(
                "aria-label",
                open ? "Close menu" : "Open menu"
            );
        });

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", (event) => {

            if (!nav.classList.contains("open")) {
                return;
            }

            if (
                !nav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });
    }


    /* =========================================
       ACTIVE SECTION NAVIGATION
    ========================================== */

    const links = [
        ...document.querySelectorAll(".main-navigation .nav-link")
    ];

    const sections = [
        ...document.querySelectorAll("main section[id]")
    ];

    if (links.length && sections.length) {

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const currentId = entry.target.id;

                    links.forEach((link) => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${currentId}`
                        );
                    });
                });

            },
            {
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });
    }


    /* =========================================
       SERVICES: VIEW ALL / VIEW LESS TOGGLE
    ========================================== */

    const servicesToggleBtn = document.getElementById("servicesToggleBtn");
    const servicesGrid = document.getElementById("servicesGrid");

    if (servicesToggleBtn && servicesGrid) {

        const labelEl = servicesToggleBtn.querySelector(".toggle-label");

        servicesToggleBtn.addEventListener("click", () => {

            const isExpanded = servicesGrid.classList.toggle("is-expanded");

            servicesToggleBtn.setAttribute("aria-expanded", String(isExpanded));

            if (labelEl) {
                labelEl.textContent = isExpanded
                    ? "VIEW LESS SERVICES"
                    : "VIEW ALL SERVICES";
            }

            if (!isExpanded) {
                servicesGrid.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    }


    /* =========================================
       HERO / ABOUT PHOTO PLACEHOLDERS
    ========================================== */

    document
        .querySelectorAll("img.hero-person, img[src*='about-person']")
        .forEach((image) => {
            image.addEventListener("load", () => {
                const placeholder = image.nextElementSibling;
                if (placeholder) placeholder.style.display = "none";
            });

            if (image.complete && image.naturalWidth > 0) {
                const placeholder = image.nextElementSibling;
                if (placeholder) placeholder.style.display = "none";
            }
        });


    /* =========================================
       PROJECT IMAGE PLACEHOLDERS
    ========================================== */

    document.querySelectorAll(".project-image").forEach((card) => {
        const image = card.querySelector("img");
        const placeholder = card.querySelector(".image-placeholder");

        if (!image || !placeholder) return;

        const hidePlaceholder = () => {
            placeholder.style.display = "none";
        };

        image.addEventListener("load", hidePlaceholder);

        if (image.complete && image.naturalWidth > 0) {
            hidePlaceholder();
        }

        image.addEventListener("error", () => {
            console.warn("Could not load image:", image.src);
        });
    });


    /* =========================================
       SAFE IMAGE LOADING (GENERAL)
    ========================================== */

    document
        .querySelectorAll("img")
        .forEach((image) => {

            image.addEventListener("error", () => {
                console.warn("Could not load image:", image.src);
            });

        });

});