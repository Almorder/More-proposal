import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const menuOpen = document.getElementById('mobile-menu-open');
    const menuClose = document.getElementById('mobile-menu-close');
    const overlayMenu = document.getElementById('overlay-menu');

    if (menuOpen && overlayMenu) {
        menuOpen.addEventListener('click', () => {
            overlayMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (menuClose && overlayMenu) {
        menuClose.addEventListener('click', () => {
            overlayMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
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
