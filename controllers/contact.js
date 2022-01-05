const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Contact = db.contactSchema;
const Op = db.Sequelize.Op;

exports.createContact = (req, res, next) => {
    console.log(req.body)
    //delete contactObject._id;
    const contact = new Contact({
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      sfid: req.body.sfid
    });
    contact.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
}

exports.deleteContact = (req, res, next) => {
  Contact.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};


exports.modifyContact = (req, res, next) => {
  const contactObject = req.file ?
  {
    ...JSON.parse(req.body),
  } : { ...req.body };
  Contact.updateOne({ _id: req.params.id }, { ...contactObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneContact = (req, res, next) => {
    Contact.findOne({_id: req.params.id})
    .then(contact => res.status(200).json(contact))
    .catch(error => res.status(404).json({ error }));
};


exports.getAllContact =  (req, res, next) => {
  Contact.findAll()
    .then(contact => res.status(200).json(contact))
    .catch(error => res.status(400).json({ error }));
    };


exports.register = (req, res, next) => {
    // Validate request
    if (!req.body.password__c) {
      res.status(400).send({
        message: "Password can not be empty!"
      });
      return;
    }
    if (!req.body.email) {
      res.status(400).send({
        message: "Password can not be empty!"
      });
      return;
    }

    Contact.findAll({ limit: 1, where: { email: req.body.email } })
    .then(data => {
      if (data) {
        res.status(400).send({
          message: "Email already exist!"
        });
        return;
      } else {
        bcrypt.hash(req.body.password__c, 10)
        .then(hash => {
          const contact = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password__c: hash,  
          };

          Contact.create(contact)
          .then(() => res.status(201).json({ message: 'Utilisateur crée !'}))
          .catch(error => res.status(400).json({error}))
        })
      }
    })
   .catch(error => res.status(500).json({error}));
  };


  exports.login = (req ,res, next) => {
    Contact.findAll({ limit: 1, where: { email: req.body.email } })
    .then(contact => {
        if (!contact) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !'});
        }
        console.log("req.body.password__c ="+req.body.password__c)
        console.log("contact.password__c ="+contact.password__c)
        bcrypt.compare(req.body.password__c, contact.password__c)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de pass incorrect !'});
            }
            res.status(200).json({
              contactId: contact.sfid,
                token: jwt.sign(
                    { contactId: contact.sfid},
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            });
            
        })
        .catch(error => res.status(500).json({ error : 'error bcrypt'}));
    })
    .catch(error => res.status(500).json({ error : 'error login 1'}));
};