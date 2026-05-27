/*
╔══════════════════════════════════════════════════════════════════════╗
║                          data.js — VOS DONNÉES                      ║
║                                                                      ║
║  Ce fichier contient TOUTES vos ressources.                          ║
║  Pour ajouter une ressource, copiez un bloc { ... } et remplissez.  ║
║  Pour supprimer, effacez le bloc.                                    ║
╚══════════════════════════════════════════════════════════════════════╝

CHAMPS OBLIGATOIRES :
  id       → numéro unique (incrémentez à chaque ajout)
  title    → titre de la ressource
  desc     → courte description (2-3 phrases max)
  type     → "Cours" | "Documentation" | "Outil" | "Article" | "Vidéo" | "Livre" | "Autre"
  cat      → catégorie libre (ex: "Python", "Linux", "Cybersécurité"...)
  license  → voir la liste ci-dessous
  date     → "YYYY-MM-DD"
  link     → URL vers le fichier ou page externe (ou chemin local ex: "fichiers/cours.pdf")

CHAMPS OPTIONNELS :
  terms    → conditions d'utilisation personnalisées (si vide, auto-généré depuis la licence)
  tags     → ["tag1", "tag2"] pour la recherche

LICENCES DISPONIBLES :
  "CC BY 4.0"   → Attribution obligatoire, usage libre
  "CC BY-NC"    → Attribution, non commercial
  "CC BY-SA"    → Attribution, partage identique
  "CC BY-ND"    → Attribution, pas de modification
  "MIT"         → Très permissif, usage libre
  "GPL v3"      → Copyleft fort
  "Apache 2.0"  → Permissif, usage commercial ok
  "Tous droits réservés" → Consultation uniquement
*/

const SITE_INFO = {
  name: "TechShare",           /* Nom du site */
  owner: "Votre Nom",          /* Votre nom */
  tagline: "Toutes mes ressources informatiques en un seul endroit",
  email: "votre@email.com",
  github: "https://github.com/votreprofil",
  linkedin: "https://linkedin.com/in/votreprofil",
};

/* ════════════════════════════════════════════════════════════════
   RESSOURCES — Modifiez, ajoutez, supprimez des blocs ci-dessous
   ════════════════════════════════════════════════════════════════ */

const RESOURCES = [

  /* ── EXEMPLE 1 ── */
  {
    id: 1,
    title: "Introduction à Python — cours complet",
    desc: "Cours complet pour apprendre Python de zéro. Couvre les bases, la POO, les fichiers et les modules standard. Exercices corrigés inclus.",
    type: "Cours",
    cat: "Python",
    license: "CC BY 4.0",
    date: "2024-11-15",
    link: "fichiers/python-intro.pdf",   /* ← Mettez votre fichier dans le dossier /fichiers */
    tags: ["python", "débutant", "programmation"],
  },

  /* ── EXEMPLE 2 ── */
  {
    id: 2,
    title: "Guide Git & GitHub — workflows professionnels",
    desc: "Documentation complète sur la gestion de versions avec Git. Branches, pull requests, rebasing et intégration CI/CD.",
    type: "Documentation",
    cat: "DevOps",
    license: "MIT",
    date: "2024-10-03",
    link: "https://votresite.com/git-guide",
    tags: ["git", "github", "versionning"],
  },

  /* ── EXEMPLE 3 ── */
  {
    id: 3,
    title: "Algorithmes de tri — visualisation & explications",
    desc: "Article illustré sur les principaux algorithmes de tri (bulles, fusion, rapide, insertion) avec complexité et cas d'usage.",
    type: "Article",
    cat: "Algorithmique",
    license: "CC BY-NC",
    date: "2024-09-20",
    link: "articles/tri-algorithmes.html",
    tags: ["algorithme", "tri", "complexité"],
    terms: "Usage personnel et éducatif uniquement. Toute diffusion commerciale est interdite.",
  },

  /* ── EXEMPLE 4 ── */
  {
    id: 4,
    title: "Script Python — nettoyage automatique de fichiers",
    desc: "Outil en ligne de commande pour organiser et nettoyer un répertoire selon les extensions. Entièrement documenté.",
    type: "Outil",
    cat: "Python",
    license: "GPL v3",
    date: "2025-01-08",
    link: "https://github.com/votreprofil/file-cleaner",
    tags: ["script", "automatisation", "cli"],
  },

  /* ── EXEMPLE 5 ── */
  {
    id: 5,
    title: "Bases de données SQL — guide pratique",
    desc: "Requêtes, jointures, sous-requêtes, indexation et optimisation expliquées avec des exercices pratiques sur PostgreSQL.",
    type: "Documentation",
    cat: "Bases de données",
    license: "CC BY 4.0",
    date: "2025-02-14",
    link: "fichiers/sql-guide.pdf",
    tags: ["sql", "postgresql", "database"],
  },

  /* ── EXEMPLE 6 ── */
  {
    id: 6,
    title: "Cybersécurité — introduction aux attaques web",
    desc: "Présentation des attaques courantes : XSS, SQL injection, CSRF, avec démonstrations en environnement contrôlé.",
    type: "Cours",
    cat: "Cybersécurité",
    license: "CC BY-NC",
    date: "2025-03-01",
    link: "fichiers/cybersec-intro.pdf",
    tags: ["sécurité", "web", "xss", "sql injection"],
    terms: "Usage éducatif uniquement. Ne pas utiliser sur des systèmes sans autorisation.",
  },

  /* ── EXEMPLE 7 ── */
  {
    id: 7,
    title: "Linux pour développeurs — commandes essentielles",
    desc: "Mémo complet des commandes Linux les plus utilisées en développement : navigation, droits, processus, réseau, Vim.",
    type: "Documentation",
    cat: "Linux",
    license: "CC BY 4.0",
    date: "2025-01-22",
    link: "fichiers/linux-cheatsheet.pdf",
    tags: ["linux", "terminal", "bash", "commandes"],
  },

  /* ── EXEMPLE 8 ── */
  {
    id: 8,
    title: "Introduction au Machine Learning",
    desc: "Support de cours universitaire couvrant la régression, la classification, le clustering et les réseaux de neurones.",
    type: "Cours",
    cat: "Intelligence Artificielle",
    license: "CC BY-NC",
    date: "2024-12-05",
    link: "fichiers/ml-intro.pdf",
    tags: ["machine learning", "IA", "python", "scikit-learn"],
  },

  /* ══════════════════════════════════════════════
     AJOUTEZ VOS RESSOURCES ICI — copiez ce bloc :

  {
    id: 9,
    title: "Titre de votre ressource",
    desc: "Description courte et claire.",
    type: "Cours",
    cat: "Ma catégorie",
    license: "CC BY 4.0",
    date: "2025-01-01",
    link: "fichiers/mon-fichier.pdf",
    tags: ["tag1", "tag2"],
  },

     ══════════════════════════════════════════════ */

];


/* ════════════════════════════════════════════════════════════════
   CATÉGORIES — icônes personnalisables (Tabler Icons)
   Ajoutez une entrée si vous créez une nouvelle catégorie
   ════════════════════════════════════════════════════════════════ */

const CATEGORY_ICONS = {
  "Python":               "ti-brand-python",
  "JavaScript":           "ti-brand-javascript",
  "DevOps":               "ti-server",
  "Linux":                "ti-brand-ubuntu",
  "Algorithmique":        "ti-chart-dots",
  "Bases de données":     "ti-database",
  "Cybersécurité":        "ti-shield-lock",
  "Intelligence Artificielle": "ti-brain",
  "Réseau":               "ti-network",
  "Web":                  "ti-world",
  "Mobile":               "ti-device-mobile",
  "Cloud":                "ti-cloud",
  "Autre":                "ti-folder",
};

/* ════════════════════════════════════════════════════════════════
   LICENCES — descriptions et conditions automatiques
   ════════════════════════════════════════════════════════════════ */

const LICENSE_INFO = {
  "CC BY 4.0":           { cls: "lic-open", terms: "Vous pouvez utiliser, modifier et redistribuer ce contenu librement, à condition de citer l'auteur original." },
  "CC BY-NC":            { cls: "lic-nc",   terms: "Usage non commercial uniquement. Attribution obligatoire. Pas de revente ni d'intégration dans un produit commercial." },
  "CC BY-SA":            { cls: "lic-cc",   terms: "Vous pouvez redistribuer et modifier ce contenu, sous la même licence et avec attribution." },
  "CC BY-ND":            { cls: "lic-cc",   terms: "Redistribution permise avec attribution, mais sans modification du contenu original." },
  "MIT":                 { cls: "lic-open", terms: "Usage libre, y compris commercial. Conservez la notice de licence dans vos distributions." },
  "GPL v3":              { cls: "lic-open", terms: "Logiciel libre. Toute modification doit être redistribuée sous la même licence GPL v3." },
  "Apache 2.0":          { cls: "lic-open", terms: "Usage libre et commercial autorisé. Conservez la notice Apache dans vos distributions." },
  "Tous droits réservés": { cls: "lic-reserve", terms: "Ce contenu est protégé. Consultation uniquement. Toute reproduction, modification ou redistribution est interdite sans accord préalable." },
};