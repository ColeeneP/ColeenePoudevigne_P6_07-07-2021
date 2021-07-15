const Sauce = require('../models/sauce');
const fs = require('fs');
const User = require('../models/user');

// Création d'un objet 'sauce'
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // protocole HTTP/HTTPS + racine du serveur + dossier d'image + nom du fichier
  });
    sauce.save().then(
      () => {
        res.status(201).json({ message: 'Sauce créée !' }); }
    ).catch(
      (error) => {
        res.status(400).json({ error: error });}
    );
  };
  
  exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
      _id: req.params.id
    }).then(
      (thing) => {res.status(200).json(thing);}
    ).catch(
      (error) => { res.status(404).json({ error: error });}
    );
  };

  exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : {...req.body };

      Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };
  
  exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(thing => {
        const filename = thing.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };
  
  exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then((things) => {res.status(200).json(things);
    })
    .catch((error) => {res.status(400).json({error: error});
    });
  };

exports.likeSauce = (req, res, next) => {
  const userId = req.body.userId;
  const like = req.body.like;
  const userSauce = Sauce.userId;
  const usersLiked = [User.usersLiked];
  const usersDisliked = [User.usersDisliked];
        
            switch (like) {
              // l'utilisateur ne peut pas like ou dislike plusieurs fois
                case 1 :
                    if ((usersLiked.includes(userId)) && userId !== userSauce) {
                      alert('Vous avez déjà voté pour cette sauce');
                    }

                    else if ((usersDisliked.includes(userId)) && userId !== userSauce) {
                    Sauce.updateOne({ _id: req.params.id }, {$inc: {dislikes: -1}, $inc : {likes: 1}, $push: {usersLiked: userId}, $pull: {usersDisliked: userId}})
                    .then(() => {console.log('Finallement vous aimez cette sauce !');
                    })
                    .catch((error) => {res.status(400).json({error: error});
                    })}

                    else if ((!usersLiked.includes(userId)) && userId !== userSauce) {
                      Sauce.updateOne({ _id: req.params.id }, {$inc: {likes: 1}, $push: {usersLiked: userId}})
                      .then(() => {console.log('Vous aimez cette sauce');
                      })
                      .catch((error) => {res.status(400).json({error: error});
                      })}
                break;

                case -1 :
                    if (usersDisliked.includes(userId) && userId !== userSauce) {
                      alert('Vous avez déjà voté pour cette sauce');
                    }

                    else if ((usersLiked.includes(userId)) && userId !== userSauce) {
                    Sauce.updateOne({ _id: req.params.id }, {$inc: {dislikes: +1}, $inc: {likes: -1}, $push: {usersDisliked: userId}, $pull: {usersLiked: userId}})
                    .then(() => {console.log('Finallement vous n\'aimez pas cette sauce !');
                    })
                    .catch((error) => {res.status(400).json({error: error});
                    })}

                    else if ((!usersDisliked.includes(userId)) && userId !== userSauce) {
                    Sauce.updateOne({ _id: req.params.id }, {$inc: {dislikes: +1}, $push: {usersDisliked: userId}})
                    .then(() => {console.log('Vous n\'aimez pas cette sauce');
                    })
                    .catch((error) => {res.status(400).json({error: error});
                    })}
                break;

                default:
                  console.log('Vous ne pouvez pas voter');
                break;
            }
    };