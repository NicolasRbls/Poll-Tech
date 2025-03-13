# 📊 PollTech - Application de sondages moderne

Bienvenue sur **PollTech**, une application de sondages simple, rapide et moderne, développée avec **HTML/CSS/JS**, **Express.js**, **MongoDB Atlas** et hébergée sur **Netlify**.

---

## 🚀 Fonctionnalités principales

- 🔐 Authentification JWT (inscription / connexion / déconnexion)
- 🗳 Création de sondages personnalisés avec plusieurs options
- 🔗 Partage par lien unique du type `https://polltech.netlify.app/poll.html?id=abc123`
- ✅ Un vote par utilisateur (anti double vote)
- 📊 Affichage des résultats
- 🗑 Suppression de sondage (par le créateur uniquement)
- ✏️ Modification de sondage (si aucun vote n’a encore été enregistré)

---

## 🧱 Stack technique

- **Frontend** : HTML + CSS avec [Pico.css](https://picocss.com/)
- **Backend** : Express.js via Netlify Functions (Serverless)
- **Base de données** : MongoDB Atlas (Cloud)

---

## 📂 Structure du projet

```
PollTech/
├── frontend/               # Pages HTML/CSS/JS (index, login, signup, dashboard...)
├── netlify/functions/     # API backend avec Express.js (signup, login, createPoll...)
├── .env                   # Variables d'environnement (non trackées par Git)
├── netlify.toml           # Configuration des redirections
├── README.md              # Ce fichier !
```

---

## ⚙️ Installation locale

1. Clone le dépôt
2. Crée un fichier `.env` à la racine avec :

```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=ton_secret_securise
```

3. Installe les dépendances :
```bash
npm install
```

4. Lance le serveur local Netlify :
```bash
netlify dev
```


---

## 🔐 Sécurité intégrée

- Mots de passe hashés avec **bcrypt**
- Tokens JWT valides 24h
- Vérification des droits d'accès (suppression / modification)
- Protection contre le double vote via `user.id`
- Unicité des emails assurée

---

## ✅ Fonctionnalités en cours / à venir

- 📧 Envoi d’email de confirmation après vote
- ⏱ Expiration automatique des sondages (durée)
- 📈 Plus de statistiques (diagrammes d'évolution...)
- 🖼 Thèmes visuels customisables pour les sondages

---

## 🙌 Créé par Nicolas avec passion

Projet d’application fullstack éducative, deployée avec Netlify + MongoDB + Node.js

