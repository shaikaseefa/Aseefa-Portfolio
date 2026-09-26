// =========================================
// ASEEFA PORTFOLIO
// Main JavaScript File
// =========================================

"use strict";


// =========================================
// SELECTORS
// =========================================

const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

const siteHeader = document.querySelector("#site-header");

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

const emptyProjectMessage = document.querySelector(
    "#empty-project-message"
);

const detailsButtons = document.querySelectorAll(
    ".details-button"
);

const revealElements = document.querySelectorAll(".reveal");

const backToTopButton = document.querySelector("#back-to-top");

const currentYearElement = document.querySelector("#current-year");


// =========================================
// MOBILE NAVIGATION
// =========================================

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    // Close the menu after selecting a navigation link

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });

}


// =========================================
// HEADER SCROLL EFFECT
// =========================================

function updateHeader() {

    if (!siteHeader) {
        return;
    }

    if (window.scrollY > 40) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


// =========================================
// ACTIVE NAVIGATION LINK
// =========================================

const pageSections = document.querySelectorAll(
    "main section[id]"
);

function updateActiveNavigation() {

    let currentSection = "";

    pageSections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        const linkTarget = link.getAttribute("href");

        link.classList.toggle(
            "active",
            linkTarget === `#${currentSection}`
        );

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation
);

updateActiveNavigation();


// =========================================
// SCROLL REVEAL ANIMATION
// =========================================

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

} else {

    // Fallback for older browsers

    revealElements.forEach((element) => {

        element.classList.add("visible");

    });

}


// =========================================
// PROJECT FILTERING
// =========================================

function filterProjects(selectedCategory) {

    let visibleProjectCount = 0;

    projectCards.forEach((card) => {

        const projectCategory = card.dataset.category;

        const shouldShow =
            selectedCategory === "all" ||
            projectCategory === selectedCategory;

        if (shouldShow) {

            card.classList.remove("is-hidden");

            visibleProjectCount++;

        } else {

            card.classList.add("is-hidden");

        }

    });


    if (emptyProjectMessage) {

        emptyProjectMessage.classList.toggle(
            "visible",
            visibleProjectCount === 0
        );

    }

}


filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedCategory = button.dataset.filter;

        filterButtons.forEach((filterButton) => {

            filterButton.classList.remove("active");

        });

        button.classList.add("active");

        filterProjects(selectedCategory);

    });

});


// =========================================
// PROJECT DETAILS TOGGLE
// =========================================

detailsButtons.forEach((button) => {

    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", () => {

        const projectCard = button.closest(".project-card");

        if (!projectCard) {
            return;
        }

        const details = projectCard.querySelector(
            ".project-details"
        );

        if (!details) {
            return;
        }

        const isOpen = details.classList.toggle("open");

        button.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        button.textContent = isOpen
            ? "Hide Details −"
            : "View Details +";

    });

});


// =========================================
// CURRENT YEAR
// =========================================

if (currentYearElement) {

    currentYearElement.textContent =
        new Date().getFullYear();

}


// =========================================
// BACK TO TOP
// =========================================

if (backToTopButton) {

    backToTopButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// =========================================
// ESCAPE KEY SUPPORT
// =========================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        if (navMenu && menuToggle) {

            navMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    }

});


// =========================================
// EXTERNAL LINK SAFETY
// =========================================

const externalLinks = document.querySelectorAll(
    'a[target="_blank"]'
);

externalLinks.forEach((link) => {

    link.setAttribute("rel", "noopener noreferrer");

});


// =========================================
// CONSOLE MESSAGE
// =========================================

console.log(
    "Aseefa Portfolio loaded successfully."
);

console.log(
    "Learning today. Building tomorrow."
);