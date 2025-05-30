"use strict";
const btnScrollTo = document.querySelector(".btn--scroll-to"); /*2a*/
const section1 = document.querySelector("#section--1"); /*2a*/
const modal = document.querySelector(".modal"); /*1a*/
const overlay = document.querySelector(".overlay"); /*1a*/
const btnCloseModal = document.querySelector(".btn--close-modal"); /*1a*/
const btnsOpenModal = document.querySelectorAll(".btn--show-modal"); /*1a*/
const nav = document.querySelector(".nav"); /*4a*/
const tabs = document.querySelectorAll(".operations__tab"); /*3a*/
const tabsContainer = document.querySelector(
  ".operations__tab-container"
); /*3b*/
const tabsContent = document.querySelectorAll(".operations__content"); /*3c*/
///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}; /*1b*/

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}; /*1c*/

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal)); /*1d*/
btnCloseModal.addEventListener("click", closeModal); /*1d*/
overlay.addEventListener("click", closeModal); /*1d*/

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
}); /*1e(end)*/

// Button scrolling
btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect(); /*2b*/
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log(window.scrollX, window.scrollY);

  console.log(
    "height/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  //   window.scrollTo({
  //     left: s1coords.left + window.scrollX,
  //     top: s1coords.top + window.scrollY,
  //     behavior: "smooth",
  //   }); /*2c old way*/

  section1.scrollIntoView({ behavior: "smooth" }); /*2d(end) new way*/
});

// Page navigation
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// }); /*2e*/

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  //   Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
}); /*2f(end)*/

// Tabbed component

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  // Activate tab
  clicked.classList.add("operations__tab--active");

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
}) /*3d(end)*/;

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}; /*4b*/

// Passing "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5)); /*4c*/
nav.addEventListener("mouseout", handleHover.bind(1)); /*4d(end)*/

// Sticky navigation: Intersection Observer API
const header = document.querySelector(".header"); /*5a*/
const navHeight = nav.getBoundingClientRect().height; /*5b*/

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
}; /*5c*/

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
}); /*5d*/

headerObserver.observe(header); /*5e(end)*/

// Reveal sections
const allSections = document.querySelectorAll(".section"); /*6a*/

const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
}; /*6b*/

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
}); /*6c*/

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
}); /*6d(end)*/

// Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]"); /*7a*/

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
}; /*7b*/

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
}); /*7c*/

imgTargets.forEach((img) => imgObserver.observe(img)); /*7d(end)*/

// Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide"); /*8a*/
  const btnLeft = document.querySelector(".slider__btn--left"); /*8a*/
  const btnRight = document.querySelector(".slider__btn--right"); /*8a*/
  const dotContainer = document.querySelector(".dots"); /*8a*/

  let curSlide = 0; /*8b*/
  const maxSlide = slides.length; /*8b*/

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  }; /*8c*/

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  }; /*8d*/

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  }; /*8e*/

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  }; /*8f*/

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  }; /*8g*/

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  }; /*8h*/

  init(); /*8i*/

  // Event handlers
  btnRight.addEventListener("click", nextSlide); /*8j*/
  btnLeft.addEventListener("click", prevSlide); /*8j*/

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  }); /*8k*/

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      // BUG in v2: This way, we're not keeping track of the current slide when clicking on a slide
      // const { slide } = e.target.dataset;

      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  }); /*8l*/
};

slider(); /*8m*/

// 0. Start
// XX.(end) FINISH!!!

/*
INITIALIZING:
1. Open your project directory in a terminal and run: git init. 
   This initializes a new Git repo in your project
2. Add project files to git and run: git add . 
   This stages all your project files for the first commit
3. Commit your changes and run: git commit -m "Initial commit"
   This commits your changes
4. Create a repo on Github (do not initialize with a Readme)
5. Link your local repo to Github and run the following:
   git remote add origin https://github.com/Meirambeksm/pizza.git
   git branch -M main
   git push -u origin main
*/

/*
Push Future Changes:
git add .
git commit -m "Describe your changes"
git push
*/

/*
git clone https://github.com/Meirambeksm/pizza.git
*/
