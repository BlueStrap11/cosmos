const Subscriber = require('../models').Subscriber;

module.exports = {
  create(req, res) {
    console.log(req.body)
    return Subscriber
      .create({
        email: req.body.email,
        phone: req.body.phone
      })
      .then(subscriber => res.status(201).send(subscriber))
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
