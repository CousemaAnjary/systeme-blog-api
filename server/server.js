const express = require("express");
const cors = require('cors');
const path = require("path");
const cookieParser = require("cookie-parser"); // Importer cookie-parser
const addAuthState = require('./middlewares/addAuthState');
const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");

const app = express();

// Configuration de CORS pour permettre les requêtes depuis le frontend
const corsOptions = {
  origin: 'http://localhost:5173', // URL de votre frontend
};
app.use(cors(corsOptions));

// Définir le moteur de vue
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware pour analyser les requêtes entrantes en JSON et URL-encodées
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utiliser cookie-parser
app.use(cookieParser());

// Définir les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Ajouter le middleware pour injecter l'état de connexion
app.use(addAuthState);

// Définir les routes
app.use("/", webRoutes);
app.use("/api", apiRoutes); // Préfixe toutes les routes API avec /api

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
