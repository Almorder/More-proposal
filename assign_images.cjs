const fs = require('fs');

const archImages = [
    'cosmos_1274308923.jpeg', 'cosmos_198496289.jpeg', 'cosmos_2020918112.jpeg',
    'cosmos_246000094.jpeg', 'cosmos_31627114.jpeg', 'cosmos_324419349.jpeg',
    'cosmos_356688939.jpeg', 'cosmos_369471361.jpeg', 'cosmos_478706152.jpeg',
    'cosmos_642438921.jpeg', 'cosmos_78733047.jpeg'
];

const lifeImages = [
    'cosmos_1123388353.jpeg', 'cosmos_1159482586.jpeg', 'cosmos_120081130.jpeg',
    'cosmos_1225314833.jpeg', 'cosmos_1563972361.jpeg', 'cosmos_1930580067.jpeg',
    'cosmos_2009750659.jpeg', 'cosmos_2110169448.jpeg', 'cosmos_393313280.jpeg',
    'cosmos_411292309.jpeg', 'cosmos_416043126.jpeg', 'cosmos_70644383.jpeg',
    'cosmos_8702880.jpeg', 'cosmos_896727462.jpeg', 'cosmos_973128048.jpeg'
];

const portImages = [
    'cosmos_105397273.jpeg', 'cosmos_1078879472.jpeg', 'cosmos_1230863684.jpeg',
    'cosmos_1500430456.jpeg', 'cosmos_1535491183.jpeg', 'cosmos_1724555547.jpeg',
    'cosmos_1868942636.jpeg', 'cosmos_1953293394.jpeg', 'cosmos_197919993.jpeg',
    'cosmos_2064289037.jpeg', 'cosmos_245288959.jpeg', 'cosmos_458189247.jpeg',
    'cosmos_548671295.jpeg', 'cosmos_68780865.jpeg', 'cosmos_788873766.jpeg',
    'cosmos_926842032.jpeg', 'cosmos_945113702.jpeg'
];

const allImages = [...archImages, ...lifeImages, ...portImages];

// Function to shuffle an array
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

const files = [
  'index.html', 'vision.html', 'product.html', 
  'destinations.html', 'experiences.html', 'contact.html', 'journal.html'
];

// Special fixed images for common elements
const ctaImage = 'cosmos_245288959.jpeg'; // A fixed one for WhatsApp CTA
const heroImage = 'cosmos_478706152.jpeg'; // A fixed one for home hero
const bannerImage = 'cosmos_8702880.jpeg'; // A fixed one for home banner

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        let shuffledArch = shuffle([...archImages]);
        let shuffledLife = shuffle([...lifeImages]);
        let shuffledPort = shuffle([...portImages]);
        let shuffledAll = shuffle([...allImages]);

        // Regex to match src="./images/1.jpeg" or url('./images/2.jpeg')
        let modifiedContent = content.replace(/(?:src=|url\(['"]?)\.\/images\/([1-8])\.jpeg['"]?\)?/g, (match, p1, offset) => {
            
            let img = '';
            
            // Logic based on file
            if (file === 'destinations.html') {
                img = shuffledArch.pop() || shuffledAll.pop();
            } else if (file === 'experiences.html') {
                img = (Math.random() > 0.5 ? shuffledLife.pop() : shuffledPort.pop()) || shuffledAll.pop();
            } else if (file === 'journal.html') {
                img = shuffledAll.pop();
            } else {
                img = shuffledAll.pop();
            }

            // Fallback
            if (!img) img = 'cosmos_1953293394.jpeg';

            // Ensure WhatsApp CTA uses a consistent nice image
            if (content.substring(offset - 100, offset).includes('cta-w-image')) {
                img = ctaImage;
            }
            if (file === 'index.html' && content.substring(offset - 100, offset).includes('home-hero-bg')) {
                img = heroImage;
            }
            if (file === 'index.html' && content.substring(offset - 100, offset).includes('home-banner-bg')) {
                img = bannerImage;
            }

            // Return correct format based on match
            if (match.startsWith('src=')) {
                return `src="./images/${img}"`;
            } else {
                return `url('./images/${img}')`;
            }
        });

        fs.writeFileSync(file, modifiedContent, 'utf8');
        console.log(`Updated images in ${file}`);
    }
});
