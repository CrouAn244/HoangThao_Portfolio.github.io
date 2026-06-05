/* ==========================================================================
   PORTFOLIO INTERACTIVE SCRIPTS - HOÀNG PHƯƠNG THẢO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize functions
    initNavbarScroll();
    initMobileMenu();
    initFadeEffect();
    initTabSwitcher();
    initScrollReveal();
    initCanvasParticles();
    initLightbox();
});

/* ==========================================================================
   NAVIGATION BAR SCROLL EFFECTS
   ========================================================================== */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    const threshold = 10;
    
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Background color change on scroll
        if (scrollTop > 50) {
            navbar.classList.add('scroll-up');
        } else {
            navbar.classList.remove('scroll-up');
        }
        
        // Hide/Show navbar on scroll direction
        if (Math.abs(lastScrollTop - scrollTop) <= threshold) return;
        
        if (scrollTop > lastScrollTop && scrollTop > 80) {
            // Scroll Down - Hide Navbar
            navbar.classList.add('scroll-down');
        } else {
            // Scroll Up - Show Navbar
            navbar.classList.remove('scroll-down');
        }
        lastScrollTop = scrollTop;
    });
}

/* ==========================================================================
   MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-toggle-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            toggleBtn.classList.toggle('active');
            
            // Toggle hamburger animation
            const spans = toggleBtn.querySelectorAll('span');
            if (toggleBtn.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                toggleBtn.classList.remove('active');
                
                const spans = toggleBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

/* ==========================================================================
   HERO FADE TRANSITION EFFECT
   ========================================================================== */
function initFadeEffect() {
    const textElement = document.getElementById('fade-text');
    if (!textElement) return;

    // HTML slides with correct styled components to preserve original colors
    const slides = [
        'Chuyên ngành <span class="highlight-text">Luật học</span>',
        '<span class="highlight-text">Trường Đại học Luật Hà Nội</span>'
    ];
    let index = 0;

    function switchText() {
        textElement.classList.add('fade-out');
        
        setTimeout(() => {
            index = (index + 1) % slides.length;
            textElement.innerHTML = slides[index];
            textElement.classList.remove('fade-out');
        }, 400); // 400ms matches the CSS fade-out transition time
    }

    // Switch slide every 4 seconds (including transition duration)
    setInterval(switchText, 4000);
}

/* ==========================================================================
   DASHBOARD TABS SWITCHER
   ========================================================================== */
function initTabSwitcher() {
    const tabs = document.querySelectorAll('.tab-item');
    const panels = document.querySelectorAll('.tab-panel');
    const projectSection = document.getElementById('projects');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active classes
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active to current
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);
            
            if (targetPanel) {
                targetPanel.classList.add('active');
                
                // If in mobile layout, scroll down to the content body when clicking a tab
                if (window.innerWidth <= 1024) {
                    const contentContainer = document.querySelector('.dashboard-content');
                    contentContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    });
}

/* ==========================================================================
   INTERACTIVE FOLDER TREE (Exercise 1)
   ========================================================================== */
window.toggleFolder = function(element) {
    const parent = element.parentElement;
    const children = parent.querySelector('.tree-children');
    const arrow = element.querySelector('.arrow-icon');
    const folderIcon = element.querySelector('.folder-icon');

    if (children) {
        if (children.style.display === 'none' || !children.style.display) {
            children.style.display = 'block';
            arrow.textContent = '▼';
            folderIcon.textContent = '📂';
        } else {
            children.style.display = 'none';
            arrow.textContent = '▶';
            folderIcon.textContent = '📁';
        }
    }
};

/* ==========================================================================
   SCROLL REVEAL (Intersection Observer)
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target); // Reveal only once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(element => {
            element.classList.add('reveal-visible');
        });
    }

    // Connect navigation active indicators on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   PREMIUM BACKGROUND PARTICLES SYSTEM (Canvas)
   ========================================================================== */
function initCanvasParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Handle Resize
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Particle Object
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5; // Small, subtle dots
            this.speedX = Math.random() * 0.2 - 0.1; // Very slow drift
            this.speedY = Math.random() * -0.3 - 0.1; // Slowly drift upwards
            this.color = Math.random() > 0.5 ? 'rgba(59, 94, 148, 0.08)' : 'rgba(197, 168, 128, 0.12)';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Loop back to screen if out of bounds
            if (this.y < 0) {
                this.y = height;
                this.x = Math.random() * width;
            }
            if (this.x < 0 || this.x > width) {
                this.x = Math.random() * width;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // Generate Particles
    function init() {
        const numberOfParticles = Math.min(60, Math.floor((width * height) / 25000));
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();
}

/* ==========================================================================
   INTERACTIVE COMPONENT CONTROL LOGIC
   ========================================================================== */

// Slider states store
const sliderStates = {};
const simpleSliderStates = {};

// Step Slider Controller (Tasks 1, 4 & 6)
window.moveSlide = function(sliderId, direction) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    const slides = slider.querySelectorAll('.walkthrough-slide');
    const dots = slider.querySelectorAll('.slider-indicators .dot');
    if (slides.length === 0) return;
    
    let currentIndex = sliderStates[sliderId] || 0;
    slides[currentIndex].classList.remove('active');
    if (dots.length > currentIndex) dots[currentIndex].classList.remove('active');
    
    currentIndex = (currentIndex + direction + slides.length) % slides.length;
    sliderStates[sliderId] = currentIndex;
    
    slides[currentIndex].classList.add('active');
    if (dots.length > currentIndex) dots[currentIndex].classList.add('active');
};

window.jumpToSlide = function(sliderId, index) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    const slides = slider.querySelectorAll('.walkthrough-slide');
    const dots = slider.querySelectorAll('.slider-indicators .dot');
    if (slides.length === 0) return;
    
    let currentIndex = sliderStates[sliderId] || 0;
    slides[currentIndex].classList.remove('active');
    if (dots.length > currentIndex) dots[currentIndex].classList.remove('active');
    
    currentIndex = index;
    sliderStates[sliderId] = currentIndex;
    
    slides[currentIndex].classList.add('active');
    if (dots.length > currentIndex) dots[currentIndex].classList.add('active');
};

// Mini/Simple Image Slider Controller (Tasks 3, 5)
window.moveSimpleSlide = function(sliderId, direction) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    const wrapper = slider.querySelector('.slider-wrapper');
    if (!wrapper) return;
    const images = wrapper.querySelectorAll('img');
    if (images.length === 0) return;
    
    let currentIndex = simpleSliderStates[sliderId];
    if (currentIndex === undefined) {
        const imgArr = Array.from(images);
        const activeIdx = imgArr.findIndex(img => img.classList.contains('active'));
        currentIndex = activeIdx >= 0 ? activeIdx : 0;
    }
    
    images[currentIndex].classList.remove('active');
    
    currentIndex = (currentIndex + direction + images.length) % images.length;
    simpleSliderStates[sliderId] = currentIndex;
    
    images[currentIndex].classList.add('active');
};

// Academic Report Section Switcher (Tasks 2 & 5)
window.switchReportSection = function(taskId, sectionId, element) {
    const viewer = element.closest('.academic-report-viewer');
    if (!viewer) return;
    
    // Deactivate all TOC items in this report viewer
    const tocItems = viewer.querySelectorAll('.toc-item');
    tocItems.forEach(item => item.classList.remove('active'));
    
    // Activate clicked TOC item
    element.classList.add('active');
    
    // Hide all sections in this report viewer
    const sections = viewer.querySelectorAll('.report-section');
    sections.forEach(sec => sec.classList.remove('active'));
    
    // Show target section
    const targetSection = viewer.querySelector('#' + sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Scroll the report content panel to top
        const contentPanel = viewer.querySelector('.report-content-panel');
        if (contentPanel) {
            contentPanel.scrollTop = 0;
        }
    }
};

// Prompt Level Tab Switcher (Task 3)
window.switchPromptTab = function(element, panelId) {
    const container = element.closest('.prompt-tabs-container');
    if (!container) return;
    
    // Deactivate all prompt buttons
    const buttons = container.querySelectorAll('.prompt-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Activate clicked button
    element.classList.add('active');
    
    // Hide all panel items
    const panels = container.querySelectorAll('.prompt-panel-item');
    panels.forEach(p => p.classList.remove('active'));
    
    // Show target panel
    const targetPanel = container.querySelector('#' + panelId);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
};

// Accordion Toggler (Task 3)
window.toggleAccordion = function(header) {
    const item = header.parentElement;
    if (!item) return;
    const content = item.querySelector('.accordion-content');
    const icon = header.querySelector('.accordion-icon');
    if (!content || !icon) return;
    
    // Toggle active state
    item.classList.toggle('active');
    
    if (item.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.padding = '16px 20px';
        content.style.borderTop = '1px solid rgba(0,0,0,0.06)';
        icon.textContent = '−';
        icon.style.transform = 'rotate(180deg)';
    } else {
        content.style.maxHeight = '0';
        content.style.padding = '0 20px';
        content.style.borderTop = '1px solid transparent';
        icon.textContent = '+';
        icon.style.transform = 'none';
    }
};

// University Policy Explorer Switcher (Task 6)
window.switchPolicyTab = function(element, panelId) {
    const container = element.closest('.policy-explorer');
    if (!container) return;
    
    // Deactivate all policy tabs
    const tabs = container.querySelectorAll('.policy-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Activate clicked tab
    element.classList.add('active');
    
    // Hide all policy panels
    const panels = container.querySelectorAll('.policy-panel');
    panels.forEach(p => p.classList.remove('active'));
    
    // Show target policy panel
    const targetPanel = container.querySelector('#' + panelId);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
};

// Lightbox Modal Controller (Global)
function initLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    
    if (!modal || !img || !caption) return;
    
    // Listen for clicks on lightbox-trigger elements (images)
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('lightbox-trigger')) {
            modal.style.display = 'block';
            img.src = e.target.src;
            img.alt = e.target.alt || 'Ảnh minh chứng';
            caption.textContent = e.target.alt || 'Ảnh minh chứng';
            document.body.style.overflow = 'hidden'; // Lock scrolling
        }
    });
    
    // Close modal function
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Bind close click events
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === closeBtn) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

