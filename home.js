// 3D Carousel - WITH PAGE MOVEMENT FIX (short WhatsApp messages)

document.addEventListener('DOMContentLoaded', function() {
  
  const discoverBtn = document.getElementById('discoverBtn');
  if (discoverBtn) {
    discoverBtn.addEventListener('click', function() {
      const imageGrid = document.getElementById('imageGridSection');
      if (imageGrid) {
        imageGrid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
  
  init3DCarousel();
  
  function init3DCarousel() {
    const originalContainer = document.querySelector('.grid-2x2');
    if (!originalContainer) return;
    
    const products = [
      {
        name: "Premium Butter Zaw",
        price: "250",
        img: "butter-aroma-zaw.jpg",
        imgFallback: "butter-aroma-zaw.jpg",
        waMsg: "order as many-fast delivery first",
        buttonText: "Premium Butter Zaw - Nu.250/drey 📱"
      },
      {
        name: "Khamtey Rice",
        price: "130",
        img: "khamtey.png",
        imgFallback: "khamtey.png",
        waMsg: "order as many-fast delivery first",
        buttonText: "Khamtey Rice - Nu.130/kg 📱"
      },
      {
        name: "Boyay",
        price: "150",
        img: "boyay.png",
        imgFallback: "boyay.png",
        waMsg: "order as many-fast delivery first",
        buttonText: "Boyay - Nu.150/drey 📱"
      },
      {
        name: "Raw Zaw",
        price: "150",
        img: "raw-zaw.png",
        imgFallback: "raw-zaw.png",
        waMsg: "order as many-fast delivery first",
        buttonText: "Raw Zaw - Nu.150/drey 📱"
      }
    ];
    
    const phoneNumber = '97517822575';
    
    originalContainer.innerHTML = '';
    originalContainer.classList.add('carousel-container');
    
    const trackContainer = document.createElement('div');
    trackContainer.className = 'carousel-track-container';
    
    const track = document.createElement('div');
    track.className = 'carousel-track';
    trackContainer.appendChild(track);
    originalContainer.appendChild(trackContainer);
    
    const slides = [];
    let currentIndex = 0;
    
    products.forEach((product, index) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      slide.dataset.index = index;
      
      const slideImg = document.createElement('img');
      slideImg.src = product.img;
      slideImg.alt = product.name;
      slideImg.loading = 'lazy';
      slideImg.onerror = function() { this.src = product.imgFallback; };
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
    
    const navDiv = document.createElement('div');
    navDiv.className = 'carousel-nav';
    navDiv.innerHTML = `<button class="carousel-btn prev-btn">‹</button><button class="carousel-btn next-btn">›</button>`;
    
    const dotsDiv = document.createElement('div');
    dotsDiv.className = 'carousel-dots';
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot';
      dot.dataset.index = i;
      dot.addEventListener('click', (function(idx) { return function() { goToSlide(idx); }; })(i));
      dotsDiv.appendChild(dot);
    }
    
    const swipeHint = document.createElement('div');
    swipeHint.className = 'swipe-hint';
    swipeHint.innerHTML = '← Swipe to browse →';
    
    originalContainer.parentNode.insertBefore(navDiv, originalContainer.nextSibling);
    originalContainer.parentNode.insertBefore(dotsDiv, navDiv.nextSibling);
    originalContainer.parentNode.insertBefore(swipeHint, dotsDiv.nextSibling);
    
    function updateCarousel() {
      slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev', 'next', 'prev-2', 'next-2');
        if (i === currentIndex) slide.classList.add('active');
        else if (i === (currentIndex - 1 + slides.length) % slides.length) slide.classList.add('prev');
        else if (i === (currentIndex - 2 + slides.length) % slides.length) slide.classList.add('prev-2');
        else if (i === (currentIndex + 1) % slides.length) slide.classList.add('next');
        else if (i === (currentIndex + 2) % slides.length) slide.classList.add('next-2');
      });
      const dots = dotsDiv.querySelectorAll('.carousel-dot');
      dots.forEach((dot, i) => {
        if (i === currentIndex) dot.classList.add('active-dot');
        else dot.classList.remove('active-dot');
      });
    }
    
    function goToSlide(index) { currentIndex = index; updateCarousel(); }
    function nextSlide() { currentIndex = (currentIndex + 1) % slides.length; updateCarousel(); }
    function prevSlide() { currentIndex = (currentIndex - 1 + slides.length) % slides.length; updateCarousel(); }
    
    document.querySelector('.prev-btn')?.addEventListener('click', prevSlide);
    document.querySelector('.next-btn')?.addEventListener('click', nextSlide);
    
    // ===== FIX: Prevents whole page from moving on swipe =====
    let touchStartX = 0;
    let isSwiping = false;
    
    trackContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      isSwiping = true;
      document.body.style.overflow = 'hidden';  // Locks page scroll
    }, { passive: false });
    
    trackContainer.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      const currentX = e.changedTouches[0].screenX;
      if (Math.abs(currentX - touchStartX) > 5) {
        e.preventDefault();  // Prevents page from moving
      }
    }, { passive: false });
    
    trackContainer.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].screenX;
      const diff = endX - touchStartX;
      if (Math.abs(diff) > 15) {
        if (diff > 0) prevSlide();
        else nextSlide();
      }
      document.body.style.overflow = '';  // Unlocks page scroll
      isSwiping = false;
    });
    
    trackContainer.addEventListener('touchcancel', () => {
      document.body.style.overflow = '';
      isSwiping = false;
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
    
    window.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      const diff = e.clientX - mouseStartX;
      if (Math.abs(diff) > 15) {
        if (diff > 0) prevSlide();
        else nextSlide();
      }
      isDragging = false;
      trackContainer.style.cursor = 'grab';
    });
    
    trackContainer.style.cursor = 'grab';
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      const rect = originalContainer.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        if (e.key === 'ArrowLeft') { prevSlide(); e.preventDefault(); }
        else if (e.key === 'ArrowRight') { nextSlide(); e.preventDefault(); }
      }
    });
    
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateCarousel, 150);
    });
    
    updateCarousel();
  }
});