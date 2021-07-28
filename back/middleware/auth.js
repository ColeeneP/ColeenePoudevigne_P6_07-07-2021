const jwt = require('jsonwebtoken'); // permettra de faire appel à jsonwebtoken
const dotenv = require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // On récupère le token dans le header
    const decodedToken = jwt.verify(token, process.env.TOKEN); // On demande à jwt de décoder le token récupéré
    const userId = decodedToken.userId; // On vérifie que l'id du token correspond à celui du user
    if (req.body.userId && req.body.userId !== userId) { // si le user id de la requête est différent de celui du token
      throw 'Invalid user ID'; 
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};