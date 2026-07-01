const fs = require('fs');
const path = require('path');

const template = fs.readFileSync(path.join(__dirname, 'product-amalfi.html'), 'utf8');

const products = [
  {
    file: 'product-santorini.html',
    title: 'Sunset in Santorini',
    desc: 'Un moment suspendu face à la caldeira au coucher du soleil. Une terrasse privée au-dessus des dômes bleus d\'Oia, éclairée à la lueur des bougies, avec un dîner exclusif préparé par un chef étoilé local.',
    img_hero: './images/cosmos_1500430456.jpeg', // from experiences card
    img_g1: './images/cosmos_416043126.jpeg',
    img_g2: './images/cosmos_369471361.jpeg',
    img_g3: './images/cosmos_1535491183.jpeg',
    img_g4: './images/cosmos_246000094.jpeg',
    img_g5: './images/cosmos_2064289037.jpeg',
    faq_time: 'Santorin est très prisée. Nous conseillons de réserver 4 à 6 mois à l\'avance, surtout pour la haute saison (mai à septembre).'
  },
  {
    file: 'product-paris.html',
    title: 'Paris Rooftop',
    desc: 'Un dîner secret sur un toit privé avec une vue imprenable sur la Tour Eiffel scintillante. Musique live acoustique, champagne grand cru et intimité totale au cœur de la ville de l\'amour.',
    img_hero: './images/cosmos_1535491183.jpeg',
    img_g1: './images/cosmos_78733047.jpeg',
    img_g2: './images/cosmos_1724555547.jpeg',
    img_g3: './images/cosmos_478706152.jpeg',
    img_g4: './images/cosmos_548671295.jpeg',
    img_g5: './images/cosmos_973128048.jpeg',
    faq_time: 'Les lieux exclusifs parisiens nécessitent environ 2 à 3 mois d\'anticipation pour garantir la privatisation.'
  },
  {
    file: 'product-como.html',
    title: 'Lake Como Escape',
    desc: 'L\'élégance intemporelle italienne. Une balade romantique en bateau Riva classique sur les eaux lisses du lac, suivie d\'une demande dans les jardins historiques d\'une villa privée.',
    img_hero: './images/cosmos_1274308923.jpeg',
    img_g1: './images/cosmos_324419349.jpeg',
    img_g2: './images/cosmos_105397273.jpeg',
    img_g3: './images/cosmos_1159482586.jpeg',
    img_g4: './images/cosmos_788873766.jpeg',
    img_g5: './images/cosmos_356688939.jpeg',
    faq_time: 'Le lac de Côme est accessible idéalement de mai à octobre. Une réservation 3 mois à l\'avance est recommandée.'
  },
  {
    file: 'product-marrakech.html',
    title: 'Marrakech Nights',
    desc: 'Une oasis privée sous les étoiles. Architecture envoûtante, pétales de roses, lumière tamisée de centaines de lanternes et la magie du désert marocain pour une soirée inoubliable.',
    img_hero: './images/cosmos_198496289.jpeg',
    img_g1: './images/cosmos_642438921.jpeg',
    img_g2: './images/cosmos_1123388353.jpeg',
    img_g3: './images/cosmos_245288959.jpeg',
    img_g4: './images/cosmos_896727462.jpeg',
    img_g5: './images/cosmos_945113702.jpeg',
    faq_time: 'Marrakech offre un climat agréable toute l\'année. Un délai de 2 mois est généralement suffisant pour orchestrer l\'expérience.'
  },
  {
    file: 'product-provence.html',
    title: 'Provence Lavender',
    desc: 'Une parenthèse parfumée au cœur des champs de lavande en fleur. Un pique-nique chic au coucher du soleil dans une quiétude absolue, incarnant la douceur de vivre provençale.',
    img_hero: './images/cosmos_1225314833.jpeg',
    img_g1: './images/cosmos_1078879472.jpeg',
    img_g2: './images/cosmos_70644383.jpeg',
    img_g3: './images/cosmos_68780865.jpeg',
    img_g4: './images/cosmos_1930580067.jpeg',
    img_g5: './images/cosmos_926842032.jpeg',
    faq_time: 'La floraison de la lavande est très courte (mi-juin à mi-juillet). Il est impératif de réserver 6 mois à l\'avance pour cette fenêtre temporelle unique.'
  }
];

products.forEach(p => {
  let content = template;
  
  // Replace title
  content = content.replace(/The Amalfi Proposal/g, p.title);
  
  // Replace description
  content = content.replace(/Une terrasse entièrement privatisée dominant la mer Tyrrhénienne[^<]+/, p.desc);
  
  // Replace hero image
  content = content.replace(/cosmos_1230863684\.jpeg/g, p.img_hero.replace('./images/', '')); // Actually, product.html doesn't have a hero image, wait let me check product.html structure. Ah, product-amalfi.html doesn't have a hero image! Let me check how it looks. It just has the gallery! 
  
  // Gallery images replacement
  // We'll just sequentially replace the first 5 cosmos_*.jpeg found in the file, which corresponds to the gallery.
  // Actually, product-amalfi.html has exactly 5 gallery images: 1868942636, 1953293394, 245288959, 2064289037, 197919993.
  const oldImgs = [
    'cosmos_1868942636.jpeg',
    'cosmos_1953293394.jpeg',
    'cosmos_245288959.jpeg',
    'cosmos_2064289037.jpeg',
    'cosmos_197919993.jpeg'
  ];
  const newImgs = [
    p.img_g1, p.img_g2, p.img_g3, p.img_g4, p.img_g5
  ];
  
  oldImgs.forEach((oldImg, idx) => {
    content = content.replace(new RegExp(oldImg, 'g'), newImgs[idx].replace('./images/', ''));
  });
  
  // Replace FAQ time answer
  content = content.replace(/Pour garantir la disponibilité des lieux exclusifs sur la côte amalfitaine[^<]+/, p.faq_time);

  // Replace page title
  content = content.replace(/<title>MORE \| The Amalfi Proposal<\/title>/, `<title>MORE | ${p.title}</title>`); // Or whatever the title is

  fs.writeFileSync(path.join(__dirname, p.file), content, 'utf8');
  console.log('Created ' + p.file);
});
