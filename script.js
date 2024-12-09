// ============================ promo header ============================
// get promo banner elements
let promoSwipeBack = document.getElementById("promo-swipe-back");
let promoSwipeNext = document.getElementById("promo-swipe-next");
let promoText = document.getElementById("promo-text");

// promo messages
const promoMessages = [
  "New Customers 10% off with WELCOME",
  "Free shipping on orders over $50!",
  "Buy one, get one free!",
  "Limited-time offer, don't miss out!",
];

// index of promo message
let currentIndex = 0;

// function to update the promo text
function updatePromoText() {
  // Slide out to left
  promoText.style.transform = "translateX(-100%)";
  promoText.style.opacity = "0";
  promoText.style.transition = "transform 0.5s ease, opacity 0.5s ease";

  // After slide out, update text and prepare to slide in from right
  setTimeout(() => {
    // Remove transition temporarily to instantly move to right side
    promoText.style.transition = "none";
    promoText.textContent = promoMessages[currentIndex];
    promoText.style.transform = "translateX(50%)";

    // Trigger reflow
    promoText.offsetHeight;

    // Re-add transition and slide in from right
    promoText.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    promoText.style.transform = "translateX(0)";
    promoText.style.opacity = "1";
  }, 500);
}

// back button
promoSwipeBack.onclick = function () {
  currentIndex =
    (currentIndex - 1 + promoMessages.length) % promoMessages.length;
  updatePromoText();
};

// next button
promoSwipeNext.onclick = function () {
  currentIndex = (currentIndex + 1) % promoMessages.length;
  updatePromoText();
};

//auto swipe next
function autoSwipeNext() {
  setInterval(function () {
    currentIndex = (currentIndex + 1) % promoMessages.length;
    updatePromoText();
  }, 4000);
}

autoSwipeNext();

// ====================================== Navbar menu   ======================================================

document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menu-icon");
  const menuLinks = document.getElementById("menu-links");

  menuIcon?.addEventListener("click", () => {
    menuLinks.classList.toggle("active");
  });

  function hideAllDropdowns() {
    document
      .querySelectorAll(".mega-dropdown, .collection-dropdown")
      .forEach((dropdown) => {
        dropdown.classList.remove("show");
      });
  }

  const navbar = document.querySelector(".navbar");
  navbar.addEventListener("mouseleave", hideAllDropdowns);

  const newArrivalsLink = document.querySelector('a[href="#new-arrivals"]');
  const collectionLink = document.querySelector('a[href="#collection"]');

  newArrivalsLink?.parentElement.addEventListener("mouseenter", () => {
    hideAllDropdowns();
    document.querySelector(".mega-dropdown").classList.add("show");
  });

  collectionLink?.parentElement.addEventListener("mouseenter", () => {
    hideAllDropdowns();
    document.querySelector(".collection-dropdown").classList.add("show");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.querySelector('.icons-container a[href="#"]');
  const newArrivalsLink = document.querySelector('a[href="#new-arrivals"]');
  const collectionLink = document.querySelector('a[href="#collection"]');

  const searchCard = document.querySelector(".search-card");

  function hideSearchCard() {
    searchCard.classList.add("hidden");
  }

  searchIcon.addEventListener("mouseenter", () => {
    // Hide other dropdowns when search card opens
    document
      .querySelectorAll(".mega-dropdown, .collection-dropdown")
      .forEach((dropdown) => {
        dropdown.classList.remove("show");
      });
    searchCard.classList.remove("hidden");
  });

  // Hide search card when other dropdowns open
  newArrivalsLink?.parentElement.addEventListener("mouseenter", hideSearchCard);
  collectionLink?.parentElement.addEventListener("mouseenter", hideSearchCard);

  // Hide dropdowns only when leaving entire area
  document.querySelector(".navbar").addEventListener("mouseleave", () => {
    searchCard.classList.add("hidden");
  });

  document.addEventListener("click", (event) => {
    if (!searchCard.contains(event.target) && event.target !== searchIcon) {
      searchCard.classList.add("hidden");
    }
  });
});

// fix the navbar after 42 pixels
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 42) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
// Select all necessary elements
const searchDots = document.querySelectorAll(".search-card .dot");
const searchCardsDiv = document.querySelector(".search-card .cards-div");

const cartDots = document.querySelectorAll(".filled-cart .dot");
const cartCardsDiv = document.querySelector(".filled-cart .cards-div");

// Define constants
const cardWidth = 321;
const gap = parseInt(getComputedStyle(searchCardsDiv).gap) || 0;
const scrollAmount = cardWidth + gap;

// Scroll function for a specific container
function scrollCards(container, index) {
  const scrollPosition = index * scrollAmount;

  container.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });
}

// Update active dots for a specific set
function updateActiveDots(dots, activeIndex) {
  dots.forEach((dot, index) => {
    if (index === activeIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

// Handle dot clicks for search
searchDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    scrollCards(searchCardsDiv, index);
    updateActiveDots(searchDots, index);
  });
});

// Handle dot clicks for cart
cartDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    scrollCards(cartCardsDiv, index);
    updateActiveDots(cartDots, index);
  });
});

// Handle scroll events for search
searchCardsDiv.addEventListener("scroll", () => {
  const activeIndex = Math.round(searchCardsDiv.scrollLeft / scrollAmount);
  updateActiveDots(searchDots, activeIndex);
});

// Handle scroll events for cart
cartCardsDiv.addEventListener("scroll", () => {
  const activeIndex = Math.round(cartCardsDiv.scrollLeft / scrollAmount);
  updateActiveDots(cartDots, activeIndex);
});

// Initialize active dots
updateActiveDots(searchDots, 0);
updateActiveDots(cartDots, 0);


// navbar's bag
document.addEventListener("DOMContentLoaded", () => {
  const bagIcon = document.querySelector(
    '.icons-container a[href="#"] img[alt="Bag"]'
  );
  const cartDiv = document.querySelector(".cart-div");
  const emptyCartDiv = document.querySelector(".empty-cart");
  const filledCartDiv = document.querySelector(".filled-cart");
  const navbar = document.querySelector(".navbar");
  const searchIcon = document.querySelector('.icons-container a[href="#"]');
  const newArrivalsLink = document.querySelector('a[href="#new-arrivals"]');
  const collectionLink = document.querySelector('a[href="#collection"]');

  let cartItems = [
    {
      name: "Samantha Activewear",
      imagePath: "./images/cart-item1.png",
      color: "Gray",
      size: "S",
      quantity: 1,
      price: "79,00",
    },
    {
      name: "Shorte with back",
      imagePath: "./images/cart-item2.png",
      color: "Gray",
      size: "S",
      quantity: 1,
      price: "65,00",
    },
    {
      name: "Noya Slim Dress",
      imagePath: "./images/cart-item2.png",
      color: "Gray",
      size: "S",
      quantity: 1,
      price: "65,00",
    },
  ];

  function renderScrollItems() {
    const scrollDiv = document.querySelector(".items-scroll");
    scrollDiv.innerHTML = "";

    cartItems.forEach((item, index) => {
      const scrollItemDiv = document.createElement("div");
      scrollItemDiv.className = "scroll-item";

      scrollItemDiv.innerHTML = `
        <span>
          <img src="${item.imagePath}" alt="Product Image">
          <aside>
            <h1>${item.name}
              <img 
                src="./icons/trash.png" 
                alt="Remove" 
                class="trash-icon" 
                data-index="${index}"
              >
            </h1>
            <p>Color - ${item.color}</p>
            <p>Size - ${item.size}</p>
            <h3>
              <span class="quantity-control">+</span>${item.quantity}<span class="quantity-control">-</span>
              <span class="price">${item.price}$</span>
            </h3>
          </aside>
        </span>
      `;

      scrollDiv.appendChild(scrollItemDiv);
    });

    attachTrashListeners();
  }

  function attachTrashListeners() {
    const trashIcons = document.querySelectorAll(".trash-icon");
    trashIcons.forEach((icon) => {
      icon.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent event from bubbling up
        const index = event.target.dataset.index;
        removeCartItem(index);
      });
    });
  }

  function removeCartItem(index) {
    cartItems.splice(index, 1);
    updateCartView();
  }

  function showCart() {
    document
      .querySelectorAll(".mega-dropdown, .collection-dropdown, .search-card")
      .forEach((dropdown) => {
        dropdown.classList.remove("show");
        dropdown.classList.add("hidden");
      });
    cartDiv.classList.add("visible");
  }

  function hideCart() {
    cartDiv.classList.remove("visible");
  }

  bagIcon.addEventListener("mouseenter", showCart);
  navbar.addEventListener("mouseleave", hideCart);
  newArrivalsLink?.parentElement.addEventListener("mouseenter", hideCart);
  collectionLink?.parentElement.addEventListener("mouseenter", hideCart);
  searchIcon.addEventListener("mouseenter", hideCart);

  document.addEventListener("click", (event) => {
    if (
      !cartDiv.contains(event.target) &&
      !bagIcon.contains(event.target) &&
      !navbar.contains(event.target)
    ) {
      hideCart();
    }
  });

  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", hideCart);
  });

  function updateCartView() {
    if (cartItems.length === 0) {
      emptyCartDiv.classList.remove("hidden");
      filledCartDiv.classList.add("hidden");
    } else {
      emptyCartDiv.classList.add("hidden");
      filledCartDiv.classList.remove("hidden");
      renderScrollItems();
    }
  }

  updateCartView();
});

// ==================== COLLECTION MOREE =====================================================================

// Add this JavaScript to make it work
document.querySelectorAll(".accordion-header").forEach((button) => {
  button.addEventListener("click", () => {
    const accordionItem = button.parentElement;
    accordionItem.classList.toggle("active");
  });
});

// ========== Best Seller =================================
function toggleLike(imgElement) {
  // Check if the clicked element is an image
  if (imgElement.tagName === "IMG") {
    // Toggle the image source based on the current src
    if (imgElement.src.includes("empty-like.png")) {
      imgElement.src = "./icons/filled-like.png"; // Change to filled-like
    } else {
      imgElement.src = "./icons/empty-like.png"; // Change to empty-like
    }
  }
}

// ========== FAQ =================================

document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Close other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      item.classList.toggle("active");
    });
  });
});

// =========== desktop content =============================
document.addEventListener("DOMContentLoaded", () => {
  const desktopContent = document.querySelector(".desktop-content");

  if (!desktopContent) return; // Ensure the parent container exists

  const contentData = {
    2020: {
      title: "A Bold Beginning",
      introText:
        "2020 was the year that marked the birth of our dream. Despite the challenges, we laid the foundation for a fashion brand driven by passion and creativity.",
      mainImage: "./images/2020-main.avif",
      mainImageTitle: "First Step",
      mainImageDate: "01/01/2020",
      sideImage: "./images/2020-side.avif",
      closingText:
        "The year was all about starting small, dreaming big, and setting the tone for a journey that would redefine modern fashion.",
    },
    2021: {
      title: "A Year of Growth",
      introText:
        "2021 was a defining year for us. Our designs reached new audiences, and we embraced the challenge of growing our collection and expanding our vision.",
      mainImage: "./images/2021-main.avif",
      mainImageTitle: "Building",
      mainImageDate: "15/06/2021",
      sideImage: "./images/2021-side.avif",
      closingText:
        "With every milestone we achieved, we gained the confidence to push boundaries and inspire creativity in all our endeavors.",
    },
    2022: {
      title: "Opening Doors",
      introText:
        "2022 was a monumental year as we officially opened our doors to the world. This marked the start of a deeper connection with our customers and the realization of a long-held dream.",
      mainImage: "./images/2022-main.jpg",
      mainImageTitle: "Cadenza",
      mainImageDate: "05/03/2022",
      sideImage: "./images/2022-side.png",
      closingText:
        "The grand opening was more than an event—it was the beginning of a community built on shared love for fashion and innovation.",
    },
    2023: {
      title: "A Collaborative Breakthrough",
      introText:
        "2023 brought our first collaboration, a milestone that blended unique visions and showcased the power of creative partnerships.",
      mainImage: "./images/2023-main.avif",
      mainImageTitle: "Creative",
      mainImageDate: "25/08/2023",
      sideImage: "./images/2023-side.avif",
      closingText:
        "This collaboration was not just about creating fashion—it was about creating memories, strengthening bonds, and setting a new benchmark for the future.",
    },
    2024: {
      title: "First collaboration",
      introText:
        "On this momentous day, we celebrated our very first collaboration, marking a significant milestone in our journey. Partnering with Cadenza, we fused our distinct styles and visions to create something truly special. This collaboration not only broadened our creative horizons but also allowed us to connect with a wider community of fashion lovers.",
      mainImage: "./images/2024-main.png",
      mainImageTitle: "Collaboration",
      mainImageDate: "Rocan",
      sideImage: "./images/2024-side.png",
      closingText:
        "The excitement in the air was palpable as we unveiled our joint collection, showcasing innovative designs that reflected our shared passion for fashion. This partnership opened new doors and set the stage for future collaborations, reinforcing our commitment to creativity and collaboration in the ever-evolving fashion landscape.",
    },
  };

  const yearElements = desktopContent.querySelectorAll(".year");
  const imagesContent = desktopContent.querySelector(".images-content");
  const titleElement = desktopContent.querySelector(".left h1");
  const introTextElement = desktopContent.querySelector(".left p");
  const mainImageElement = desktopContent.querySelector(".left img");
  const mainImageTitleElement = desktopContent.querySelector(".left h3");
  const mainImageDateElement = desktopContent.querySelector(".left h6");
  const sideImageElement = desktopContent.querySelector(".right img");
  const closingTextElement = desktopContent.querySelector(".right p");
  const prevButton = desktopContent.querySelector(
    '.arrow-btn[data-direction="prev"]'
  );
  const nextButton = desktopContent.querySelector(
    '.arrow-btn[data-direction="next"]'
  );

  let currentYearIndex = Array.from(yearElements).findIndex((el) =>
    el.classList.contains("active")
  );

  // Function to update the content with animations
  function updateContentWithAnimation(year) {
    // Add fade-out class
    imagesContent.classList.add("fade-out");

    // Wait for the fade-out animation to complete
    setTimeout(() => {
      // Update the content
      const data = contentData[year];
      titleElement.textContent = data.title;
      introTextElement.textContent = data.introText;
      mainImageElement.src = data.mainImage;
      mainImageTitleElement.textContent = data.mainImageTitle;
      mainImageDateElement.textContent = data.mainImageDate;
      sideImageElement.src = data.sideImage;
      closingTextElement.textContent = data.closingText;

      // Remove fade-out and add fade-in class
      imagesContent.classList.remove("fade-out");
      imagesContent.classList.add("fade-in");

      // Remove fade-in class after the animation ends
      setTimeout(() => {
        imagesContent.classList.remove("fade-in");
      }, 500); // Match the CSS animation duration
    }, 500); // Match the CSS animation duration
  }

  // Function to change the active year
  function changeActiveYear(newIndex) {
    yearElements[currentYearIndex]?.classList.remove("active");
    yearElements[newIndex]?.classList.add("active");
    currentYearIndex = newIndex;

    const selectedYear = yearElements[newIndex].dataset.year;
    updateContentWithAnimation(selectedYear);
  }

  // Event listener for year clicks
  yearElements.forEach((yearElement, index) => {
    yearElement.addEventListener("click", () => {
      changeActiveYear(index);
    });
  });

  // Event listeners for navigation buttons
  prevButton.addEventListener("click", () => {
    if (currentYearIndex > 0) {
      changeActiveYear(currentYearIndex - 1);
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentYearIndex < yearElements.length - 1) {
      changeActiveYear(currentYearIndex + 1);
    }
  });

  // Initialize the content with the active year
  const initialYear = yearElements[currentYearIndex]?.dataset.year;
  if (initialYear) {
    updateContentWithAnimation(initialYear);
  }
});
