// 3D Carousel - MANUAL ONLY (No Auto Slide) - FIXED VERSION

document.addEventListener('DOMContentLoaded', function() {
  
  // Smooth scroll for Discover button
  const discoverBtn = document.getElementById('discoverBtn');
  if (discoverBtn) {
    discoverBtn.addEventListener('click', function() {
      const imageGrid = document.getElementById('imageGridSection');
      if (imageGrid) {
        imageGrid.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    });
  }
  
  // Initialize 3D Carousel
  init3DCarousel();
  
  function init3DCarousel() {
    const originalContainer = document.querySelector('.grid-2x2');
    if (!originalContainer) return;
    
    // Product data with proper WhatsApp messages
    const products = [
      {
        name: "Premium Butter Zaw",
        price: "250",
        img: "images/butter-aroma-zaw.jpg",
        imgFallback: "images/butter-aroma-zaw.jpg",
        waMsg: "Hello! I want to buy Butter Zaw.%0A%0AHow many drey do you want to buy? Please tell me the quantity.%0A%0APrice: Nu. 250 per drey",
        buttonText: "Premium Butter Zaw - Nu.250/drey 📱"
      },
      {
        name: "Khamtey Rice",
        price: "130",
        img: "images/khamtey.png",
        imgFallback: "images/khamtey.png",
        waMsg: "Hello! I want to buy Khamtey Rice.%0A%0AHow many kg do you want to buy? Please tell me the quantity.%0A%0APrice: Nu. 130 per kg",
        buttonText: "Khamtey Rice - Nu.130/kg 📱"
      },
      {
        name: "Boyay",
        price: "150",
        img: "images/boyay.png",
        imgFallback: "images/boyay.png",
        waMsg: "Hello! I want to buy Boyay.%0A%0AHow many drey do you want to buy? Please tell me the quantity.%0A%0APrice: Nu. 150 per drey",
        buttonText: "Boyay - Nu.150/drey 📱"
      },
      {
        name: "Raw Zaw",
        price: "150",
        img: "images/raw-zaw.png",
        imgFallback: "images/raw-zaw.png",
        waMsg: "Hello! I want to order Raw Zaw.%0A%0AHow many drey do you want to buy? Please tell me the quantity.%0A%0APrice: Nu. 150 per drey",
        buttonText: "Raw Zaw - Nu.150/drey 📱"
      }
    ];
    
    const phoneNumber = '97517822575';
    
    // Clear original container
    originalContainer.innerHTML = '';
    originalContainer.classList.add('carousel-container');
    
    // Create track container for proper centering
    const trackContainer = document.createElement('div');
    trackContainer.className = 'carousel-track-container';
    
    const track = document.createElement('div');
    track.className = 'carousel-track';
    trackContainer.appendChild(track);
    originalContainer.appendChild(trackContainer);
    
    const slides = [];
    let currentIndex = 0;
    
    // Create slides from products
    products.forEach((product, index) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      slide.dataset.index = index;
      
      const slideImg = document.createElement('img');
      slideImg.src = product.img;
      slideImg.alt = product.name;
      slideImg.loading = 'lazy';
      slideImg.onerror = function() {
        this.src = product.imgFallback;
      };
      slide.appendChild(slideImg);
      
      const caption = document.createElement('a');
      caption.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(product.waMsg)}`;
      caption.className = 'slide-caption';
      caption.target = '_blank';
      caption.rel = 'noopener noreferrer';
      caption.innerHTML = product.buttonText;
      slide.appendChild(caption);
      
      track.appendChild(slide);
      slides.push(slide);
    });
    
    // Create navigation buttons
    const navDiv = document.createElement('div');
    navDiv.className = 'carousel-nav';
    navDiv.innerHTML = `
      <button class="carousel-btn prev-btn" aria-label="Previous slide">‹</button>
      <button class="carousel-btn next-btn" aria-label="Next slide">›</button>
    `;
    
    // Create dots
    const dotsDiv = document.createElement('div');
    dotsDiv.className = 'carousel-dots';
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot';
      dot.dataset.index = i;
      // FIXED: Proper closure to capture the correct index
      dot.addEventListener('click', (function(idx) {
        return function() { goToSlide(idx); };
      })(i));
      dotsDiv.appendChild(dot);
    }
    
    // Create swipe hint for mobile
    const swipeHint = document.createElement('div');
    swipeHint.className = 'swipe-hint';
    swipeHint.innerHTML = '← Swipe to browse →';
    
    // Insert elements after container
    originalContainer.parentNode.insertBefore(navDiv, originalContainer.nextSibling);
    originalContainer.parentNode.insertBefore(dotsDiv, navDiv.nextSibling);
    originalContainer.parentNode.insertBefore(swipeHint, dotsDiv.nextSibling);
    
    // Update carousel positions
    function updateCarousel() {
      slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev', 'next', 'prev-2', 'next-2');
        
        if (i === currentIndex) {
          slide.classList.add('active');
        } else if (i === (currentIndex - 1 + slides.length) % slides.length) {
          slide.classList.add('prev');
        } else if (i === (currentIndex - 2 + slides.length) % slides.length) {
          slide.classList.add('prev-2');
        } else if (i === (currentIndex + 1) % slides.length) {
          slide.classList.add('next');
        } else if (i === (currentIndex + 2) % slides.length) {
          slide.classList.add('next-2');
        }
      });
      
      // Update active dot - always get fresh reference
      const dots = dotsDiv.querySelectorAll('.carousel-dot');
      dots.forEach((dot, i) => {
        if (i === currentIndex) {
          dot.classList.add('active-dot');
        } else {
          dot.classList.remove('active-dot');
        }
      });
    }
    
    // Navigation functions
    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }
    
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }
    
    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    }
    
    // Add event listeners to buttons
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartTime = 0;
    
    trackContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartTime = Date.now();
    }, { passive: true });
    
    trackContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;
      const swipeTime = Date.now() - touchStartTime;
      
      if (Math.abs(swipeDistance) > 15 || (Math.abs(swipeDistance) > 8 && swipeTime < 150)) {
        if (swipeDistance > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      }
    });
    
    // Mouse drag support
    let mouseStartX = 0;
    let isDragging = false;
    
    trackContainer.addEventListener('mousedown', (e) => {
      mouseStartX = e.clientX;
      isDragging = true;
      trackContainer.style.cursor = 'grabbing';
      e.preventDefault();
    });
    
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });
    
    window.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      const mouseEndX = e.clientX;
      const mouseDistance = mouseEndX - mouseStartX;
      
      if (Math.abs(mouseDistance) > 15) {
        if (mouseDistance > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      }
      isDragging = false;
      trackContainer.style.cursor = 'grab';
    });
    
    trackContainer.style.cursor = 'grab';
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      const rect = originalContainer.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        if (e.key === 'ArrowLeft') {
          prevSlide();
          e.preventDefault();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
          e.preventDefault();
        }
      }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateCarousel();
      }, 150);
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
      setTimeout(() => {
        updateCarousel();
      }, 100);
    });
    
    // Initial update
    updateCarousel();
    
    // Preload images for smoother experience
    function preloadImages() {
      const imagesToPreload = products.slice(0, 2);
      imagesToPreload.forEach(product => {
        const img = new Image();
        img.src = product.img;
      });
    }
    preloadImages();
  }
});
