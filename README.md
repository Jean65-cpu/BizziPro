# SCALEBIZZ - Agence Web à Kara

SCALEBIZZ est une agence web située à Kara, au Togo, spécialisée dans la création de sites internet professionnels, vitrines et e-commerce.

## Architecture du projet

Le projet est constitué d'une page d'atterrissage (Landing Page) structurée en plusieurs fichiers pour une meilleure maintenabilité :

- **`index.html`** : Le fichier principal contenant la structure sémantique de la page.
- **`css/style.css`** : Contient les styles CSS personnalisés qui ne sont pas couverts par Tailwind CSS (ex: effet glassmorphism, textes avec dégradé).
- **`js/tailwind-config.js`** : Fichier de configuration de Tailwind CSS définissant les couleurs personnalisées et la police d'écriture (Poppins).
- **`js/script.js`** : Contient la logique d'interaction du site, notamment :
  - L'initialisation des animations AOS.
  - Le menu de navigation mobile.
  - L'effet de flou et l'ombre au défilement de la barre de navigation.
  - Le système d'accordéon pour la section FAQ.

## Technologies utilisées

- **HTML5**
- **Tailwind CSS** (via CDN) pour le stylisme utilitaire rapide.
- **Vanilla JavaScript** pour la logique front-end.
- **Google Fonts** (Poppins).
- **FontAwesome** pour les icônes.
- **AOS** (Animate On Scroll) pour les animations à l'apparition des éléments.

## Déploiement

Le site est statique et peut être déployé sur n'importe quel hébergement (Vercel, Netlify, GitHub Pages, ou un hébergement mutualisé classique).

## Contact

Pour plus d'informations ou pour un devis, contactez l'agence sur `contact@scalebizz.tg` ou via le bouton WhatsApp intégré au site.
