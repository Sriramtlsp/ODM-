// Smooth scrolling and interactive functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and interactions
    initializeAnimations();
    initializeScrollEffects();
    initializeWhatsAppWidget();
});

// Scroll to packages section
function scrollToPackages() {
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
        packagesSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// WhatsApp Integration
function openWhatsApp(packageType) {
    const phoneNumber = '919884745432'; // Indian format with country code
    let message = '';
    
    switch(packageType) {
        case 'monthly':
            message = "Hi! I'm interested in the Monthly Growth Pack. Can you provide more details about pricing and what's included?";
            break;
        case 'yearly':
            message = "Hi! I'm interested in the Yearly Dominator Pack. I'd like to know more about the 20% savings and what's included.";
            break;
        case 'consultation':
            message = "Hi! I'd like to schedule my FREE 30-minute growth consultation. When would be a good time to discuss my business needs?";
            break;
        case 'general':
        default:
            message = "Hi! I'm interested in your digital marketing services. Can you help me transform my business online?";
            break;
    }
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Close chat widget if open
    const chatWidget = document.getElementById('whatsapp-chat');
    if (chatWidget) {
        chatWidget.classList.remove('active');
    }
}

// Toggle WhatsApp chat widget
function toggleWhatsApp() {
    const chatWidget = document.getElementById('whatsapp-chat');
    if (chatWidget) {
        chatWidget.classList.toggle('active');
    }
}

// Initialize scroll-based animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards and package cards
    const animatedElements = document.querySelectorAll('.service-card, .package-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Header scroll effect
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background opacity based on scroll
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });
}

// WhatsApp widget initialization
function initializeWhatsAppWidget() {
    // Auto-show WhatsApp widget after 10 seconds
    setTimeout(() => {
        const whatsappButton = document.querySelector('.whatsapp-button');
        if (whatsappButton) {
            whatsappButton.style.animation = 'pulse 2s infinite, bounce 0.5s ease';
        }
    }, 10000);

    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
        const chatWidget = document.getElementById('whatsapp-chat');
        const whatsappWidget = document.getElementById('whatsapp-widget');
        
        if (chatWidget && whatsappWidget && !whatsappWidget.contains(e.target)) {
            chatWidget.classList.remove('active');
        }
    });
}

// Form validation and submission (if needed for future contact forms)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Utility function to track user interactions (for analytics)
function trackInteraction(action, category = 'engagement') {
    // This can be integrated with Google Analytics or other tracking services
    console.log(`Tracking: ${category} - ${action}`);
    
    // Example: Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: window.location.pathname
        });
    }
}

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn') || e.target.closest('.btn')) {
        const button = e.target.matches('.btn') ? e.target : e.target.closest('.btn');
        const buttonText = button.textContent.trim();
        trackInteraction(`Button Click: ${buttonText}`, 'cta');
    }
});

// Lazy loading for images (if any are added later)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization: Debounce scroll events
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

// Smooth reveal animation for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

// Add bounce animation to WhatsApp button
const bounceKeyframes = `
    @keyframes bounce {
        0%, 20%, 60%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        80% { transform: translateY(-5px); }
    }
`;

// Inject bounce animation
const style = document.createElement('style');
style.textContent = bounceKeyframes;
document.head.appendChild(style);

// Handle package selection and highlight
function selectPackage(packageType) {
    // Remove previous selections
    document.querySelectorAll('.package-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to clicked package
    const selectedCard = document.querySelector(`[data-package="${packageType}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    // Track the selection
    trackInteraction(`Package Selected: ${packageType}`, 'package_selection');
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close WhatsApp chat with Escape key
    if (e.key === 'Escape') {
        const chatWidget = document.getElementById('whatsapp-chat');
        if (chatWidget && chatWidget.classList.contains('active')) {
            chatWidget.classList.remove('active');
        }
    }
    
    // Quick access to call button with 'C' key
    if (e.key.toLowerCase() === 'c' && e.ctrlKey) {
        e.preventDefault();
        window.location.href = 'tel:9884745432';
    }
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeLazyLoading();
    
    // Add reveal class to elements that should animate
    const animateElements = document.querySelectorAll('.service-card, .package-card, .section-header');
    animateElements.forEach(el => el.classList.add('reveal'));
    
    // Debounced scroll handler
    const debouncedReveal = debounce(revealOnScroll, 10);
    window.addEventListener('scroll', debouncedReveal);
    
    // Initial reveal check
    revealOnScroll();
});

// Add CSS for reveal animation
const revealCSS = `
    .reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .reveal.active {
        opacity: 1;
        transform: translateY(0);
    }
    
    .package-card.selected {
        border-color: #28a745;
        box-shadow: 0 0 20px rgba(40, 167, 69, 0.3);
    }
`;

const revealStyle = document.createElement('style');
revealStyle.textContent = revealCSS;
document.head.appendChild(revealStyle);
