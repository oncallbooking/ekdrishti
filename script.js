// ===== GLOBAL VARIABLES =====
let currentSlide = 0;
let totalSlides = 6;
let autoSlideInterval;
let touchStartX = 0;
let isDragging = false;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeSlider();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeAnimations();
    console.log('Ek-Drishti Digital Hub loaded successfully!');
});

// ===== THEME MANAGEMENT =====
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add animation effect
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }
}

// ===== SLIDER FUNCTIONALITY =====
function initializeSlider() {
    const sliderTrack = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!sliderTrack) return;
    
    // Update slider position
    function updateSlider() {
        const slideWidth = 100 / Math.min(3, totalSlides); // Show 3 slides on desktop
        const isMobile = window.innerWidth <= 768;
        const slidesToShow = isMobile ? 1 : 3;
        const translateX = -(currentSlide * (100 / slidesToShow));
        
        sliderTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    
    // Auto slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            setTimeout(startAutoSlide, 5000); // Restart after 5 seconds
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            setTimeout(startAutoSlide, 5000); // Restart after 5 seconds
        });
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();
            goToSlide(index);
            setTimeout(startAutoSlide, 5000); // Restart after 5 seconds
        });
    });
    
    // Touch/swipe support
    sliderTrack.addEventListener('touchstart', handleTouchStart, { passive: true });
    sliderTrack.addEventListener('touchmove', handleTouchMove, { passive: true });
    sliderTrack.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Mouse drag support
    sliderTrack.addEventListener('mousedown', handleMouseDown);
    sliderTrack.addEventListener('mousemove', handleMouseMove);
    sliderTrack.addEventListener('mouseup', handleMouseUp);
    sliderTrack.addEventListener('mouseleave', handleMouseUp);
    
    // Pause on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Responsive handling
    window.addEventListener('resize', updateSlider);
    
    // Initialize
    updateSlider();
    startAutoSlide();
}

// ===== TOUCH/DRAG HANDLERS =====
function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    clearInterval(autoSlideInterval);
}

function handleTouchMove(e) {
    if (!touchStartX) return;
    
    const touchCurrentX = e.touches[0].clientX;
    const diff = touchStartX - touchCurrentX;
    
    // Add visual feedback during swipe
    if (Math.abs(diff) > 10) {
        const sliderTrack = document.getElementById('sliderTrack');
        if (sliderTrack) {
            sliderTrack.style.transition = 'none';
            const currentTransform = -(currentSlide * (100 / (window.innerWidth <= 768 ? 1 : 3)));
            const dragOffset = (diff / window.innerWidth) * 30; // Limit drag distance
            sliderTrack.style.transform = `translateX(${currentTransform - dragOffset}%)`;
        }
    }
}

function handleTouchEnd(e) {
    if (!touchStartX) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    const threshold = 50;
    
    // Restore transition
    const sliderTrack = document.getElementById('sliderTrack');
    if (sliderTrack) {
        sliderTrack.style.transition = 'transform 0.5s ease';
    }
    
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            // Swipe left - next slide
            currentSlide = (currentSlide + 1) % totalSlides;
        } else {
            // Swipe right - previous slide
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        }
        updateSliderPosition();
    } else {
        // Snap back to current position
        updateSliderPosition();
    }
    
    touchStartX = 0;
    
    // Restart auto slide after 3 seconds
    setTimeout(() => {
        autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSliderPosition();
        }, 3000);
    }, 3000);
}

function updateSliderPosition() {
    const sliderTrack = document.getElementById('sliderTrack');
    const indicators = document.querySelectorAll('.indicator');
    
    if (sliderTrack) {
        const isMobile = window.innerWidth <= 768;
        const slidesToShow = isMobile ? 1 : 3;
        const translateX = -(currentSlide * (100 / slidesToShow));
        sliderTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
}

// Mouse drag handlers
function handleMouseDown(e) {
    isDragging = true;
    touchStartX = e.clientX;
    e.preventDefault();
    clearInterval(autoSlideInterval);
}

function handleMouseMove(e) {
    if (!isDragging || !touchStartX) return;
    
    const currentX = e.clientX;
    const diff = touchStartX - currentX;
    
    if (Math.abs(diff) > 10) {
        const sliderTrack = document.getElementById('sliderTrack');
        if (sliderTrack) {
            sliderTrack.style.transition = 'none';
            const currentTransform = -(currentSlide * (100 / (window.innerWidth <= 768 ? 1 : 3)));
            const dragOffset = (diff / window.innerWidth) * 30;
            sliderTrack.style.transform = `translateX(${currentTransform - dragOffset}%)`;
        }
    }
}

function handleMouseUp(e) {
    if (!isDragging) return;
    
    isDragging = false;
    
    if (!touchStartX) return;
    
    const mouseEndX = e.clientX;
    const diff = touchStartX - mouseEndX;
    const threshold = 50;
    
    // Restore transition
    const sliderTrack = document.getElementById('sliderTrack');
    if (sliderTrack) {
        sliderTrack.style.transition = 'transform 0.5s ease';
    }
    
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            currentSlide = (currentSlide + 1) % totalSlides;
        } else {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        }
        updateSliderPosition();
    } else {
        updateSliderPosition();
    }
    
    touchStartX = 0;
    
    // Restart auto slide
    setTimeout(() => {
        autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSliderPosition();
        }, 3000);
    }, 3000);
}

// ===== MOBILE MENU =====
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileMenuBtn.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = mobileMenu.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    // Smooth scroll for anchor links
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
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.tool-card, .service-card, .category-card, .quick-access-btn');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== FORM HANDLING =====
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Create mailto link
            const mailtoLink = `mailto:brainimmensity@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('Email client opened! Your message is ready to send.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// ===== COMMENT SYSTEM =====
function initializeCommentSystem() {
    const commentForms = document.querySelectorAll('.comment-form');
    
    commentForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const postId = form.dataset.postId;
            const name = form.querySelector('input[name="name"]').value;
            const email = form.querySelector('input[name="email"]').value;
            const text = form.querySelector('textarea[name="comment"]').value;
            
            if (name && email && text) {
                addComment(postId, name, email, text);
                form.reset();
                showNotification('Comment added successfully!', 'success');
            }
        });
    });
    
    // Load existing comments
    loadComments();
}

function addComment(postId, name, email, text) {
    const comments = getComments(postId);
    const newComment = {
        id: Date.now().toString(),
        name: name,
        email: email,
        text: text,
        date: new Date().toLocaleDateString()
    };
    
    comments.push(newComment);
    localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
    
    renderComments(postId);
}

function getComments(postId) {
    const stored = localStorage.getItem(`comments_${postId}`);
    return stored ? JSON.parse(stored) : [];
}

function renderComments(postId) {
    const commentsContainer = document.querySelector(`[data-comments="${postId}"]`);
    if (!commentsContainer) return;
    
    const comments = getComments(postId);
    
    if (comments.length === 0) {
        commentsContainer.innerHTML = '<p class="no-comments">No comments yet. Be the first to comment!</p>';
        return;
    }
    
    const commentsHTML = comments.map(comment => `
        <div class="comment">
            <div class="comment-header">
                <span class="comment-author">${escapeHtml(comment.name)}</span>
                <span class="comment-date">${comment.date}</span>
            </div>
            <p class="comment-text">${escapeHtml(comment.text)}</p>
        </div>
    `).join('');
    
    commentsContainer.innerHTML = commentsHTML;
}

function loadComments() {
    const commentContainers = document.querySelectorAll('[data-comments]');
    commentContainers.forEach(container => {
        const postId = container.dataset.comments;
        renderComments(postId);
    });
}

// ===== UTILITY FUNCTIONS =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-weight: 500;
        max-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced resize handler
window.addEventListener('resize', debounce(() => {
    updateSliderPosition();
}, 250));

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    // Arrow keys for slider navigation
    if (e.key === 'ArrowLeft') {
        const prevBtn = document.getElementById('prevBtn');
        if (prevBtn && document.activeElement.closest('.slider-container')) {
            prevBtn.click();
        }
    } else if (e.key === 'ArrowRight') {
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn && document.activeElement.closest('.slider-container')) {
            nextBtn.click();
        }
    }
});

// ===== LAZY LOADING =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== PROGRESSIVE ENHANCEMENT =====
function checkFeatureSupport() {
    // Check for CSS Grid support
    if (!CSS.supports('display', 'grid')) {
        document.body.classList.add('no-grid');
    }
    
    // Check for Intersection Observer support
    if (!('IntersectionObserver' in window)) {
        // Fallback: show all elements immediately
        const animatedElements = document.querySelectorAll('.tool-card, .service-card, .category-card');
        animatedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
    
    // Check for touch support
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
}

// Initialize feature support checks
checkFeatureSupport();

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
        .then(registration => {
            console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

// ===== ANALYTICS & TRACKING =====
function trackInteraction(action, element) {
    // Basic interaction tracking
    console.log(`User interaction: ${action} on ${element}`);
    
    // You can integrate with Google Analytics or other tracking services here
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': 'UI',
            'event_label': element
        });
    }
}

// Add click tracking to important elements
document.addEventListener('click', function(e) {
    if (e.target.matches('.quick-access-btn')) {
        trackInteraction('click', 'quick-access-button');
    } else if (e.target.matches('.tool-card')) {
        trackInteraction('click', 'tool-card');
    } else if (e.target.matches('.service-card')) {
        trackInteraction('click', 'service-card');
    }
});

// Initialize all contact forms and comment systems when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeCommentSystem();
    initializeLazyLoading();
});