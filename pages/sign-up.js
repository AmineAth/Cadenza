
// ============================ promo header ============================
// get promo banner elements
let promoSwipeBack = document.getElementById('promo-swipe-back');
let promoSwipeNext = document.getElementById('promo-swipe-next');
let promoText = document.getElementById('promo-text');

// promo messages
const promoMessages = [
    "New Customers 10% off with WELCOME",
    "Free shipping on orders over $50!",
    "Buy one, get one free!",
    "Limited-time offer, don't miss out!"
];

// index of promo message
let currentIndex = 0;

// function to update the promo text
function updatePromoText() {
    // Slide out to left
    promoText.style.transform = 'translateX(-100%)';
    promoText.style.opacity = '0';
    promoText.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    
    // After slide out, update text and prepare to slide in from right
    setTimeout(() => {
        // Remove transition temporarily to instantly move to right side
        promoText.style.transition = 'none';
        promoText.textContent = promoMessages[currentIndex];
        promoText.style.transform = 'translateX(50%)';
        
        // Trigger reflow
        promoText.offsetHeight;
        
        // Re-add transition and slide in from right
        promoText.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        promoText.style.transform = 'translateX(0)';
        promoText.style.opacity = '1';
    }, 500);
}

// back button
promoSwipeBack.onclick = function(){
    currentIndex = (currentIndex - 1 + promoMessages.length) % promoMessages.length;
    updatePromoText();
}

// next button
promoSwipeNext.onclick = function() {
    currentIndex = (currentIndex + 1) % promoMessages.length;
    updatePromoText();
};

//auto swipe next
function autoSwipeNext() {
    setInterval(function() {
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
      imagePath: "../images/cart-item1.png",
      color: "Gray",
      size: "S",
      quantity: 1,
      price: "79,00",
    },
    {
      name: "Shorte with back",
      imagePath: "../images/cart-item2.png",
      color: "Gray",
      size: "S",
      quantity: 1,
      price: "65,00",
    },
    {
      name: "Noya Slim Dress",
      imagePath: "../images/cart-item2.png",
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
                src="../icons/trash.png" 
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