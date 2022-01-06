const db = require("../models");
const Product = db.productSchema;
const Op = db.Sequelize.Op;

exports.createProduct = (req, res, next) => {
    const product = {
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
    };
    Product.create(product)
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
}

exports.getOneProduct = (req, res, next) => {
    Product.findById(req.params.sfid)
    .then(product => res.status(200).json(product))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllProduct =  (req, res, next) => {
    Product.findAll()
      .then(product => res.status(200).json(product))
      .catch(error => res.status(400).json({ error }));
};

exports.modifyProduct = (req, res, next) => {
    Product.update(req.body, {where :{id: req.params.id}})
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
};
      
exports.deleteProduct = (req, res, next) => {
    Product.destroy({
      where: {
        sfid: req.params.sfid
      }
    })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  };