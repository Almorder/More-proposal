import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    console.log('MORE Experiences initialized (Gen Z Rich).');

    // Mobile Menu Logic
    const menuOpen = document.getElementById('mobile-menu-open');
    const menuClose = document.getElementById('mobile-menu-close');
    const overlayMenu = document.getElementById('overlay-menu');

    if (menuOpen && menuClose && overlayMenu) {
        menuOpen.addEventListener('click', () => {
            overlayMenu.classList.add('active');
        });
        menuClose.addEventListener('click', () => {
            overlayMenu.classList.remove('active');
        });

        // Close menu when a link is clicked (better UX)
        const overlayLinks = overlayMenu.querySelectorAll('a');
        overlayLinks.forEach(link => {
            link.addEventListener('click', () => {
                overlayMenu.classList.remove('active');
            });
        });
    }

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Toggle active class
                item.classList.toggle('active');
            });
        }
    });
});
