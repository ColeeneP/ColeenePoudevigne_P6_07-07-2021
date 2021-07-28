const Sauce = require('../models/sauce');
const fs = require('fs');
const user = require('../models/user');

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

      Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
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
    const like = req.body.like;
  Sauce.findOne( {_id: req.params.id })
        .then(sauce => {
            if (like === 1) {
              if ( sauce.usersLiked.indexOf(req.body.userId) == -1) {
                Sauce.updateOne({_id: req.params.id}, { $inc: { likes: 1}, $push: { usersLiked: req.body.userId}, _id: req.params.id })
                .then( () => res.status(200).json({ message: 'Vous aimez cette sauce !' }))
                .catch( error => res.status(400).json({ error}))}
            } else if (like === -1) {
                if (sauce.usersDisliked.indexOf(req.body.userId) == -1) {
                  Sauce.updateOne({_id: req.params.id}, { $inc: { dislikes: 1}, $push: { usersDisliked: req.body.userId}, _id: req.params.id })
                  .then( () => res.status(200).json({ message: 'Vous n\'aimez pas cette sauce !' }))
                  .catch( error => res.status(400).json({ error})) }
            } else {
                if (sauce.usersLiked.indexOf(req.body.userId)!== -1) {
                  Sauce.updateOne({_id: req.params.id}, { $inc: { likes: -1 },$pull: { usersLiked: req.body.userId }, _id: req.params.id })
                  .then( () => res.status(200).json({ message: 'Vous n\'aimez plus cette sauce !' }))
                  .catch( error => res.status(400).json({ error}))

                } else if (sauce.usersDisliked.indexOf(req.body.userId)!== -1) {
                  Sauce.updateOne( {_id: req.params.id}, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId }, _id: req.params.id})
                  .then( () => res.status(200).json({ message: 'Vous aimez probablement cette sauce maintenant ?' }))
                  .catch( error => res.status(400).json({ error}))
                }
            } 
        })
        .catch((error) => {res.status(400).json({error: error});
        });
};