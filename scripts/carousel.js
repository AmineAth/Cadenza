class HeaderCarousel {
    // Class fields for default state
    currentSlide = 0;
    interval = null;

    // Slides as a class field
    slides = [
        {
            image: '/images/header1.webp',
            title: 'BE THE FIRST',
            subtitle: 'Satisfy your top obsession with the range of new arrivals'
        },
        {
            image: '/images/header2.webp',
            title: 'NEW COLLECTION',
            subtitle: 'Discover our latest arrivals for the season'
        },
        {
            image: '/images/header3.webp',
            title: 'TRENDING NOW',
            subtitle: 'Shop the most wanted items of the week'
        }
    ];

    // Constructor does minimal setup
    constructor() {
        this.header = document.querySelector('#header');
        this.setupEventListeners();
        this.showSlide(0);
        this.startAutoSlide();
    }

    // Setup event listeners
    setupEventListeners() {
        const nav = document.createElement('div');
        nav.className = 'carousel-nav';
        
        const dotsHTML = this.slides.map((_, index) => `
            <div class="carousel-dot ${index === 0 ? 'active' : ''}">
                <span>${('⚪').toString().padStart(2)}</span>
            </div>
        `).join('');
        
        nav.innerHTML = dotsHTML;
        
        nav.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        this.header.appendChild(nav);
    }

    // Rest of the methods remain the same
    showSlide(index) {
        this.currentSlide = index;
        
        const imagePath = this.slides[index].image;
        this.header.style.backgroundImage = `url("${imagePath}")`;
        
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        const heroSection = document.querySelector('#hero-section');
        if(heroSection) {
            heroSection.classList.remove('active');
            setTimeout(() => {
                heroSection.innerHTML = `
                    <h2>${this.slides[index].title}</h2>
                    <h1>${this.slides[index].subtitle}</h1>
                    <button class="animated-button">
                        <span>View Collection</span>
                    </button>
                `;
                heroSection.classList.add('active');
            }, 300);
        }
    }

    goToSlide(index) {
        clearInterval(this.interval);
        this.showSlide(index);
        this.startAutoSlide();
    }

    startAutoSlide() {
        this.interval = setInterval(() => {
            const next = (this.currentSlide + 1) % this.slides.length;
            this.showSlide(next);
        }, 5000);
    }
}

// Use arrow function for more concise event listener
document.addEventListener('DOMContentLoaded', () => new HeaderCarousel());