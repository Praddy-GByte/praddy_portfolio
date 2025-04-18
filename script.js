// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    try {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100,
                easing: 'ease-out-cubic'
            });
            console.log('AOS initialized successfully');
        } else {
            console.error('AOS library not loaded');
        }

        // Smooth scrolling for navigation links
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
        console.log('Smooth scrolling initialized');

        // Navbar background change on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            let lastScrollTop = 0;
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset;
                
                // Change navbar background on scroll
                if (scrollTop > 50) {
                    navbar.style.backgroundColor = 'rgba(26, 26, 46, 0.95)';
                    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.style.backgroundColor = 'transparent';
                    navbar.style.boxShadow = 'none';
                }
                
                // Hide/show navbar on scroll
                if (scrollTop > lastScrollTop) {
                    navbar.style.transform = 'translateY(-100px)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
                lastScrollTop = scrollTop;
            });
            console.log('Navbar scroll effect initialized');
        }

        // Animate progress bars on scroll
        const progressBars = document.querySelectorAll('.progress-bar');
        const animateProgressBars = () => {
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        };

        // Intersection Observer for animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    if (entry.target.classList.contains('progress-bar')) {
                        animateProgressBars();
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all sections and elements that need animation
        document.querySelectorAll('.section-title, .skill-category, .timeline-item, .publication-card, .project-card, .contact-form').forEach(el => {
            observer.observe(el);
        });

        // Form submission handling
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // Here you would typically send the data to a server
                // For now, we'll just show a success message
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
                
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                    alert('Thank you for your message! I will get back to you soon.');
                    this.reset();
                }, 1500);
            });
            console.log('Contact form initialized');
        }

        // Add current year to footer
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.innerHTML = `&copy; ${new Date().getFullYear()} Dr. Pradeepika Kaushik. All rights reserved.`;
        }

        // Typing effect for hero section
        const heroText = document.querySelector('.typing-text');
        if (heroText) {
            const text = heroText.textContent;
            heroText.textContent = '';
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroText.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            typeWriter();
        }

        // Add scroll to top button
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top';
        document.body.appendChild(scrollToTopBtn);

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });

        // Add styles for scroll to top button
        const style = document.createElement('style');
        style.textContent = `
            .scroll-to-top {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--gradient);
                color: white;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: none;
                cursor: pointer;
                display: none;
                font-size: 20px;
                transition: var(--transition);
                z-index: 1000;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            
            .scroll-to-top:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            }
        `;
        document.head.appendChild(style);

        // Add hover effect to project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add parallax effect to hero section
        const heroSection = document.querySelector('.hero-section');
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });

        // Add active state to navigation links
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Project Category Tabs
        const categoryTabs = document.querySelectorAll('.category-tab');
        const projectCategories = document.querySelectorAll('.project-category');

        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and categories
                categoryTabs.forEach(t => t.classList.remove('active'));
                projectCategories.forEach(category => category.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Show corresponding category
                const categoryId = tab.getAttribute('data-category');
                document.getElementById(categoryId).classList.add('active');
            });
        });

        // Initialize first tab as active
        if (categoryTabs.length > 0) {
            categoryTabs[0].classList.add('active');
            projectCategories[0].classList.add('active');
        }

        // Add typing effect to hero subtitle
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            const text = heroSubtitle.textContent;
            heroSubtitle.textContent = '';
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroSubtitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            setTimeout(typeWriter, 1000);
        }

        // Add hover effect to profile image
        const profileFrame = document.querySelector('.profile-frame');
        if (profileFrame) {
            profileFrame.addEventListener('mouseenter', () => {
                profileFrame.style.transform = 'translateY(-10px) rotate(3deg)';
            });
            
            profileFrame.addEventListener('mouseleave', () => {
                profileFrame.style.transform = 'translateY(0) rotate(0)';
            });
        }

        // Add smooth reveal animation to sections
        const revealElements = document.querySelectorAll('.section-title, .skill-category, .timeline-item, .project-card, .publication-card');

        const revealOnScroll = () => {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('reveal');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll();

        // Three.js Background Animation
        // Create container for Three.js
        const container = document.createElement('div');
        container.id = 'threejs-container';
        document.body.insertBefore(container, document.body.firstChild);

        // Wrap main content
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.classList.add('content-wrapper');
        }

        // Three.js setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);

        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        // Create material
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0xffffff,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        // Create mesh
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Camera position
        camera.position.z = 5;

        // Mouse movement effect
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // Animation
        function animate() {
            requestAnimationFrame(animate);

            // Rotate particles
            particlesMesh.rotation.x += 0.0005;
            particlesMesh.rotation.y += 0.0005;

            // Mouse interaction
            particlesMesh.rotation.x += mouseY * 0.0005;
            particlesMesh.rotation.y += mouseX * 0.0005;

            renderer.render(scene, camera);
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Start animation
        animate();

    } catch (error) {
        console.error('Error initializing website:', error);
    }
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add parallax effect to hero section
const heroSection = document.querySelector('.hero-section');
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});

// Add active state to navigation links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Project Category Tabs
const categoryTabs = document.querySelectorAll('.category-tab');
const projectCategories = document.querySelectorAll('.project-category');

categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and categories
        categoryTabs.forEach(t => t.classList.remove('active'));
        projectCategories.forEach(category => category.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding category
        const categoryId = tab.getAttribute('data-category');
        document.getElementById(categoryId).classList.add('active');
    });
});

// Initialize first tab as active
if (categoryTabs.length > 0) {
    categoryTabs[0].classList.add('active');
    projectCategories[0].classList.add('active');
}

// Add typing effect to hero subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    setTimeout(typeWriter, 1000);
}

// Add hover effect to profile image
const profileFrame = document.querySelector('.profile-frame');
if (profileFrame) {
    profileFrame.addEventListener('mouseenter', () => {
        profileFrame.style.transform = 'translateY(-10px) rotate(3deg)';
    });
    
    profileFrame.addEventListener('mouseleave', () => {
        profileFrame.style.transform = 'translateY(0) rotate(0)';
    });
}

// Add smooth reveal animation to sections
const revealElements = document.querySelectorAll('.section-title, .skill-category, .timeline-item, .project-card, .publication-card');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('reveal');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); 