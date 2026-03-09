# 🚀 Guide de Configuration - Neurafrik Site

## Étape 1: Installation de Node.js

1. Téléchargez Node.js depuis [nodejs.org](https://nodejs.org)
2. Installez la version LTS (Long Term Support)
3. Vérifiez que c'est correctement installé:

```bash
node --version
npm --version
```

## Étape 2: Installer les dépendances

1. Ouvrez PowerShell ou Git Bash
2. Naviguez vers le dossier du projet:

```bash
cd "c:\Users\ulrich\Downloads\Nouveau dossier (15)\stitch\neurafrik_site"
```

3. Installez les packages:

```bash
npm install
```

## Étape 3: Lancer le serveur

Démarrez le serveur avec:

```bash
npm start
```

Vous devriez voir:
```
🚀 Neurafrik Server running at http://localhost:3000
📧 Contact endpoint: POST http://localhost:3000/api/contact
📰 Newsletter endpoint: POST http://localhost:3000/api/newsletter
```

## Étape 4: Accéder au site

Ouvrez votre navigateur et visitez:

- **Accueil**: http://localhost:3000/home.html
- **À propos**: http://localhost:3000/about.html
- **Services**: http://localhost:3000/service.html
- **Solutions**: http://localhost:3000/solution.html
- **Contact**: http://localhost:3000/contact.html

Ou simplement: http://localhost:3000

## ✨ Fonctionnalités

### Navigation Complète
- Tous les liens fonctionnent et relient les pages ensemble
- Menu actif sur chaque page

### Formulaire de Contact
Le formulaire à la page Contact:
- Envoie les données au serveur
- Valide les champs required
- Affiche un message de succès ou d'erreur
- Les données sont stockées sur le serveur

### API Endpoints

#### Soumettre le formulaire de contact
```bash
POST http://localhost:3000/api/contact
```

Exemple avec cURL:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jean Dupont",
    "email": "jean@example.com",
    "service": "AI Strategy Consulting",
    "message": "Je suis intéressé par vos services"
  }'
```

#### Voir toutes les soumissions
```bash
GET http://localhost:3000/api/submissions
```

#### S'abonner à la newsletter
```bash
POST http://localhost:3000/api/newsletter
```

```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "subscriber@example.com"}'
```

## 📊 Palette de Couleurs

- **Cyan primaire**: #00eeff
- **Violet accent**: #bc00ff
- **Fond sombre**: #050a0a
- **Fond clair**: #f5f8f8

## 🛑 Arrêter le serveur

Appuyez sur `Ctrl + C` dans le terminal

## 🔄 Redémarrer après modifications

1. Arrêtez le serveur (`Ctrl + C`)
2. Relancez: `npm start`

Le navigateur peut mettre en cache les fichiers. Pressez `F5` ou `Ctrl + F5` pour forcer le rechargement.

## 📝 Structure des fichiers

```
├── home.html              Page d'accueil
├── about.html             Page À propos
├── service.html           Page Services
├── solution.html          Page Solutions
├── contact.html           Page Contact + Formulaire
├── styles.css             Styles partagés
├── server.js              Serveur Node.js
├── package.json           Dépendances
├── README.md              Documentation complète
└── SETUP.md              Ce fichier
```

## 🐛 Troubleshooting

### Erreur: "port 3000 is already in use"
Le port 3000 est déjà utilisé. Soit:
1. Fermez l'application qui l'utilise
2. Ou modifiez le port dans `server.js`: `const PORT = 3001;`

### Erreur: "Cannot find module"
Réinstallez les dépendances:
```bash
rm -r node_modules package-lock.json
npm install
```

### Les formulaires ne fonctionnent pas
1. Vérifiez que le serveur tourne: `npm start`
2. Vérifiez la console du navigateur (F12)
3. Vérifiez que les inputs ont des attributs `name`

## 📞 Prochaines étapes

Pour la production:
1. Ajouter une base de données (MongoDB, PostgreSQL)
2. Configurer les emails de notification
3. Déployer sur un serveur (Heroku, DigitalOcean, AWS)
4. Activer HTTPS/SSL
5. Ajouter plus de validation

---

**Bon développement! 🎉**
