const fs = require('fs');

const files = ['index.html', 'vision.html', 'product.html', 'destinations.html', 'experiences.html', 'contact.html', 'journal.html'];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // 1. Fix broken encoding
        content = content.replace(/Exp\ufffdriences/g, 'Expériences');
        content = content.replace(/Expriences/g, 'Expériences');
        content = content.replace(/ExpǸriences/g, 'Expériences');
        
        content = content.replace(/\? propos/g, 'À propos');
        content = content.replace(/ propos/g, 'À propos');
        
        content = content.replace(/L\ufffdgal/g, 'Légal');
        content = content.replace(/Lgal/g, 'Légal');
        content = content.replace(/LǸgal/g, 'Légal');
        
        content = content.replace(/r\ufffdalit\ufffd/g, 'réalité');
        content = content.replace(/ralit/g, 'réalité');
        content = content.replace(/rǸalitǸ/g, 'réalité');
        
        content = content.replace(/r\ufffdve/g, 'rêve');
        content = content.replace(/rve/g, 'rêve');
        content = content.replace(/rǸve/g, 'rêve');

        // 2. Fix overlay menu 'Journal' to 'Archives'
        content = content.replace(/>Journal<\/a>/g, '>Archives</a>');

        // 3. Fix dummy social links
        content = content.replace(/href="#"(.*?)Fb</g, 'href="https://facebook.com/more" target="_blank"$1Fb<');
        content = content.replace(/href="#"(.*?)Ig</g, 'href="https://instagram.com/more" target="_blank"$1Ig<');
        content = content.replace(/href="#"(.*?)Tt</g, 'href="https://tiktok.com/@more" target="_blank"$1Tt<');
        
        content = content.replace(/href="#"(.*?)Instagram</g, 'href="https://instagram.com/more" target="_blank"$1Instagram<');
        content = content.replace(/href="#"(.*?)TikTok</g, 'href="https://tiktok.com/@more" target="_blank"$1TikTok<');
        content = content.replace(/href="#"(.*?)Pinterest</g, 'href="https://pinterest.com/more" target="_blank"$1Pinterest<');

        // 4. Fix utility links
        content = content.replace(/href="#"(.*?)FAQ</g, 'href="./contact.html"$1FAQ<');
        content = content.replace(/href="#"(.*?)Légal</g, 'href="./contact.html"$1Légal<');

        fs.writeFileSync(file, content);
        console.log(`Fixed encoding and links in ${file}`);
    }
});
