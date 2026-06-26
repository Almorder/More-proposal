const fs = require('fs');
const path = require('path');

const files = ['vision.html', 'experiences.html', 'journal.html', 'destinations.html', 'product.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Relative links
    content = content.replace(/href="\/([^"]+\.html)"/g, 'href="./$1"');
    content = content.replace(/href="\/"/g, 'href="./index.html"');
    
    // 2. Body js-loading
    content = content.replace(/<body class="dark-theme">/, '<body class="dark-theme js-loading">');
    content = content.replace(/<body>/, '<body class="js-loading">');

    // 3. Defer scripts
    content = content.replace(/<script src=/g, '<script defer src=');
    content = content.replace(/<script type="module" src=/g, '<script defer type="module" src=');

    // 4. WhatsApp link
    content = content.replace(/href="https:\/\/wa\.me\/[0-9]+"/g, 'href="https://wa.me/33667942463" target="_blank"');

    // 5. Mobile menu button inside header
    if (!content.includes('id="mobile-menu-open"')) {
        content = content.replace(
            /<div class="nav-right">([\s\S]*?)<\/div>/,
            '<div class="nav-right">$1</div>\n        <!-- Mobile Menu Trigger -->\n        <div class="mobile-menu-btn" id="mobile-menu-open">Menu</div>'
        );
    }

    // 6. Overlay menu after header
    if (!content.includes('id="overlay-menu"')) {
        const overlayHTML = `
    <!-- Mobile Overlay Menu -->
    <div class="overlay-menu" id="overlay-menu">
      <div class="mobile-menu-btn" id="mobile-menu-close" style="position:absolute; top:3rem; right:4vw;">Close</div>
      <a href="./experiences.html">Expériences</a>
      <a href="./destinations.html">Destinations</a>
      <a href="./journal.html">Journal</a>
      <a href="./vision.html">À propos</a>
      <a href="./contact.html" class="nav-inquire" style="margin-top:2rem;">Inquire</a>
    </div>
`;
        content = content.replace(/<\/header>/, `</header>\n${overlayHTML}`);
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
});
