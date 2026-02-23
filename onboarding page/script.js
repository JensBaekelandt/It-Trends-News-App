// Current language state (uses locales.js for translations)
let currentLanguage = locales.default;
let currentTheme = 'dark';

// DOM Elements
const languageBtn = document.getElementById('languageBtn');
const languageDropdown = document.getElementById('languageDropdown');
const currentLangDisplay = document.getElementById('currentLang');
const langOptions = document.querySelectorAll('.lang-option');
const createAccountBtn = document.getElementById('createAccountBtn');
const loginBtn = document.getElementById('loginBtn');
const googleBtn = document.getElementById('googleBtn');
const themeToggle = document.getElementById('themeToggle');

// Initialize the application
function init() {
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && locales.isSupported(savedLang)) {
        currentLanguage = savedLang;
        updateLanguage(currentLanguage);
    }

    // Load saved theme preference
    const savedTheme = localStorage.getItem('preferredTheme');
    if (savedTheme) {
        currentTheme = savedTheme;
        applyTheme(currentTheme);
    }

    // Set up event listeners
    setupEventListeners();
}

// Set up all event listeners
function setupEventListeners() {
    // Language selector toggle
    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('active');
    });

    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            toggleTheme();
        });
    }

    // Language option selection
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');
            changeLanguage(lang);
            languageDropdown.classList.remove('active');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
            languageDropdown.classList.remove('active');
        }
    });

    // Create Account button click
    createAccountBtn.addEventListener('click', () => {
        handleCreateAccount();
    });

    // Login button click
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleLogin();
    });

    // Google button click
    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            handleGoogleSignIn();
        });
    }

    // Keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            languageDropdown.classList.remove('active');
        }
    });
}

// Change language function
function changeLanguage(lang) {
    if (locales.isSupported(lang)) {
        currentLanguage = lang;
        locales.current = lang;
        localStorage.setItem('preferredLanguage', lang);
        updateLanguage(lang);
    }
}

// Toggle theme function
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('preferredTheme', currentTheme);
    applyTheme(currentTheme);
}

// Apply theme to document
function applyTheme(theme) {
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
}

// Update all translatable elements
function updateLanguage(lang) {
    const langData = locales.getLanguage(lang);
    
    // Update current language display
    currentLangDisplay.textContent = locales.displayNames[lang].short;

    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (langData[key]) {
            // Check if the element is a button with an icon
            const icon = element.querySelector('i');
            if (icon) {
                element.innerHTML = icon.outerHTML + ' ' + langData[key];
            } else {
                element.innerHTML = langData[key];
            }
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Handle Create Account button click
function handleCreateAccount() {
    // Add button animation
    createAccountBtn.style.transform = 'scale(0.98)';
    setTimeout(() => {
        createAccountBtn.style.transform = '';
    }, 150);

    // Navigate to sign up page
    // For now, we'll show an alert - replace with actual navigation
    console.log('Navigating to Create Account page...');
    
    // Example: Uncomment to redirect to a sign-up page
    // window.location.href = '/signup.html';
    
    // Temporary feedback for demonstration
    showNotification('Redirecting to account creation...', 'info');
}

// Handle Login button click
function handleLogin() {
    // Navigate to login page
    console.log('Navigating to Login page...');
    
    // Example: Uncomment to redirect to login page
    // window.location.href = '/login.html';
    
    // Temporary feedback for demonstration
    showNotification('Redirecting to login...', 'info');
}

// Handle Google Sign In
function handleGoogleSignIn() {
    // Add button animation
    googleBtn.style.transform = 'scale(0.98)';
    setTimeout(() => {
        googleBtn.style.transform = '';
    }, 150);

    // Navigate to Google OAuth
    console.log('Initiating Google Sign In...');
    
    // Example: Implement Google OAuth here
    // window.location.href = '/auth/google';
    
    // Temporary feedback for demonstration
    showNotification('Connecting to Google...', 'info');
}

// Show notification helper function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '12px 24px',
        background: type === 'info' ? 'var(--primary-color)' : '#10b981',
        color: 'white',
        borderRadius: '8px',
        boxShadow: 'var(--shadow-lg)',
        zIndex: '1000',
        animation: 'fadeInUp 0.3s ease-out'
    });

    document.body.appendChild(notification);

    // Remove notification after 2 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Feature cards hover effect enhancement
function setupFeatureCardEffects() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    init();
    setupFeatureCardEffects();
});

// Export functions for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        changeLanguage,
        locales,
        handleCreateAccount,
        handleLogin
    };
}
