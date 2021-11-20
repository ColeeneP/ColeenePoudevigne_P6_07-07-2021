const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet'); // middleware tier d'express pour la sécurisation
const mongoSanitize = require('express-mongo-sanitize'); // middleware de prévention contre les injections opérateur

const sauceRoutes = require('./routes/sauce'); //importation du router
const userRoutes = require('./routes/user');

// connexion à MongoDB
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_HOST,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))
  .catch(error => res.status(500).json({ error }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(helmet());
app.use(bodyParser());
app.use(mongoSanitize()); // Clear user data

// Appel des routers
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;