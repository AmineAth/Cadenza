        document.addEventListener('DOMContentLoaded', () => {
            const carouselContainer = document.querySelector('.carousel-container');
            const backBtn = document.getElementById('back-button');
            const nextBtn = document.getElementById('next-button');
            const categoryLinks = document.querySelectorAll('.category-list a');
            const productCards = document.querySelectorAll('.arrivals-card');

            function showCategory(category) {
                productCards.forEach(card => {
                    if (card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }

            categoryLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    categoryLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    const category = link.getAttribute('data-category');
                    showCategory(category);
                });
            });

            backBtn.addEventListener('click', () => {
                carouselContainer.scrollBy({ left: -312, behavior: 'smooth' });
            });

            nextBtn.addEventListener('click', () => {
                carouselContainer.scrollBy({ left: 312, behavior: 'smooth' });
            });

            // Initialize with the first category
            showCategory('OUTWEARS');
        });