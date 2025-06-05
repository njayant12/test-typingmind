// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation behavior
    initNavigation();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize animations
    initAnimations();
});

// Navigation behavior (sticky nav, mobile menu, etc.)
function initNavigation() {
    const nav = document.querySelector('nav');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    // Sticky navigation on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle functionality would go here
    // if we had a mobile menu button in the HTML
}

// Testimonial slider functionality
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    
    // Function to show specific testimonial
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected testimonial and activate corresponding dot
        testimonials[index].style.display = 'block';
        dots[index].classList.add('active');
        
        // Update current index
        currentIndex = index;
    }
    
    // Initially show the first testimonial
    showTestimonial(0);
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Event listeners for prev/next buttons
    prevBtn.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = testimonials.length - 1;
        }
        showTestimonial(newIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) {
            newIndex = 0;
        }
        showTestimonial(newIndex);
    });
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) {
            newIndex = 0;
        }
        showTestimonial(newIndex);
    }, 5000);
}

// Initialize scroll animations
function initAnimations() {
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is in the viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Once animation is applied, stop observing
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // relative to viewport
        threshold: 0.1, // trigger when at least 10% of the element is visible
        rootMargin: '-50px' // negative margin to trigger slightly after element enters viewport
    });
    
    // Elements to animate
    const animatedElements = document.querySelectorAll('.feature-card, .step, .testimonial-card, .hero-content, .hero-image');
    
    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        // Skip if it's just a "#" link
        if (targetId === "#") return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});