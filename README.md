# 📚 TechShare

<div align="center">

![TechShare Banner](https://img.shields.io/badge/TechShare-Ressources%20Informatiques-7c3aed?style=for-the-badge&logo=bookstack&logoColor=white)

**Plateforme statique de partage de ressources informatiques**  
Livres · Cours · Outils · Documentation — dans le respect total des droits d'auteur.

<br>

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/Licence-CC%20BY%204.0-9d5cff?style=flat-square)](https://creativecommons.org/licenses/by/4.0/)
[![Responsive](https://img.shields.io/badge/Responsive-100%25-4ade80?style=flat-square)](#)
[![No Dependencies](https://img.shields.io/badge/Dépendances-0-22d3ee?style=flat-square)](#)

<br>

| 📁 Fichiers | 📚 Livres | 🗂 Catégories | ⚡ Dépendances |
|:-----------:|:---------:|:-------------:|:--------------:|
| **5**       | **32+**   | **12**        | **0**          |

</div>

---

## 📋 Table des matières

- [✨ Présentation](#-présentation)
- [🗂 Structure du projet](#-structure-du-projet)
- [🚀 Installation & déploiement](#-installation--déploiement)
- [📖 Ajouter un livre](#-ajouter-un-livre)
- [🔧 Ajouter une ressource](#-ajouter-une-ressource)
- [🎨 Personnalisation](#-personnalisation)
- [🗃 Catégories disponibles](#-catégories-disponibles)
- [⚖️ Licences supportées](#️-licences-supportées)
- [📋 Changelog](#-changelog)
- [👤 Auteur](#-auteur)

---

## ✨ Présentation

**TechShare** est un site web **100% statique** — HTML + CSS + JavaScript vanilla pur — permettant d'organiser, partager et diffuser des ressources informatiques avec une gestion rigoureuse des licences et des droits d'auteur.

> Aucun serveur · Aucune base de données · Aucun framework · Aucun build step

Toutes les données sont centralisées dans un unique fichier [`data.js`](#-ajouter-un-livre) que le propriétaire édite directement. Le déploiement se fait en glisser-déposer.

### Fonctionnalités principales

| Fonctionnalité | Description |
|---|---|
| 📚 **Bibliothèque de livres** | Section dédiée avec couvertures, vue grille/liste, livres en vedette et modal détaillée |
| 🔍 **Recherche temps réel** | Filtrage instantané sur titre, auteur, catégorie et tags |
| 🌙 **Dark / Light mode** | Bascule persistante via `localStorage` — thème violet sombre par défaut |
| 🛡 **Gestion des licences** | CC BY, MIT, GPL, Apache, Domaine public — conditions affichées sur chaque ressource |
| 📱 **100% Responsive** | Adaptatif mobile / tablette / desktop avec navigation hamburger |
| ⚡ **Zéro dépendance** | Pas de `npm install`, pas de build. Déploiement en 30 secondes |
| 🏷 **Filtres dynamiques** | Catégories et types générés automatiquement depuis vos données |
| 📋 **Copie de liens** | Bouton de copie intégré à chaque ressource |

---

## 🗂 Structure du projet

```
techshare-site/
│
├── 📄 index.html          ← Point d'entrée — structure HTML complète du site
├── 🎨 style.css           ← Thème violet dark/light + tous les composants CSS
├── ⭐ data.js             ← VOS DONNÉES (seul fichier à modifier)
├── ⚙️  app.js             ← Logique JS (rendu, filtres, thème — ne pas modifier)
├── 📖 README.md           ← Cette documentation
│
├── 📁 livres/             ← Déposez vos fichiers PDF ici
│   ├── python-avance.pdf
│   ├── linux-admin.pdf
│   └── ...
│
└── 📁 covers/             ← Images de couverture (jpg / png / webp)
    ├── python-avance.jpg
    ├── linux-admin.jpg
    └── ...
```

### Stack technique

```
HTML5  ·  CSS3 Custom Properties  ·  Vanilla JavaScript ES6+
CSS Grid & Flexbox  ·  LocalStorage API  ·  Tabler Icons  ·  Google Fonts
```

---

## 🚀 Installation & déploiement

### Étape 1 — Récupérer les fichiers

Téléchargez les 4 fichiers principaux et placez-les dans un même dossier :

```
index.html  /  style.css  /  app.js  /  data.js
```

### Étape 2 — Créer les dossiers de contenu

```bash
mkdir livres covers
```

Copiez vos fichiers PDF dans `livres/` et vos images de couverture dans `covers/`.

### Étape 3 — Personnaliser `data.js`

Ouvrez `data.js` avec VS Code et remplissez vos informations :

```javascript
const SITE_INFO = {
  name:     "TechShare",
  owner:    "DIAWANE Ramatoulaye",
  email:    "votre@email.com",
  github:   "https://github.com/votreprofil",
  linkedin: "https://linkedin.com/in/votreprofil",
};
```

### Étape 4 — Déployer

**Option A — Netlify (recommandé, gratuit)**

1. Rendez-vous sur [netlify.com](https://netlify.com)
2. Glissez-déposez le dossier `techshare-site/` dans la zone de dépôt
3. ✅ Votre site est en ligne en moins d'une minute

**Option B — GitHub Pages (gratuit)**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/vous/techshare.git
git push -u origin main
# Activez GitHub Pages : Settings → Pages → Source: main
```

**Option C — Hébergement classique**

Uploadez tous les fichiers via FTP dans le dossier `public_html/` de votre hébergeur.

---

## 📖 Ajouter un livre

Ouvrez `data.js` et ajoutez un bloc dans le tableau `BOOKS`, **juste avant le `];` final** :

```javascript
{
  id:       "b33",                         // Numéro unique — incrémentez à chaque ajout
  title:    "Titre complet du livre",
  author:   "Prénom Nom de l'auteur",
  desc:     "Description courte du contenu (2 à 3 phrases maximum).",
  cat:      "Python",                      // Catégorie libre — voir liste ci-dessous
  license:  "CC BY 4.0",                  // Voir liste des licences
  date:     "2025-06-01",                 // Format obligatoire : YYYY-MM-DD
  pages:    320,                          // Optionnel — nombre de pages
  lang:     "Français",                   // "Français" | "Anglais" | "Arabe"
  cover:    "covers/mon-livre.jpg",       // Optionnel — image de couverture
  link_pdf: "livres/mon-livre.pdf",       // PDF local dans /livres/
  link_ext: "",                           // OU lien externe (Google Drive, site web...)
  tags:     ["python", "débutant"],       // Mots-clés pour la recherche
  featured: true,                         // true = affiché en section "Vedette"
},
```

> ⚠️ **Règles importantes**
> - Chaque bloc se termine par une **virgule** `,`
> - Les `id` doivent être uniques : continuez avec `"b33"`, `"b34"`, `"b35"`...
> - Vous pouvez remplir `link_pdf` **et** `link_ext` simultanément
> - Si `cover` est absent ou introuvable, une icône de remplacement s'affiche automatiquement

---

## 🔧 Ajouter une ressource

Pour ajouter un cours, un article, un outil ou une documentation, modifiez le tableau `RESOURCES` dans `data.js` :

```javascript
{
  id:      6,                             // Numéro unique entier
  title:   "Titre de la ressource",
  desc:    "Description courte et claire.",
  type:    "Cours",                       // Voir types disponibles ci-dessous
  cat:     "Python",
  license: "CC BY 4.0",
  date:    "2025-06-01",
  link:    "fichiers/ma-ressource.pdf",   // Chemin local OU URL externe
  tags:    ["python", "tag2"],
},
```

**Types disponibles :**

| Type | Usage |
|------|-------|
| `"Cours"` | Tutoriels et formations structurées |
| `"Documentation"` | Guides de référence, docs techniques |
| `"Outil"` | Scripts, logiciels, extensions |
| `"Article"` | Articles, billets de blog |
| `"Vidéo"` | Liens vers vidéos pédagogiques |
| `"Livre"` | Livres (préférez le tableau `BOOKS`) |
| `"Autre"` | Tout autre type de contenu |

---

## 🎨 Personnalisation

### Changer les couleurs

Dans `style.css`, modifiez les variables CSS en début de fichier :

```css
:root {
  --accent:   #9d5cff;   /* Violet principal */
  --accent2:  #7c3aed;   /* Violet foncé (boutons, dégradés) */
  --accent3:  #c084fc;   /* Violet clair (textes, icônes) */
  --bg:       #08060f;   /* Fond sombre */
  --bg2:      #0e0b1a;   /* Fond secondaire */
}
```

### Mettre à jour la présentation

Dans `index.html`, repérez la section `id="a-propos"` et modifiez le texte entre les balises `<p>`.

### Mettre à jour les contacts

Dans `index.html`, repérez la section `id="contact"` et modifiez les attributs `href` des liens.

### Ajouter une catégorie avec icône

Dans `data.js`, ajoutez une entrée dans `CATEGORY_ICONS` :

```javascript
const CATEGORY_ICONS = {
  "Ma Catégorie": "ti-nom-icone",   // Icônes disponibles : https://tabler.io/icons
};
```

---

## 🗃 Catégories disponibles

| Catégorie | Livres | Icône Tabler |
|-----------|:------:|-------------|
| Python | 3 | `ti-brand-python` |
| Linux | 4 | `ti-brand-ubuntu` |
| DevOps | 4 | `ti-server` |
| Cybersécurité | 3 | `ti-shield-lock` |
| Bases de données | 3 | `ti-database` |
| Intelligence Artificielle | 3 | `ti-brain` |
| Web | 3 | `ti-world` |
| Réseau | 2 | `ti-network` |
| Algorithmique | 2 | `ti-chart-dots` |
| Mathématiques | 2 | `ti-math-function` |
| Mobile | 2 | `ti-device-mobile` |

> Pour ajouter une catégorie, créez simplement un livre avec une valeur `cat` inédite.  
> Le filtre apparaît **automatiquement** — aucune autre modification requise.

---

## ⚖️ Licences supportées

| Licence | Conditions |
|---------|-----------|
| `CC BY 4.0` | Usage libre avec attribution obligatoire |
| `CC BY-NC` | Non commercial — attribution obligatoire |
| `CC BY-SA` | Partage dans les mêmes conditions |
| `CC BY-ND` | Pas de modification — attribution obligatoire |
| `CC BY-NC-SA` | Non commercial + partage identique |
| `MIT` | Usage libre y compris commercial |
| `GPL v3` | Logiciel libre — copyleft fort |
| `Apache 2.0` | Usage commercial autorisé |
| `Domaine public` | Aucune restriction |
| `Tous droits réservés` | Consultation uniquement |

> 📌 En savoir plus : [creativecommons.org/licenses](https://creativecommons.org/licenses/?lang=fr)

---

## 📋 Changelog

```
v3.0  ✅ Section livres dédiée — grille, vedettes, vue liste, modal avec couverture
v3.0  ✅ 32 livres d'exemples répartis en 11 catégories
v3.0  ✅ Tableau BOOKS[] séparé de RESOURCES[] dans data.js
v2.1  ✅ Dark / Light mode persistant via localStorage
v2.1  🔧 Correction débordement logo navbar — refactoring .nav-right
v2.1  ✅ Bouton thème avec icônes soleil / lune animées
v2.0  ✅ Refonte thème violet / noir / blanc — glassmorphism navbar
v2.0  ✅ Halos CSS animés en arrière-plan
v1.0  ✅ Version initiale — bibliothèque, filtres, recherche, modal
```

---

## 👤 Auteur

<div align="center">

### DIAWANE Ramatoulaye

*Créatrice & développeuse de TechShare*

<br>

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/votreprofil)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/votreprofil)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:votre@email.com)

</div>

---

<div align="center">

*Fait avec ❤️ par **DIAWANE Ramatoulaye***

*TechShare v3.0 — Statique · Zéro dépendance · Déployable en 30 secondes*

</div>