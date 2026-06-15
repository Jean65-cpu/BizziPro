// Initialize AOS animations
AOS.init({
    once: true,
    offset: 100,
});

// ──────────────────────────────────────────────
// Mobile Menu Toggle
// ──────────────────────────────────────────────
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    const menuIcon = menuBtn.querySelector('i');
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (mobileMenu.classList.contains('hidden')) {
            menuIcon.classList.replace('fa-times', 'fa-bars');
        } else {
            menuIcon.classList.replace('fa-bars', 'fa-times');
        }
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.replace('fa-times', 'fa-bars');
        });
    });
}

// ──────────────────────────────────────────────
// Navbar shadow on scroll
// ──────────────────────────────────────────────
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) {
        nav.classList.toggle('shadow-md', window.scrollY > 20);
    }
});

// ──────────────────────────────────────────────
// FAQ Accordion
// ──────────────────────────────────────────────
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const faqBtn = item.querySelector('.faq-btn');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('i');

    if (faqBtn && content) {
        faqBtn.addEventListener('click', () => {
            const isOpen = !content.classList.contains('hidden');

            // Close all others
            faqItems.forEach(other => {
                other.querySelector('.faq-content').classList.add('hidden');
                other.querySelector('i').classList.remove('rotate-180');
            });

            if (!isOpen) {
                content.classList.remove('hidden');
                if (icon) icon.classList.add('rotate-180');
            }
        });
    }
});

// ──────────────────────────────────────────────
// SUCCESS MODAL helpers
// ──────────────────────────────────────────────
function showModal() {
    const modal = document.getElementById('success-modal');
    const box   = document.getElementById('modal-box');
    if (!modal) return;
    modal.classList.remove('hidden');
    // Small delay to trigger CSS transition
    setTimeout(() => box.classList.replace('scale-95', 'scale-100'), 10);
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    const modal = document.getElementById('success-modal');
    const box   = document.getElementById('modal-box');
    if (!modal) return;
    box.classList.replace('scale-100', 'scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 250);
}

document.getElementById('modal-close-btn')?.addEventListener('click', hideModal);
document.getElementById('modal-overlay')?.addEventListener('click', hideModal);

// ──────────────────────────────────────────────
// FORM VALIDATION
// Numéros Yas (Togo) : commencent par 90, 91, 92, 93, 94, 95, 96, 97, 98, 99
// Numéros Moov (Togo) : commencent par 70, 71, 72, 73, 74, 75, 76, 77, 78, 79
// Format accepté : 8 chiffres (sans indicatif) ou +228 + 8 chiffres
// ──────────────────────────────────────────────
function validateTogoPhone(raw) {
    // Remove spaces, dashes, dots, parentheses
    let digits = raw.replace(/[\s\-\.\(\)]/g, '');

    // Remove country code if present
    if (digits.startsWith('+228')) digits = digits.slice(4);
    if (digits.startsWith('00228')) digits = digits.slice(5);
    if (digits.startsWith('228') && digits.length === 11) digits = digits.slice(3);

    // Must be exactly 8 digits
    if (!/^\d{8}$/.test(digits)) return false;

    const prefix = parseInt(digits.slice(0, 2), 10);
    // Yas: 90-99  |  Moov: 70-79
    return (prefix >= 90 && prefix <= 99) || (prefix >= 70 && prefix <= 79);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

function setFieldError(fieldId, errorId, show) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (!field || !error) return;
    if (show) {
        field.classList.add('border-red-400', 'bg-red-50');
        field.classList.remove('border-gray-200', 'bg-gray-50');
        error.classList.remove('hidden');
    } else {
        field.classList.remove('border-red-400', 'bg-red-50');
        field.classList.add('border-gray-200', 'bg-gray-50');
        error.classList.add('hidden');
    }
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    // Real-time validation on blur
    document.getElementById('contact-phone')?.addEventListener('blur', function () {
        setFieldError('contact-phone', 'phone-error', !validateTogoPhone(this.value));
    });
    document.getElementById('contact-email')?.addEventListener('blur', function () {
        setFieldError('contact-email', 'email-error', !validateEmail(this.value));
    });

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name    = document.getElementById('contact-name')?.value.trim();
        const phone   = document.getElementById('contact-phone')?.value;
        const email   = document.getElementById('contact-email')?.value;
        const details = document.getElementById('contact-details')?.value.trim();

        let valid = true;

        // Validate phone
        if (!validateTogoPhone(phone)) {
            setFieldError('contact-phone', 'phone-error', true);
            valid = false;
        } else {
            setFieldError('contact-phone', 'phone-error', false);
        }

        // Validate email
        if (!validateEmail(email)) {
            setFieldError('contact-email', 'email-error', true);
            valid = false;
        } else {
            setFieldError('contact-email', 'email-error', false);
        }

        // Validate name
        if (!name) {
            document.getElementById('contact-name')?.classList.add('border-red-400');
            valid = false;
        } else {
            document.getElementById('contact-name')?.classList.remove('border-red-400');
        }

        // Validate details
        if (!details) {
            document.getElementById('contact-details')?.classList.add('border-red-400');
            valid = false;
        } else {
            document.getElementById('contact-details')?.classList.remove('border-red-400');
        }

        if (valid) {
            // Simulate sending — replace with a real fetch/Formspree call if needed
            showModal();
            contactForm.reset();
        }
    });
}
