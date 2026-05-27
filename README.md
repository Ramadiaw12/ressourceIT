# TechShare — Guide d'utilisation

## Structure des fichiers

```
techshare-site/
├── index.html      → Page principale (structure du site)
├── style.css       → Design et mise en page
├── app.js          → Logique (ne pas modifier)
├── data.js         → ⭐ VOS RESSOURCES — à modifier
├── fichiers/       → Mettez vos PDF, ZIP, etc. ici
└── README.md       → Ce guide
```

---

## Comment ajouter une ressource ?

Ouvrez `data.js` et ajoutez un bloc dans le tableau `RESOURCES` :

```javascript
{
  id: 9,                              // numéro unique (incrémentez)
  title: "Titre de votre ressource",
  desc: "Description courte (2-3 phrases).",
  type: "Cours",                      // voir types ci-dessous
  cat: "Python",                      // catégorie libre
  license: "CC BY 4.0",              // voir licences ci-dessous
  date: "2025-06-01",                // format YYYY-MM-DD
  link: "fichiers/mon-fichier.pdf",  // chemin local OU URL
  tags: ["python", "débutant"],      // pour la recherche
},
```

---

## Types disponibles
- `"Cours"`
- `"Documentation"`
- `"Outil"`
- `"Article"`
- `"Vidéo"`
- `"Livre"`
- `"Autre"`

## Licences disponibles
| Licence | Description |
|---------|-------------|
| `CC BY 4.0` | Attribution obligatoire, usage libre |
| `CC BY-NC` | Non commercial |
| `CC BY-SA` | Partage identique |
| `CC BY-ND` | Pas de modification |
| `MIT` | Très permissif |
| `GPL v3` | Copyleft |
| `Apache 2.0` | Permissif, commercial ok |
| `Tous droits réservés` | Lecture seule |

---

## Personnalisation

### Changer le nom du site et vos coordonnées
Dans `data.js`, modifiez `SITE_INFO` :
```javascript
const SITE_INFO = {
  name: "MonSite",
  owner: "Votre Nom",
  email: "vous@email.com",
  github: "https://github.com/vous",
  linkedin: "https://linkedin.com/in/vous",
};
```

### Changer les couleurs
Dans `style.css`, modifiez les variables CSS au début du fichier :
```css
:root {
  --accent: #4338ca;   /* couleur principale */
  --accent2: #6d28d9;  /* couleur secondaire */
  --bg: #f5f4f0;       /* fond de page */
}
```

### Mettre à jour votre présentation
Dans `index.html`, trouvez la section `id="a-propos"` et modifiez le texte entre les balises `<p>`.

### Changer les contacts
Dans `index.html`, trouvez la section `id="contact"` et mettez à jour les liens `href`.

---

## Déploiement

### Option 1 — GitHub Pages (gratuit)
1. Créez un repo GitHub (ex: `techshare`)
2. Uploadez tous les fichiers
3. Allez dans Settings → Pages → Source: main branch
4. Votre site sera disponible sur `https://votrepseudo.github.io/techshare`

### Option 2 — Netlify (gratuit)
1. Allez sur netlify.com
2. Glissez-déposez le dossier `techshare-site`
3. Votre site est en ligne en 30 secondes

### Option 3 — Serveur web classique
Uploadez tous les fichiers via FTP dans le dossier `public_html` de votre hébergeur.

---

## Ajouter vos fichiers locaux

1. Créez un dossier `fichiers/` dans `techshare-site/`
2. Copiez vos PDF, ZIP, etc. dedans
3. Dans `data.js`, mettez le chemin relatif :
   ```javascript
   link: "fichiers/mon-cours.pdf"
   ```

---

© Généré par TechShare — Personnalisez librement