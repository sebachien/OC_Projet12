const db = require("../models");
const Contract = db.contractSchema;
const Op = db.Sequelize.Op;

exports.createContract = (req, res, next) => {
    const contract = {
        accountid: req.body.email,
        startdate: req.body.startdate,
        status: req.body.status,
        billingcity: req.body.billingcity,
        billingcountry: req.body.billingcountry,
        billingstreet: req.body.billingstreet,
        billingpostalcode: req.body.billingpostalcode,
        contractterm: req.body.contractterm,
        customersignedid: req.body.customersignedid
    };
    Contract.create(contract)
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
}

exports.getOneContract = (req, res, next) => {
    Contract.findById(req.params.sfid)
    .then(contract => res.status(200).json(contract))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllContract =  (req, res, next) => {
    Contract.findAll()
      .then(contract => res.status(200).json(contract))
      .catch(error => res.status(400).json({ error }));
};

exports.modifyContact = (req, res, next) => {
    const contractObject = req.file ?
    {
        ...JSON.parse(req.body),
    } : { ...req.body };
    Contract.update({ ...contractObject, sfid: req.params.sfid },{ where: {sfid: req.params.sfid} }, { ...contractObject, sfid: req.params.sfid })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
};
      