const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Subscriber = require('../models').Subscriber;

module.exports = {
  create(req, res) {
    console.log(req.body)
    return Subscriber
    .findAll({
      where: {
        [Op.or]: [{email: req.body.email}, {phone: req.body.phone}]
      }
    })
    .then(subscriber => {
      console.log(subscriber.length)
      console.log(subscriber)
      if (subscriber.length != 0) {
        return res.status(404).redirect('/existing_subscriber');
      }
      else {
        return Subscriber
          .create({
            email: req.body.email,
            phone: req.body.phone
          })
          .then(subscriber => res.status(201).redirect('/subscribe'))
          .catch(error => res.status(400).send(error));
      }
    })
    .catch(error => res.status(400).send(error));
  },

  createEmail(req, res) {
    console.log(req.body)
    return Subscriber
    .findAll({
      where: {
        email: req.body.email
      }
    })
    .then(subscriber => {
      console.log(subscriber.length)
      console.log(subscriber)
      if (subscriber.length != 0) {
        return res.status(404).redirect('/existing_subscriber');
      }
      else {
        return Subscriber
          .create({
            email: req.body.email,
          })
          .then(subscriber => res.status(201).redirect('/subscribe'))
          .catch(error => res.status(400).send(error));
      }
    })
    .catch(error => res.status(400).send(error));
  },

  createPhone(req, res) {
    console.log(req.body)
    return Subscriber
    .findAll({
      where: {
        phone: req.body.phone
      }
    })
    .then(subscriber => {
      console.log(subscriber.length)
      console.log(subscriber)
      if (subscriber.length != 0) {
        return res.status(404).redirect('/existing_subscriber');
      }
      else {
        return Subscriber
          .create({
            phone: req.body.phone
          })
          .then(subscriber => res.status(201).redirect('/subscribe'))
          .catch(error => res.status(400).send(error));
      }
    })
    .catch(error => res.status(400).send(error));
  },

  list(req, res) {
  return Subscriber
    .all()
    .then(subscribers => res.status(200).send(subscribers))
    .catch(error => res.status(400).send(error));
  },

  update(req, res) {
  return Subscriber
    .findById(req.params.subscriberId)
    .then(subscriber => {
      if (!subscriber) {
        return res.status(404).send({
          message: 'Subscriber Not Found',
        });
      }
      return subscriber
        .update({
          email: req.body.email || subscriber.email,
          phone: req.body.phone || subscriber.phone
        })
        .then(() => res.status(200).send(subscriber))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
  return Subscriber
    .findById(req.params.subscriberId)
    .then(subscriber => {
      if (!subscriber) {
        return res.status(400).send({
          message: 'Subscriber Not Found',
        });
      }
      return subscriber
        .destroy()
        .then(() => res.status(200).send({ message: 'Subscriber deleted successfully.' }))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }
};
