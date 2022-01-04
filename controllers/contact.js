const db = require("../models");
const Contact = db.contactSchema;
const Op = db.Sequelize.Op;

exports.createContact = (req, res, next) => {
    console.log(req.body)
    //delete contactObject._id;
    const contact = new Contact({
      email: req.body.email,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      userId: req.body.userId
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
    Contact.find()
    .then(contact => res.status(200).json(contact))
    .catch(error => res.status(400).json({ error }));
    };