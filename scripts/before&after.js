document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.comparison-slider');
    const sliderHandle = slider.querySelector('.slider-handle');
    const rightContainer = slider.querySelector('.image-container.right');
    
    function updateSliderPosition(x) {
      const sliderRect = slider.getBoundingClientRect();
      const percentage = ((x - sliderRect.left) / sliderRect.width) * 100;
      
      // Constrain percentage between 0 and 100
      const constrainedPercentage = Math.max(0, Math.min(100, percentage));
      
      // Update position of slider handle and clip-path of right container
      sliderHandle.style.left = `${constrainedPercentage}%`;
      rightContainer.style.clipPath = `inset(0 0 0 ${constrainedPercentage}%)`;
    }
    
    // Handle mouse movement
    function handleMouseMove(e) {
      updateSliderPosition(e.pageX);
    }
    
    // Handle touch movement
    function handleTouchMove(e) {
      updateSliderPosition(e.touches[0].pageX);
    }
    
    // Mouse events
    sliderHandle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      document.addEventListener('mousemove', handleMouseMove);
    });
    
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleMouseMove);
    });
    
    // Touch events
    sliderHandle.addEventListener('touchstart', (e) => {
      e.preventDefault();
      document.addEventListener('touchmove', handleTouchMove);
    });
    
    document.addEventListener('touchend', () => {
      document.removeEventListener('touchmove', handleTouchMove);
    });
    
    // Prevent image dragging
    slider.querySelectorAll('img').forEach(img => {
      img.addEventListener('dragstart', (e) => e.preventDefault());
    });
  });