/* =========================================================
   EMANDULO HOUSE OF CULTURE
   CLEAN INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =========================================================
     SERVICE ANIMATION STAGGER
  ========================================================= */

  const serviceRows = document.querySelectorAll(".editorial-service");

  serviceRows.forEach((row, index) => {

    row.setAttribute("data-aos", "fade-up");

    row.setAttribute(
      "data-aos-delay",
      reducedMotion ? "0" : String(index * 70)
    );

  });


  /* =========================================================
     AOS
  ========================================================= */

  if (typeof AOS !== "undefined") {

    AOS.init({
      duration: reducedMotion ? 0 : 800,
      easing: "ease-out-cubic",
      once: true,
      mirror: false,
      offset: 35,
      anchorPlacement: "top-bottom"
    });

  }


  /* =========================================================
     FULLSCREEN MENU
  ========================================================= */

  const menu = document.getElementById("fullscreenMenu");
  const openButton = document.querySelector(".menu-toggle-btn");
  const closeButton = document.getElementById("closeMenuBtn");
  const menuLinks = document.querySelectorAll(".menu-link");

  let closeTimer;


  function openMenu() {

    if (!menu) return;

    clearTimeout(closeTimer);

    menu.style.display = "block";

    document.body.classList.add("menu-open");

    if (openButton) {
      openButton.setAttribute("aria-expanded", "true");
    }

    requestAnimationFrame(() => {

      requestAnimationFrame(() => {
        menu.classList.add("active");
      });

    });

  }


  function closeMenu() {

    if (!menu) return;

    menu.classList.remove("active");

    document.body.classList.remove("menu-open");

    if (openButton) {
      openButton.setAttribute("aria-expanded", "false");
    }

    closeTimer = setTimeout(() => {

      if (!menu.classList.contains("active")) {
        menu.style.display = "none";
      }

    }, reducedMotion ? 0 : 900);

  }


  openButton?.addEventListener("click", openMenu);
  closeButton?.addEventListener("click", closeMenu);


  function resetMenu() {

    if (!menu) return;

    clearTimeout(closeTimer);
    menu.classList.remove("active");
    menu.style.display = "none";
    document.body.classList.remove("menu-open");
    openButton?.setAttribute("aria-expanded", "false");

  }


  window.addEventListener("pageshow", resetMenu);


  menuLinks.forEach((link) => {

    const href = link.getAttribute("href");

    // Page links such as services.html use the browser's native navigation.
    // Only in-page hash links need the menu-closing behavior here.
    if (href?.startsWith("#")) {
      link.addEventListener("click", closeMenu);
    }

  });


  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      menu?.classList.contains("active")
    ) {
      closeMenu();
    }

  });


  /* =========================================================
     SMOOTH INTERNAL LINKS
  ========================================================= */

  document
    .querySelectorAll('a[href^="#"]:not([href="#"])')
    .forEach((link) => {

      link.addEventListener("click", (event) => {

        const selector = link.getAttribute("href");
        const destination = document.querySelector(selector);

        if (!destination) return;

        event.preventDefault();

        setTimeout(() => {

          destination.scrollIntoView({
            behavior: reducedMotion ? "auto" : "smooth",
            block: "start"
          });

        }, link.classList.contains("menu-link") ? 180 : 0);

      });

    });


  /* =========================================================
     WORK SWIPER
  ========================================================= */

  const workSlider = document.querySelector(".worksSwiper");

  if (
    workSlider &&
    typeof Swiper !== "undefined"
  ) {

    new Swiper(workSlider, {

      slidesPerView: 1.05,
      spaceBetween: 18,

      speed: reducedMotion ? 0 : 800,

      grabCursor: true,
      loop: false,

      keyboard: {
        enabled: true,
        onlyInViewport: true
      },

      navigation: {
        nextEl: workSlider.querySelector(".swiper-button-next"),
        prevEl: workSlider.querySelector(".swiper-button-prev")
      },

      pagination: {
        el: workSlider.querySelector(".swiper-pagination"),
        clickable: true
      },

      breakpoints: {

        768: {
          slidesPerView: 1.4,
          spaceBetween: 24
        },

        992: {
          slidesPerView: 2.05,
          spaceBetween: 28
        },

        1400: {
          slidesPerView: 2.25,
          spaceBetween: 32
        }

      }

    });

  }


  /* =========================================================
     REFRESH AFTER IMAGES LOAD
  ========================================================= */

  window.addEventListener("load", () => {

    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }

  });

});
