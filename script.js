// ---------------- Mobile navigation ----------------
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", function () {
  const menuIsOpen = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!menuIsOpen));
  navMenu.classList.toggle("is-open");
});

// Close the mobile menu after choosing a link.
document.querySelectorAll(".nav-links a").forEach(function (link) {
  link.addEventListener("click", function () {
    navMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ---------------- Hero slider ----------------
const sliderTrack = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const sliderDots = document.querySelectorAll(".slider-dot");
const previousSlideButton = document.querySelector(".slider-prev");
const nextSlideButton = document.querySelector(".slider-next");

let currentSlide = 0;
let sliderTimer;

function showSlide(slideNumber) {
  currentSlide = (slideNumber + slides.length) % slides.length;

  sliderTrack.style.transform = `translateX(-${currentSlide * (100 / slides.length)}%)`;

  sliderDots.forEach(function (dot, index) {
    dot.classList.toggle("active", index === currentSlide);
    dot.setAttribute("aria-pressed", String(index === currentSlide));
  });
}

function startSlider() {
  sliderTimer = setInterval(function () {
    showSlide(currentSlide + 1);
  }, 5000);
}

function resetSliderTimer() {
  clearInterval(sliderTimer);
  startSlider();
}

previousSlideButton.addEventListener("click", function () {
  showSlide(currentSlide - 1);
  resetSliderTimer();
});

nextSlideButton.addEventListener("click", function () {
  showSlide(currentSlide + 1);
  resetSliderTimer();
});

sliderDots.forEach(function (dot, index) {
  dot.addEventListener("click", function () {
    showSlide(index);
    resetSliderTimer();
  });
});

const sliderContainer = document.querySelector(".slider-container");

sliderContainer.addEventListener("mouseenter", function () {
  clearInterval(sliderTimer);
});

sliderContainer.addEventListener("mouseleave", function () {
  startSlider();
});

showSlide(0);
startSlider();

// ---------------- Add to cart ----------------
// This is a front-end demo cart counter. It does not process real orders.
let cartCount = 0;
const cartCountLabel = document.querySelector("#cart-count");
const toastMessage = document.querySelector("#toast-message");
let toastTimer;

function showToast(message) {
  toastMessage.textContent = message;
  toastMessage.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toastMessage.classList.remove("show");
  }, 2500);
}

document.querySelectorAll(".add-to-cart-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    const productName = button.dataset.product;

    cartCount += 1;
    cartCountLabel.textContent = cartCount;

    showToast(productName + " added to your demo cart.");
  });
});

// ---------------- Wishlist buttons ----------------
document.querySelectorAll(".wishlist-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    const isSaved = button.classList.toggle("is-active");
    const icon = button.querySelector("i");

    button.setAttribute("aria-pressed", String(isSaved));
    icon.classList.toggle("fa-solid", isSaved);
    icon.classList.toggle("fa-regular", !isSaved);

    showToast(isSaved ? "Added to your wishlist." : "Removed from your wishlist.");
  });
});

// ---------------- Quick view popup ----------------
const quickViewModal = document.querySelector("#quick-view-modal");
const modalImage = document.querySelector(".modal-image");
const modalTitle = document.querySelector("#modal-title");
const modalPrice = document.querySelector(".modal-price");
const modalClose = document.querySelector(".modal-close");

document.querySelectorAll(".quick-view-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    const productCard = button.closest(".product-card");
    const productImage = productCard.querySelector(".product-img-box img");
    const productName = productCard.dataset.name;
    const productPrice = productCard.querySelector(".new-price").textContent;

    modalImage.src = productImage.src;
    modalImage.alt = productImage.alt;
    modalTitle.textContent = productName;
    modalPrice.textContent = productPrice;

    quickViewModal.classList.add("is-open");
    quickViewModal.setAttribute("aria-hidden", "false");
  });
});

function closeQuickView() {
  quickViewModal.classList.remove("is-open");
  quickViewModal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeQuickView);
quickViewModal.querySelector(".modal-backdrop").addEventListener("click", closeQuickView);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeQuickView();
  }
});

// ---------------- Product search ----------------
const searchToggle = document.querySelector(".search-toggle");
const searchPanel = document.querySelector("#search-panel");
const productSearch = document.querySelector("#product-search");
const clearSearchButton = document.querySelector(".clear-search");
const allProductCards = document.querySelectorAll(".product-card");
const noResultsMessage = document.querySelector("#no-results");

searchToggle.addEventListener("click", function () {
  searchPanel.classList.toggle("is-open");

  if (searchPanel.classList.contains("is-open")) {
    productSearch.focus();
  }
});

function filterProducts() {
  const searchText = productSearch.value.trim().toLowerCase();
  let visibleProducts = 0;

  allProductCards.forEach(function (card) {
    const productName = card.dataset.name.toLowerCase();
    const matchesSearch = productName.includes(searchText);

    card.hidden = !matchesSearch;

    if (matchesSearch) {
      visibleProducts += 1;
    }
  });

  noResultsMessage.hidden = visibleProducts !== 0 || searchText === "";
}

productSearch.addEventListener("input", filterProducts);

clearSearchButton.addEventListener("click", function () {
  productSearch.value = "";
  filterProducts();
  productSearch.focus();
});

// ---------------- Trending products arrows ----------------
const trendingGrid = document.querySelector(".trending-grid");

document.querySelector(".trending-prev").addEventListener("click", function () {
  trendingGrid.scrollBy({ left: -280, behavior: "smooth" });
});

document.querySelector(".trending-next").addEventListener("click", function () {
  trendingGrid.scrollBy({ left: 280, behavior: "smooth" });
});

// ---------------- Newsletter demo form ----------------
const newsletterForm = document.querySelector(".newsletter-form");
const newsletterMessage = document.querySelector(".newsletter-message");

newsletterForm.addEventListener("submit", function (event) {
  event.preventDefault();

  newsletterMessage.textContent =
    "Thanks! This demo form is not connected to an email service yet.";

  newsletterForm.reset();
});

// ---------------- Back to top and footer year ----------------
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", function () {
  if (window.scrollY > 450) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector("#year").textContent = new Date().getFullYear();
