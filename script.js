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
