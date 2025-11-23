// Theme Toggle
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, themeIcon);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme, themeIcon);
        });
    }
}

function updateThemeIcon(theme, icon) {
    if (icon) {
        if (theme === 'dark') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
}

// Initialize theme on page load
initTheme();

// Logo click to reload home
const logo = document.getElementById('logo');
if (logo) {
    logo.addEventListener('click', () => {
        // If we're on index.html, reload the page
        // If we're on another page, navigate to index.html
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
            window.location.reload();
        } else {
            window.location.href = 'index.html';
        }
    });
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Here you would typically send this to a server
        // For now, we'll just show an alert
        alert(`Thank you ${name}! Your message has been received. We'll get back to you soon at ${email} or ${phone}.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Function to set navbar transparent on landing page
function setNavbarTransparent() {
    const navbar = document.querySelector('.navbar');
    const body = document.body;
    const html = document.documentElement;
    const isLandingPage = body.classList.contains('landing-page');
    const isDark = html.getAttribute('data-theme') === 'dark';
    
    if (isLandingPage && navbar) {
        navbar.style.setProperty('background', 'transparent', 'important');
        navbar.style.setProperty('box-shadow', 'none', 'important');
        navbar.style.setProperty('-webkit-box-shadow', 'none', 'important');
        if (isDark) {
            navbar.style.setProperty('border-bottom', '1px solid rgba(255, 255, 255, 0.05)', 'important');
        } else {
            navbar.style.setProperty('border-bottom', '1px solid rgba(0, 0, 0, 0.05)', 'important');
        }
    }
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const html = document.documentElement;
    const body = document.body;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const isLandingPage = body.classList.contains('landing-page');
    
    // Keep navbar fully transparent on landing page
    if (isLandingPage && navbar) {
        setNavbarTransparent();
    } else if (navbar) {
        // Original behavior for other pages
        if (window.scrollY > 50) {
            if (isDark) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.8)';
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            } else {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            }
        } else {
            if (isDark) {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }
    }
}

// Initialize immediately
setNavbarTransparent();
handleNavbarScroll();

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    setNavbarTransparent();
    handleNavbarScroll();
});

// Initialize after theme is set
setTimeout(() => {
    setNavbarTransparent();
    handleNavbarScroll();
}, 100);

// Navbar scroll event listener
window.addEventListener('scroll', handleNavbarScroll);

// Also call on load to ensure initial state
window.addEventListener('load', () => {
    setNavbarTransparent();
    handleNavbarScroll();
});

// Hero Slider with Thumbnails
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slider .slide');
const thumbnails = document.querySelectorAll('.slider-thumbnails .thumbnail');
const totalSlides = slides.length;

function showSlide(index) {
    if (index === currentSlide) return;
    
    const previousSlide = currentSlide;
    currentSlide = index;
    
    // Remove active class from all slides and thumbnails
    slides.forEach(slide => {
        slide.classList.remove('active', 'slide-out');
    });
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // Add slide-out animation to previous slide
    if (slides[previousSlide]) {
        slides[previousSlide].classList.add('slide-out');
    }
    
    // Add active class to current slide and thumbnail
    setTimeout(() => {
        slides[previousSlide].classList.remove('slide-out');
        slides[currentSlide].classList.add('active');
        if (thumbnails[currentSlide]) {
            thumbnails[currentSlide].classList.add('active');
        }
    }, 100);
}

function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    showSlide(next);
}

// Initialize slider
if (slides.length > 0) {
    showSlide(0);
    
    // Auto-play slider
    setInterval(nextSlide, 5000);
    
    // Thumbnail navigation
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            showSlide(index);
        });
    });
}

// Service Card Images
document.querySelectorAll('.service-card').forEach(card => {
    const imageUrl = card.getAttribute('data-image');
    if (imageUrl) {
        const serviceImage = card.querySelector('.service-image');
        if (serviceImage) {
            serviceImage.style.backgroundImage = `url(${imageUrl})`;
        }
    }
});

// Parallax effect for hero slider
window.addEventListener('scroll', () => {
    const heroSlider = document.querySelector('.hero-slider');
    const scrolled = window.pageYOffset;
    if (heroSlider) {
        const rate = scrolled * 0.5;
        heroSlider.style.transform = `translateY(${rate}px)`;
    }
});

// Gallery Animation on Scroll - Enhanced
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe gallery items for scroll animations
document.querySelectorAll('.gallery-item').forEach(el => {
    observer.observe(el);
});

// Gallery Lightbox
let currentImageIndex = 0;
const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));

function openLightbox(index) {
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const galleryItem = galleryImages[index].closest('.gallery-item');
    const caption = galleryItem.querySelector('.gallery-overlay p').textContent;
    
    currentImageIndex = index;
    lightboxImage.src = galleryImages[index].src.replace('w=800&h=600', 'w=1200&h=900');
    lightboxImage.alt = galleryImages[index].alt;
    lightboxCaption.textContent = caption;
    lightboxModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightboxModal = document.getElementById('lightboxModal');
    lightboxModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    openLightbox(currentImageIndex);
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    openLightbox(currentImageIndex);
}

// Add click event to gallery items
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
});

// Lightbox controls
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxModal = document.getElementById('lightboxModal');

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextImage();
    });
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevImage();
    });
}

if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.style.display === 'block') {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    }
});

