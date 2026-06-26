import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    console.log('MORE Experiences initialized (Gen Z Rich).');

    // Initialize Lenis for Smooth Scroll
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        
        // Connect Lenis to GSAP ScrollTrigger
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.ticker.add((time)=>{
              lenis.raf(time * 1000)
            })
            gsap.ticker.lagSmoothing(0)
        }
    }

    // GSAP Animations
    if (typeof gsap !== 'undefined') {
        // Hero text stagger
        gsap.from('.stagger-text', {
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: 'power4.out',
            delay: 0.2
        });

        gsap.from('.fade-in', {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.5
        });

        // Image reveals on scroll
        if (typeof ScrollTrigger !== 'undefined') {
            const revealImgs = document.querySelectorAll('.reveal-img');
            revealImgs.forEach(img => {
                gsap.from(img, {
                    scrollTrigger: {
                        trigger: img,
                        start: 'top 85%',
                    },
                    y: 100,
                    opacity: 0,
                    duration: 1.5,
                    ease: 'power3.out'
                });
            });

            // Subtle parallax for hero
            gsap.to('.hero-img', {
                scrollTrigger: {
                    trigger: '.hero-organic',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                yPercent: 20,
                ease: 'none'
            });
        }
    }

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if(question) {
            question.addEventListener('click', () => {
                item.classList.toggle('active');
                const icon = item.querySelector('.faq-icon');
                if (item.classList.contains('active')) {
                    icon.textContent = '-';
                } else {
                    icon.textContent = '+';
                }
            });
        }
    });
});
