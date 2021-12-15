const Contact = require('../models/Contact');

exports.createContact = (req, res, next) => {
    const contactObject = JSON.parse(req.body.contact);
    delete contactObject._id;
    const contact = new Contact({
      ...contactObject,
    });
    contact.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
}

exports.getOneContact = (req, res, next) => {
    Contact.findOne({_id: req.params.id})
    .then(contact => res.status(200).json(contact))
    .catch(error => res.status(404).json({ error }));
};