// ==========================================
// Custom Interaction Logic for Desa Bojong Portal
// Handles smooth scrolling, scroll reveals, active nav highlights,
// interactive profile modals, custom video player modal, and lightbox gallery.
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initScrollSpy();
  initScrollReveal();
  initBackToTop();
  initProfileModals();
  initVideoModal();
  initGallerySlider();
  initGalleryLightbox();
});

// 1. Floating Navbar Scroll Effect
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-custom');
  if (!navbar) return;
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run immediately in case page is refreshed while scrolled down
}

// 2. Navigation ScrollSpy (Highlights current section)
function initScrollSpy() {
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.navbar-custom .nav-link');
  if (sections.length === 0 || navLinks.length === 0) return;
  
  const spyOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };
  
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (!id) return;
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, spyOptions);
  
  sections.forEach(section => spyObserver.observe(section));
}

// 3. IntersectionObserver Scroll Reveal (Buttery Smooth Entrance Animations)
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;
  
  const revealOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.05
  };
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve after showing so we don't repeat the animation
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);
  
  revealElements.forEach(el => revealObserver.observe(el));
}

// 4. Back to Top Button
function initBackToTop() {
  const btn = document.createElement('button');
  btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
  btn.className = 'scroll-to-top';
  document.body.appendChild(btn);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
  
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 5. Dynamic Profile Modals (Fixing the 404 iframe bug)
function initProfileModals() {
  const profileCards = document.querySelectorAll('.profile-card');
  const modal = document.getElementById('profileModal');
  if (!profileCards.length || !modal) return;
  
  profileCards.forEach(card => {
    const btn = card.querySelector('.btn-readmore');
    if (!btn) return;
    
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Avoid triggering card click
      openProfileModal(card);
    });
    
    // Clicking the card itself also opens the modal for better UX
    card.addEventListener('click', () => {
      openProfileModal(card);
    });
  });
  
  function openProfileModal(card) {
    const cardId = card.getAttribute('data-profile-id');
    const title = card.querySelector('.card-title').textContent;
    const templateContent = document.getElementById(`template-${cardId}`);
    
    const modalTitle = document.getElementById('profileModalTitle');
    const modalBody = document.getElementById('profileModalBody');
    
    if (modalTitle && modalBody && templateContent) {
      modalTitle.textContent = title;
      modalBody.innerHTML = templateContent.innerHTML;
      $(modal).modal('show');
    }
  }
}

// 6. Video Modal Handler (Inline YouTube Player)
function initVideoModal() {
  const videoCard = document.querySelector('.video-trigger-card');
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoModalIframe');
  if (!videoCard || !modal || !iframe) return;
  
  videoCard.addEventListener('click', (e) => {
    e.preventDefault();
    const embedUrl = videoCard.getAttribute('data-video-url');
    if (embedUrl) {
      iframe.setAttribute('src', `${embedUrl}?autoplay=1&rel=0`);
      $(modal).modal('show');
    }
  });
  
  // Pause video on close
  $(modal).on('hidden.bs.modal', () => {
    iframe.setAttribute('src', '');
  });
}

// 7. Horizontal Gallery Slider Controls
function initGallerySlider() {
  const galleryScroll = document.querySelector('.gallery-scroll');
  const prevBtn = document.querySelector('.gallery-prev-btn');
  const nextBtn = document.querySelector('.gallery-next-btn');
  
  if (!galleryScroll || !prevBtn || !nextBtn) return;
  
  const scrollAmount = 340; // Card width + gap
  
  prevBtn.addEventListener('click', () => {
    galleryScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
  
  nextBtn.addEventListener('click', () => {
    galleryScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
  
  // Show/Hide buttons depending on scroll position (optional styling helper)
  const toggleButtons = () => {
    const maxScroll = galleryScroll.scrollWidth - galleryScroll.clientWidth;
    prevBtn.style.opacity = galleryScroll.scrollLeft <= 5 ? '0.5' : '1';
    nextBtn.style.opacity = galleryScroll.scrollLeft >= maxScroll - 5 ? '0.5' : '1';
  };
  
  galleryScroll.addEventListener('scroll', toggleButtons, { passive: true });
  window.addEventListener('resize', toggleButtons);
  setTimeout(toggleButtons, 500); // Initial check
}

// 8. Gallery Lightbox Modal
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item-container');
  if (!galleryItems.length) return;
  
  // Create Lightbox Markup dynamically if it doesn't exist
  let lightbox = document.getElementById('galleryLightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'galleryLightbox';
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
      <span class="lightbox-close">&times;</span>
      <span class="lightbox-prev">&#10094;</span>
      <span class="lightbox-next">&#10095;</span>
      <div class="lightbox-content">
        <img class="lightbox-img" src="" alt="Gallery Image">
        <div class="lightbox-caption"></div>
        <div class="lightbox-counter"></div>
      </div>
    `;
    document.body.appendChild(lightbox);
  }
  
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const imgElement = lightbox.querySelector('.lightbox-img');
  const captionElement = lightbox.querySelector('.lightbox-caption');
  const counterElement = lightbox.querySelector('.lightbox-counter');
  
  let currentIdx = 0;
  
  const imageList = Array.from(galleryItems).map((item, idx) => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-item-overlay span')?.textContent || `Kegiatan Desa Bojong ${idx + 1}`;
    return {
      src: img.getAttribute('src'),
      caption: caption
    };
  });
  
  const showImage = (index) => {
    if (index < 0) index = imageList.length - 1;
    if (index >= imageList.length) index = 0;
    
    currentIdx = index;
    
    // Smooth transition
    imgElement.style.opacity = '0';
    imgElement.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      imgElement.setAttribute('src', imageList[currentIdx].src);
      captionElement.textContent = imageList[currentIdx].caption;
      counterElement.textContent = `${currentIdx + 1} / ${imageList.length}`;
      
      imgElement.style.opacity = '1';
      imgElement.style.transform = 'scale(1)';
    }, 150);
  };
  
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop page scrolling
      showImage(index);
    });
  });
  
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIdx - 1);
  });
  
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIdx + 1);
  });
  
  // Keyboard controls
  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIdx - 1);
    if (e.key === 'ArrowRight') showImage(currentIdx + 1);
  });
}