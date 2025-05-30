"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/*
INITIALIZING:
1. Open your project directory in a terminal and run: git init. 
   This initializes a new Git repo in your project
2. Add project files to git and run: git add . 
   This stages all your project files for the first commit
3. Commit your changes and run: git commit -m "Initial commit"
   This commits your changes
4. Create a repo on Github (do not initialize with a Readmen)
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
