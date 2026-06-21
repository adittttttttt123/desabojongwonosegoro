// ========== Custom JavaScript for Desa Bojong Website ==========

// Scroll reveal animation
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll); // Trigger on page load

// Smooth scroll for anchor links
document.querySelectorAll('a.js-scroll-trigger[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '⬆';
scrollToTopBtn.classList.add('scroll-to-top');
document.body.appendChild(scrollToTopBtn);

// Style button
Object.assign(scrollToTopBtn.style, {
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  backgroundColor: '#f39c12',
  color: '#fff',
  border: 'none',
  borderRadius: '50%',
  width: '45px',
  height: '45px',
  fontSize: '20px',
  cursor: 'pointer',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'opacity 0.3s, transform 0.3s',
  zIndex: '9999',
  display: 'none',
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollToTopBtn.style.display = 'block';
    scrollToTopBtn.style.opacity = '1';
    scrollToTopBtn.style.transform = 'scale(1)';
  } else {
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.transform = 'scale(0.8)';
    setTimeout(() => {
      if (window.scrollY < 400) scrollToTopBtn.style.display = 'none';
    }, 200);
  }
});

scrollToTopBtn.addEventListener('mouseover', () => {
  scrollToTopBtn.style.backgroundColor = '#e67e22';
});

scrollToTopBtn.addEventListener('mouseout', () => {
  scrollToTopBtn.style.backgroundColor = '#f39c12';
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Efek navbar berubah saat di-scroll
window.addEventListener('scroll', function() {
  const nav = document.querySelector('.navbar-custom');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});
// Tambahkan efek transisi pada navbar
const style = document.createElement('style');
style.innerHTML = `
.navbar-custom {
  transition: background 0.3s ease, padding 0.3s ease;
}
`;
document.head.appendChild(style);