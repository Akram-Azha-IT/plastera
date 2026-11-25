# Plastera

Site vitrine pour la représentation exclusive de Shibaura Machine en France et la commercialisation de matières premières pour la plasturgie.

## Installation

Prérequis : Node.js 20.9 ou une version ultérieure et npm.

```sh
npm ci
npm run dev
```

Le serveur de développement est accessible sur http://localhost:3000.

## Production

```sh
npm run build
npm start
```

## Technologies

- Next.js 16, React 19 et TypeScript.
- CSS global et CSS Modules pour les styles adaptatifs.
- GSAP et ScrollTrigger pour les animations.
- Lenis pour le défilement sur ordinateur ; défilement tactile natif sur mobile.
- Lucide pour les icônes.

Les animations respectent la préférence système de réduction des mouvements.

## Structure

| Dossier          | Contenu                                                   |
| ---------------- | --------------------------------------------------------- |
| `src/app`        | Pages, mise en page et styles globaux                     |
| `src/components` | Navigation, hero, catalogues et composants partagés       |
| `src/data`       | Machines, matières premières et contenu du site           |
| `src/lib`        | Logique des filtres, animations et préparation des emails |
| `public`         | Images et ressources statiques                            |
| `scripts`        | Tests de la logique applicative                           |
| `docs`           | Sources des photographies                                 |

Le catalogue machines est organisé par familles. Les matières premières sont réparties entre commodités et matières techniques. Le hero de l’accueil utilise `ShutterHero.tsx` : un carrousel GSAP à 14 volets verticaux, avec titre révélé caractère par caractère, aperçu produit et navigation au défilement. La saisie du titre est ralentie à 35 ms par caractère. La lecture automatique laisse au moins 6,5 secondes par scène et réserve un temps de lecture après la saisie. Elle se suspend hors écran, dans un onglet masqué, pendant une interaction ou via la commande de pause du cadre vidéo. Les préférences de réduction des animations sont respectées. La composition associe les photos industrielles, la police condensée Tanker et une vidéo Shibaura dans un cadre carré. Cette vidéo fournie est optimisée en 640 × 360, sans audio, et ne se lit que lorsque le hero est visible. En mode de réduction des animations, une action explicite permet de la lire. L’ancien `ProductHero.tsx` reste disponible dans le projet.

L’accueil présente le hero, les cartes d’accès machines/matières, les familles de machines, la bannière matières, les secteurs industriels et le contact. Le bloc « Vos ambitions. Nos solutions. » a été retiré pour éviter la répétition de l’offre.

`IndustrialApplications.tsx` reprend son style de cartes claires, de séparateurs pointillés et de boutons orange pour les trois secteurs : automobile, emballage et pièces techniques. Son seul en-tête est « Votre industrie. Notre terrain d’action. ». Les titres et boutons utilisent Tanker, comme le hero ; les paragraphes conservent Geist. Les photographies d’usines et les liens vers les secteurs de la page Applications sont réutilisés.

La présentation reprend le mécanisme de la section « Exclusive Partners » de [azharplastics.com](https://azharplastics.com/) : à partir de 1024 px, le titre reste fixé à gauche, à 128 px du haut, et les cartes se succèdent dans la colonne droite avec le défilement naturel de la page. Aucune fenêtre de défilement vertical interne n’est utilisée. Sous 1024 px, les cartes forment une rangée horizontale avec alignement par carte et avance automatique toutes les deux secondes. Cette avance ne fonctionne que lorsque la rangée est visible, se suspend au survol et au focus, s’arrête après une interaction manuelle, et respecte la préférence de réduction des animations. Les liens et l’affichage sans JavaScript restent accessibles.

`HomeMotion.tsx` coordonne les titres, les cartes d’accès et la bannière matières. Les anciens composants d’expertise non utilisés sont conservés dans les sources.

La direction des transitions s’inspire des expériences [Sticky Grid Scroll](https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/) et [On-Scroll Expanding Image](https://tympanus.net/codrops/2024/04/02/on-scroll-expanding-image-animation-within-typography/) de Codrops, avec une implémentation propre au site.

## Contact

Le formulaire prépare un email prérempli à destination de `contact@plastera-europe.com` et ouvre la messagerie séparément. Le visiteur vérifie le contenu puis effectue l’envoi dans sa messagerie. Le site ne dispose pas de service d’envoi d’emails côté serveur et n’enregistre pas les champs du formulaire.

## Tests

```sh
npm run test:catalog
node scripts/check-material-selection.cjs
node scripts/check-material-gallery.cjs
node scripts/check-hero-carousel.cjs
node scripts/check-shutter-hero.cjs
node scripts/check-approach-orbit.cjs
node scripts/check-expertise-journey.cjs
node scripts/check-contact-email.cjs
```

`npm run build` vérifie également les types TypeScript et la génération des pages.

## Crédits

Les licences du carrousel et des photographies sont détaillées dans [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Les sources des images industrielles figurent dans [docs/application-image-sources.md](docs/application-image-sources.md). Les crédits photographiques sont également accessibles sur la page `/credits-photos` du site.


La palette d’accent est orange sur toutes les pages : les couleurs partagées sont définies dans `globals.css`. Le logo réutilise le visuel transparent sous forme de masque CSS orange, y compris au-dessus du hero. Les cartes d’accès machines et matières restent compactes sur ordinateur et côte à côte sur mobile.
