# Lessons Learned

## 2026-06-26 | Scripts regex cassaient les balises HTML | Ne JAMAIS utiliser de scripts automatisés regex pour modifier du HTML sans vérifier le résultat final ligne par ligne. Les regex sur du HTML multi-ligne sont imprévisibles.

## 2026-06-26 | PowerShell corrompait l'encodage UTF-8 | Toujours utiliser Node.js `fs.readFileSync/writeFileSync` avec `'utf8'` pour manipuler ces fichiers. Ne JAMAIS utiliser `Get-Content | Set-Content` sur des fichiers HTML avec des accents français.

## 2026-06-26 | Images référencées inexistantes (1.jpeg..8.jpeg supprimées) | Toujours vérifier que les fichiers images existent réellement dans le dossier AVANT de les référencer dans le HTML. Utiliser `Get-ChildItem` pour lister.

## 2026-07-01 | CSS manquant pour les classes HTML → mise en page cassée | Quand on crée du HTML avec des classes CSS, TOUJOURS vérifier que CHAQUE classe a sa définition dans style.css. L'accueil n'avait pas de CSS pour `.home-banner`, `.home-grid-3`, `.home-cat-card`, etc.

## 2026-07-01 | WhatsApp CTA sur toutes les pages = harcèlement | Le CTA WhatsApp ne doit apparaître QUE sur la page Contact. Ne jamais le mettre sur toutes les pages.

## 2026-07-01 | Toujours inclure la navigation desktop dans le header | Le header transparent doit avoir DEUX navigations : `transparent-nav` (visible desktop, caché mobile) + `home-hamburger` (visible mobile, caché desktop). Ne pas oublier l'une ou l'autre.

## 2026-07-01 | La page Destinations a besoin d'un vrai fond de carte | Un fond beige vide avec juste des points n'est pas professionnel. Utiliser une image de mappemonde élégante en fond.
