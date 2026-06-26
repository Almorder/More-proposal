const fs = require('fs');
const path = require('path');

const files = ['index.html', 'vision.html', 'product.html', 'destinations.html', 'experiences.html', 'contact.html', 'journal.html'];

const newFooter = `
    <!-- MEGA FOOTER -->
    <footer class="site-footer-mega">
      <div class="footer-top">
        
        <!-- Col 1: Brand -->
        <div class="footer-brand">
          <img src="./images/logo-dark.png" alt="MORE" class="footer-logo" />
          <div class="footer-socials">
            <a href="#">Fb</a>
            <a href="#">Ig</a>
            <a href="#">Tt</a>
          </div>
        </div>

        <!-- Col 2: Newsletter -->
        <div class="footer-newsletter">
          <h4>Curate your memories.</h4>
          <p>Inscrivez-vous pour recevoir des inspirations d'expériences romantiques exclusives.</p>
          <div class="newsletter-form">
            <input type="email" placeholder="Votre email" />
            <button>Rejoindre</button>
          </div>
        </div>

        <!-- Col 3: Explore -->
        <div class="footer-links">
          <h5>Explore</h5>
          <ul>
            <li><a href="./experiences.html">Expériences</a></li>
            <li><a href="./destinations.html">Destinations</a></li>
            <li><a href="./journal.html">Archives</a></li>
            <li><a href="./vision.html">À propos</a></li>
          </ul>
        </div>

        <!-- Col 4: Support -->
        <div class="footer-links">
          <h5>Support</h5>
          <ul>
            <li><a href="./contact.html">Consultation</a></li>
            <li><a href="./contact.html">Contact</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Légal</a></li>
          </ul>
        </div>

        <!-- Col 5: Social -->
        <div class="footer-links">
          <h5>Social</h5>
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">TikTok</a></li>
            <li><a href="#">Pinterest</a></li>
            <li><a href="https://wa.me/33667942463">WhatsApp</a></li>
          </ul>
        </div>

      </div>

      <div class="footer-bottom">
        <p>© 2024 MORE. Moments beautiful enough to become memories.</p>
        <p>All rights reserved. | Mentions Légales</p>
      </div>
    </footer>
`;

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        // Replace old footer with new footer
        // The old footer always starts with <footer class="site-footer" and ends with </footer>
        content = content.replace(/<footer class="site-footer"[\s\S]*?<\/footer>/, newFooter.trim());
        fs.writeFileSync(file, content);
        console.log(`Updated footer in ${file}`);
    }
});
