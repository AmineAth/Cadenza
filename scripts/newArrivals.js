document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const backBtn = document.getElementById('back-button');
    const nextBtn = document.getElementById('next-button');
    const categoryLinks = document.querySelectorAll('.category-list a');
    const products = {
        'OUTWEARS': [
            { image: './images/outwears1.png', title: 'Winter Jacket', price: '150,00', fakePrice: '300,00' },
            { image: './images/outwears2.png', title: 'Leather Coat', price: '200,00', fakePrice: '400,00' },
            { image: './images/outwears3.png', title: 'Leather Coat', price: '200,00', fakePrice: '400,00' },
            { image: './images/outwears4.png', title: 'Leather Coat', price: '200,00', fakePrice: '400,00' },
            { image: './images/outwears5.png', title: 'Leather Coat', price: '200,00', fakePrice: '400,00' },
        ],
        'DRESSES': [
            { image: './images/dresses1.png', title: 'Samantha Activewear', price: '100,00', fakePrice: '200,00' },
            { image: './images/dresses2.png', title: 'Noya Slim Dress', price: '79,00', fakePrice: '160,00' },
            { image: './images/dresses3.png', title: 'Floral Dress', price: '80,00', fakePrice: '160,00' },
            { image: './images/dresses4.jpg', title: 'Floral Dress', price: '80,00', fakePrice: '160,00' },
            { image: './images/dresses5.webp', title: 'Floral Dress', price: '80,00', fakePrice: '160,00' },
            { image: './images/dresses6.webp', title: 'Floral Dress', price: '80,00', fakePrice: '160,00' },
        ],
        'SKIRT': [
            { image: './images/skirts1.png', title: 'Pencil Skirt', price: '50,00', fakePrice: '100,00' },
            { image: './images/skirts2.png', title: 'Pleated Skirt', price: '60,00', fakePrice: '120,00' },
            { image: './images/skirts3.png', title: 'Mini Skirt', price: '45,00', fakePrice: '90,00' },
            { image: './images/skirts4.png', title: 'Pencil Skirt', price: '50,00', fakePrice: '100,00' },
            { image: './images/skirts5.png', title: 'Pleated Skirt', price: '60,00', fakePrice: '120,00' },
        ],
        'BOTTOMS': [
            { image: './images/bottoms1.png', title: 'Jeans', price: '70,00', fakePrice: '140,00' },
            { image: './images/bottoms2.png', title: 'Chinos', price: '65,00', fakePrice: '130,00' },
            { image: './images/bottoms3.png', title: 'Wide Leg Pants', price: '80,00', fakePrice: '160,00' },
            { image: './images/bottoms4.png', title: 'Chinos', price: '65,00', fakePrice: '130,00' },
            { image: './images/bottoms5.png', title: 'Wide Leg Pants', price: '80,00', fakePrice: '160,00' },
        ],
        'SNEAKERS': [
            { image: './images/sneakers1.png', title: 'Classic Sneakers', price: '120,00', fakePrice: '240,00' },
            { image: './images/sneakers2.png', title: 'Running Shoes', price: '140,00', fakePrice: '280,00' },
            { image: './images/sneakers3.png', title: 'High Tops', price: '130,00', fakePrice: '260,00' },
            { image: './images/sneakers4.png', title: 'Running Shoes', price: '140,00', fakePrice: '280,00' },
            { image: './images/sneakers1.png', title: 'High Tops', price: '130,00', fakePrice: '260,00' },
        ],
        'GYM SUITS': [
            { image: './images/gymsuits1.png', title: 'Yoga Set', price: '100,00', fakePrice: '200,00' },
            { image: './images/gymsuits2.png', title: 'Training Set', price: '110,00', fakePrice: '220,00' },
            { image: './images/gymsuits3.png', title: 'Compression Suit', price: '120,00', fakePrice: '240,00' },
            { image: './images/gymsuits4.png', title: 'Training Set', price: '110,00', fakePrice: '220,00' },
            { image: './images/gymsuits5.png', title: 'Compression Suit', price: '120,00', fakePrice: '240,00' },
        ],
    };
    

    function createProductCard(product) {
        return `
            <div class="arrivals-card">
                <div class="img-container">
                <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="hover-overlay">
                    <div class="actions">
                        <button class="like-btn"><img src="./icons/empty-like.png" alt="Like" class="like-icon"></button>
                        <button class="search-btn"><img src="./icons/search-icon.png" alt="Search"></button>
                    </div>
                    <div class="options">
                        <div class="sizes">
                            <p>Size</p>
                            <div class="option-buttons">
                                <button>S</button>
                                <button>M</button>
                                <button>L</button>
                            </div>
                        </div>
                        <div class="colors">
                            <p>Color</p>
                            <div class="option-buttons">
                                <button style="background-color: #000;"></button>
                                <button style="background-color: #CB9274;"></button>
                                <button style="background-color: #4A90E2;"></button>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="card-info">
                    <p class="card-title">${product.title}</p>
                    <p class="card-price">${product.price}$ <span class="fake-price">${product.fakePrice}$</span></p>
                </div>
            </div>
        `;
    }

    function displayProducts(category) {
        const categoryProducts = products[category] || [];
        carouselContainer.innerHTML = categoryProducts.map(createProductCard).join('');
        initializeLikeButtons();
    }

    function initializeLikeButtons() {
        const likeButtons = document.querySelectorAll('.like-btn');
        likeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const likeIcon = button.querySelector('.like-icon');
                if (likeIcon.src.includes('empty-like.png')) {
                    likeIcon.src = './icons/filled-like.png';
                } else {
                    likeIcon.src = './icons/empty-like.png';
                }
            });
        });
    }

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const category = link.getAttribute('data-category');
            displayProducts(category);
        });
    });

    backBtn.addEventListener('click', () => {
        carouselContainer.scrollBy({ left: -312, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        carouselContainer.scrollBy({ left: 312, behavior: 'smooth' });
    });

    // Initialize with the first category
    displayProducts('OUTWEARS');
});