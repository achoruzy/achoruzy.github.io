// ===========================
// Load Content from JSON
// ===========================

let content = {};

async function loadContent() {
    try {
        const response = await fetch('content.json');
        content = await response.json();
        populateContent();
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

function populateContent() {
    // Meta tags
    document.title = content.meta.title;
    document.querySelector('meta[name="description"]').setAttribute('content', content.meta.description);
    document.querySelector('meta[name="keywords"]').setAttribute('content', content.meta.keywords);
    document.querySelector('meta[property="og:title"]').setAttribute('content', content.meta.ogTitle);
    document.querySelector('meta[property="og:description"]').setAttribute('content', content.meta.ogDescription);

    // Navigation
    content.navigation.links.forEach((link, index) => {
        const navLink = document.querySelectorAll('.nav-link')[index];
        if (navLink) {
            navLink.textContent = link.text;
            navLink.setAttribute('href', link.href);
        }
    });

    // Hero section
    document.querySelector('.hero-title').innerHTML = content.hero.title;
    document.querySelector('.hero-subtitle').textContent = content.hero.subtitle;
    document.querySelector('.hero .btn-primary').textContent = content.hero.cta;

    // About section
    document.querySelector('.about .section-title').textContent = content.about.title;
    const aboutTexts = document.querySelectorAll('.about-text');
    content.about.paragraphs.forEach((paragraph, index) => {
        if (aboutTexts[index]) {
            aboutTexts[index].textContent = paragraph;
        }
    });

    // Services section
    document.querySelector('.services .section-title').textContent = content.services.title;
    const serviceCards = document.querySelectorAll('.service-card');
    content.services.items.forEach((service, index) => {
        if (serviceCards[index]) {
            serviceCards[index].querySelector('.service-title').textContent = service.title;
            serviceCards[index].querySelector('.service-description').textContent = service.description;
            serviceCards[index].querySelector('.btn-secondary').textContent = service.cta;
        }
    });

    // Why Us section
    document.querySelector('.why-us .section-title').textContent = content.whyUs.title;
    const benefits = document.querySelectorAll('.benefit');
    content.whyUs.benefits.forEach((benefit, index) => {
        if (benefits[index]) {
            benefits[index].querySelector('.benefit-title').textContent = benefit.title;
            benefits[index].querySelector('.benefit-text').textContent = benefit.description;
        }
    });

    // Vessels section
    document.querySelector('.vessels .section-title').textContent = content.vessels.title;
    document.querySelector('.vessels-intro').textContent = content.vessels.intro;
    const vesselsList = document.querySelector('.vessels-list');
    vesselsList.innerHTML = '';
    content.vessels.types.forEach(type => {
        const li = document.createElement('li');
        li.textContent = type;
        vesselsList.appendChild(li);
    });
    document.querySelector('.vessels-outro').textContent = content.vessels.outro;

    // Process section
    document.querySelector('.process .section-title').textContent = content.process.title;
    const processSteps = document.querySelectorAll('.process-step');
    content.process.steps.forEach((step, index) => {
        if (processSteps[index]) {
            processSteps[index].querySelector('.process-number').textContent = step.number;
            processSteps[index].querySelector('.process-title').textContent = step.title;
            processSteps[index].querySelector('.process-text').textContent = step.description;
        }
    });

    // Contact section
    document.querySelector('.contact .section-title').textContent = content.contact.title;
    document.querySelector('.contact-intro').textContent = content.contact.intro;

    // Form labels
    document.querySelector('label[for="name"]').textContent = content.contact.form.labels.name + ' *';
    document.querySelector('label[for="company"]').textContent = content.contact.form.labels.company + ' *';
    document.querySelector('label[for="email"]').textContent = content.contact.form.labels.email + ' *';
    document.querySelector('label[for="phone"]').textContent = content.contact.form.labels.phone;
    document.querySelector('label[for="project-type"]').textContent = content.contact.form.labels.projectType + ' *';
    document.querySelector('label[for="message"]').textContent = content.contact.form.labels.message + ' *';

    // Project type options
    const projectTypeSelect = document.getElementById('project-type');
    projectTypeSelect.innerHTML = '';
    content.contact.form.projectTypes.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.text;
        projectTypeSelect.appendChild(opt);
    });

    // Submit button
    document.querySelector('.contact-form .btn-primary').textContent = content.contact.form.submit;

    // Alternative contact
    document.querySelector('.contact-info h3').textContent = content.contact.alternativeContact.title;
    document.querySelector('.contact-info a[href^="mailto"]').textContent = content.contact.alternativeContact.email;
    document.querySelector('.contact-info a[href^="mailto"]').setAttribute('href', `mailto:${content.contact.alternativeContact.email}`);
    document.querySelector('.contact-info a[target="_blank"]').textContent = content.contact.alternativeContact.linkedInText;
    document.querySelector('.contact-info a[target="_blank"]').setAttribute('href', content.contact.alternativeContact.linkedIn);
    document.querySelector('.contact-note').textContent = content.contact.alternativeContact.note;

    // Footer
    document.querySelector('.footer p:nth-child(2)').innerHTML = content.footer.copyright;
    document.querySelector('.footer p:nth-child(3)').textContent = content.footer.tagline;
    document.querySelector('.footer a[href^="mailto"]').textContent = content.footer.email;
    document.querySelector('.footer a[href^="mailto"]').setAttribute('href', `mailto:${content.footer.email}`);
}

// ===========================
// Mobile Navigation Toggle
// ===========================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===========================
// Active Navigation Highlighting
// ===========================

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===========================
// Smooth Scroll (Fallback for older browsers)
// ===========================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Only handle anchor links
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===========================
// Scroll-Triggered Fade-In Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(element => {
    observer.observe(element);
});

// ===========================
// Form Validation & Submission
// ===========================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    // Basic client-side validation
    const name = document.getElementById('name').value.trim();
    const company = document.getElementById('company').value.trim();
    const email = document.getElementById('email').value.trim();
    const projectType = document.getElementById('project-type').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !company || !email || !projectType || !message) {
        e.preventDefault();
        alert(content.validation?.fillAllFields || 'Please fill in all required fields.');
        return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        e.preventDefault();
        alert(content.validation?.invalidEmail || 'Please enter a valid email address.');
        return;
    }

    // Form will submit normally if validation passes
});

// ===========================
// Sticky Navigation on Scroll
// ===========================

const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 50) {
        nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        nav.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ===========================
// Initialize on Page Load
// ===========================

window.addEventListener('DOMContentLoaded', async () => {
    // Load content from JSON first
    await loadContent();

    // Trigger initial navigation highlight
    highlightNavigation();

    // Add visible class to hero elements immediately
    const heroElements = document.querySelectorAll('.hero .fade-in');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 150); // Stagger the animation
    });
});
