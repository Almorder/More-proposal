const fs = require('fs');

const files = [
  'index.html', 'vision.html', 'product.html', 
  'destinations.html', 'experiences.html', 'contact.html', 'journal.html'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Manual replacements for the obvious double-encoded strings
        // PowerShell Get-Content without encoding reads as Windows-1252, then Set-Content with UTF8 writes it.
        // It's safer to use manual replacements to not break other things if it wasn't perfectly Windows-1252.
        let fixedContent = content
            .replace(/Ã©/g, 'é')
            .replace(/Ã€/g, 'À')
            .replace(/â‰¡/g, '≡')
            .replace(/Ã¨/g, 'è')
            .replace(/Ãª/g, 'ê')
            .replace(/Ã®/g, 'î')
            .replace(/Ã´/g, 'ô')
            .replace(/Ã»/g, 'û')
            .replace(/Ã§/g, 'ç')
            .replace(/Ã /g, 'à')
            .replace(/Ã¢/g, 'â')
            .replace(/Ã¯/g, 'ï')
            .replace(/Ã¼/g, 'ü')
            .replace(/Ã¦/g, 'æ')
            .replace(/Ãœ/g, 'Ü')
            .replace(/Ã-/g, 'í') // careful with this
            .replace(/Å“/g, 'œ')
            .replace(/Ã³/g, 'ó')
            .replace(/Ã«/g, 'ë');
            
        // We also had "ÀÀ propos" due to my previous regex bug
        fixedContent = fixedContent.replace(/ÀÀ propos/g, 'À propos');
        
        fs.writeFileSync(file, fixedContent, 'utf8');
        console.log(`Fixed encoding in ${file}`);
    }
});
