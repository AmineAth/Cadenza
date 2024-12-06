
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

document.addEventListener('DOMContentLoaded', () => {
  
    // Collection data
    const collections = [
      {
        title: 'TopShop',
        image: '../images/topShop.png'
      },
      {
        title: 'Lingerie',
        image: '../images/lingerie.jpg'
      },
      {
        title: 'TopShop',
        image: '../images/topShop2.png'
      },
      {
        title: 'Bottom',
        image: '../images/bottom.jpg'
      },
      {
        title: 'Activewear',
        image: '../images/activeWear.jpg'
      },
      {
        title: 'Winter',
        image: '../images/winter.jpg'
      }
    ];
  
    // Mobile menu toggle
    const menuIcon = document.getElementById('menu-icon');
    const menuLinks = document.getElementById('menu-links');
  
    menuIcon?.addEventListener('click', () => {
      menuLinks.classList.toggle('active');
    });
  
    // Create mega dropdown for New Arrivals
    const newArrivalsLink = document.querySelector('a[href="#new-arrivals"]');
    if (newArrivalsLink) {
      const megaDropdown = document.createElement('div');
      megaDropdown.className = 'mega-dropdown';
      
      const content = document.createElement('div');
      content.className = 'dropdown-content';
      
      Object.entries(megaMenuContent).forEach(([columnTitle, links]) => {
        const column = document.createElement('div');
        column.className = 'column';
        
        const title = document.createElement('h3');
        title.textContent = columnTitle;
        column.appendChild(title);
        
        const ul = document.createElement('ul');
        links.forEach(linkText => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = '#';
          a.textContent = linkText;
          li.appendChild(a);
          ul.appendChild(li);
        });
        
        column.appendChild(ul);
        content.appendChild(column);
      });
      
      megaDropdown.appendChild(content);
      document.querySelector('.navbar').appendChild(megaDropdown);
      
      // Toggle mega dropdown on hover
      newArrivalsLink.parentElement.addEventListener('mouseenter', () => {
        hideAllDropdowns();
        megaDropdown.classList.add('show');
      });
    }
  
    // Create collection dropdown
    const collectionLink = document.querySelector('a[href="#collection"]');
    if (collectionLink) {
      const collectionDropdown = document.createElement('div');
      collectionDropdown.className = 'collection-dropdown';
      
      const grid = document.createElement('div');
      grid.className = 'collection-grid';
      
      collections.forEach(collection => {
        const item = document.createElement('div');
        item.className = 'collection-item';
        
        const img = document.createElement('img');
        img.src = collection.image;
        img.alt = collection.title;
        
        const title = document.createElement('div');
        title.className = 'collection-title';
        title.textContent = collection.title;
        
        item.appendChild(img);
        item.appendChild(title);
        grid.appendChild(item);
        
        item.addEventListener('click', () => {
          window.location.href = `/collection/${collection.title.toLowerCase()}`;
        });
      });
      
      collectionDropdown.appendChild(grid);
      document.querySelector('.navbar').appendChild(collectionDropdown);
      
      // Toggle collection dropdown on hover
      collectionLink.parentElement.addEventListener('mouseenter', () => {
        hideAllDropdowns();
        collectionDropdown.classList.add('show');
      });
    }
  
    // Hide all dropdowns function
    function hideAllDropdowns() {
      document.querySelectorAll('.mega-dropdown, .collection-dropdown').forEach(dropdown => {
        dropdown.classList.remove('show');
      });
    }
  
    // Handle mouse leave for navbar
    document.querySelector('.navbar').addEventListener('mouseleave', hideAllDropdowns);
  });




  // fixing navbar after 42px scroll

  window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar') 
    if (window.scrollY > 42) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')  
    }
  });



  // Define the navigation items with bold styling for left menu
const navigationItems = [
  { title: 'New Arrivals', isBold: true },
  { title: 'Top Sellings', isBold: true },
  { title: 'Trendigs Tops', isBold: true },
  { title: 'Latest Fashion', isBold: true }
];

// Mega menu content for all sections
const megaMenuContent = {
  'New Arrivals': ['Samantha Activewear', 'Noya Slim Dress', 'Shorte with back', 'Jelna Split Dress'],
  'Top Sellings': ['Black Co-ord set', 'Denim Jean', 'High rise shorts with top', 'Samantha Activewear'],
  'Trendigs Tops': ['Jelna Split Dress', 'Noya Slim Dress', 'Samantha Activewear', 'Twilight Whisper Skirt'],
  'Latest Fashion': ['Contact Information', 'Terms of Service', 'Privacy Policy / GDPR', 'Cookie Policy']
};

// Create mega dropdown menu
function createMegaMenu() {
  const navbar = document.querySelector('.navbar');
  
  // Create the main mega dropdown container
  const megaDropdown = document.createElement('div');
  megaDropdown.className = 'mega-dropdown';
  
  // Create the content wrapper
  const content = document.createElement('div');
  content.className = 'mega-dropdown-content';
  
  // Create left navigation column
  const leftNav = document.createElement('div');
  leftNav.className = 'left-navigation';
  
  navigationItems.forEach(item => {
    const navItem = document.createElement('a');
    navItem.href = '#';
    navItem.textContent = item.title;
    if (item.isBold) {
      navItem.style.fontWeight = 'bold';
    }
    leftNav.appendChild(navItem);
  });
  
  // Create content columns
  const columnsContainer = document.createElement('div');
  columnsContainer.className = 'content-columns';
  
  Object.entries(megaMenuContent).forEach(([columnTitle, links]) => {
    const column = document.createElement('div');
    column.className = 'menu-column';
    
    const title = document.createElement('h3');
    title.textContent = columnTitle;
    column.appendChild(title);
    
    const ul = document.createElement('ul');
    links.forEach(linkText => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = linkText;
      li.appendChild(a);
      ul.appendChild(li);
    });
    
    column.appendChild(ul);
    columnsContainer.appendChild(column);
  });
  
  // Assemble the mega dropdown
  content.appendChild(leftNav);
  content.appendChild(columnsContainer);
  megaDropdown.appendChild(content);
  navbar.appendChild(megaDropdown);
  
  // Add corresponding CSS
  const style = document.createElement('style');
  style.textContent = `
    .mega-dropdown {
      display: none;
      position: absolute;
      width: 100%;
      left: 0;
      background: white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      z-index: 1000;
    }
    
    .mega-dropdown-content {
      display: flex;
      padding: 0 5%;
      max-width:1400px
      margin: 0 auto;
    }
    
    .left-navigation {
      width: 200px;
      padding-right: 20px;
    }
    
    .left-navigation a {
      display: block;
      padding: 10px 0;
      font-size:20px;
      color: #333;
      text-decoration: none;
    }
    
    .content-columns {
      display: flex;
      flex: 1;
      padding-left: 20px;
    }
    
    .menu-column {
      flex: 1;
      padding: 10px 15px;
    }
    
    .menu-column h3 {
      margin: 0 0 15px 0;
      font-size: 20px;
      color: #333;
    }
    
    .menu-column ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .menu-column li {
      margin-bottom: 10px;
    }
    
    .menu-column a {
      color: #666;
      text-decoration: none;
      font-size: 16px;
    }
    
    .menu-column a:hover {
      color: #000;
    }
    
    .show {
      display: block;
    }
  `;
  
  document.head.appendChild(style);
  
  // Add event listeners
  const newArrivalsLink = document.querySelector('a[href="#new-arrivals"]');
  if (newArrivalsLink) {
    newArrivalsLink.parentElement.addEventListener('mouseenter', () => {
      megaDropdown.classList.add('show');
    });
    
    megaDropdown.addEventListener('mouseleave', () => {
      megaDropdown.classList.remove('show');
    });
  }
}

// Initialize the mega menu
document.addEventListener('DOMContentLoaded', createMegaMenu);