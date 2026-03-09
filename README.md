# Neurafrik Solutions - AI & Automation for Africa

Neurafrik Solutions est une plateforme moderne de services numériques conçue pour accompagner les entreprises africaines dans leur transformation digitale à travers 5 piliers stratégiques.

## 🚀 Services (5 Piliers)

1.  **Automatisation Intelligente** : Optimisation des flux de travail et des processus commerciaux.
2.  **Intelligence Artificielle** : Chatbots avancés et agents IA spécialisés.
3.  **Développement Sur Mesure** : Applications web performantes et solutions digitales.
4.  **Analyse de Données & BI** : Tableaux de bord interactifs et décisions basées sur les données.
5.  **Conseil & Formation** : Audit digital et accompagnement stratégique vers l'IA.

## 🌍 Fonctionnalités Clés

- **Multi-langue (i18n)** : Support complet pour l'Anglais et le Français via des fichiers JSON (`locales/`).
- **Moteur de Template EJS** : Architecture dynamique et modulaire pour une maintenance simplifiée.
- **Espace Administration** : Interface de gestion sécurisée pour les demandes de clients.
- **Persistance des Données** : Sauvegarde automatique des contacts et abonnés en local.
- **Design Premium** : Thème sombre (Dark Mode) avec glassmorphism et animations CSS.

---

## 🛠️ Installation et Exécution

### 1. Prérequis
- [Node.js](https://nodejs.org/) installé sur votre machine.

### 2. Installation
```bash
npm install
```

### 3. Lancer le serveur
```bash
npm start
```

Le site sera accessible sur : **http://localhost:3001**

---

## 🔐 Espace Administration (Admin Portal)

Neurafrik inclut un espace de gestion pour centraliser vos opportunités.

- **URL** : `http://localhost:3001/admin/login`
- **Identifiants par défaut** :
    - **Identifiant** : `admin`
    - **Mot de passe** : `admin123`

**Fonctionnalités Admin :**
- Statistiques en temps réel (nouveaux messages, total abonnés).
- Lecture et suppression des messages de contact.
- Gestion de la liste de diffusion (newsletter).
- Exportation des données (via interface tableau).

---

## 📁 Structure du Projet

```text
neurafrik_site/
├── assets/             # Images (Logo, Favicon)
├── data/               # Stockage persistant (JSON)
├── locales/            # Traductions (EN/FR)
├── utils/              # Logique backend (Base de données)
├── views/              # Pages et composants EJS
│   ├── admin/          # Interface d'administration
│   └── partials/       # Header, Nav, Footer réutilisables
├── server.js           # Serveur Express principal
└── README.md           # Documentation
```

## 🔧 Pile Technologique

- **Backend** : Node.js, Express, EJS
- **Frontend** : HTML5, Tailwind CSS, JavaScript
- **Sessions** : `express-session` pour l'authentification admin
- **Data** : JSON File-based storage (persistent)

---

## 📞 Support

Pour toute question ou demande technique : **contact@neurafrik.com**

**Built with ❤️ for African Enterprises by Neurafrik Solutions**
