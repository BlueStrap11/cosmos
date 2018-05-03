const config = require('config');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const AWS = require('aws-sdk');
AWS.config.update({accessKeyId: config.get('aws.accessKeyId'), secretAccessKey: config.get('aws.secretAccessKey'), region: config.get('aws.ses_region')});

const Subscriber = require('../models').Subscriber;

WelcomeEmailData = function(subscriber) {
  return emailBody = {
    Destination: {
      CcAddresses: [
      ],
      ToAddresses: [
        subscriber.email,
      ]
    },
    Source: config.get('email.sender'),
    Template: 'template1',
    TemplateData: "{ \"name\":\"User\"}",
    ReplyToAddresses: [
        config.get('email.sender'),
    ],
  }; 
}

SendWelcomeEmail = function(emailBody) {
  var sendEmail = new AWS.SES().sendTemplatedEmail(emailBody).promise();
  sendEmail.then(data => {
    console.log(data);
    }).catch(err => {
      console.error(err, err.stack);
    });
}

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
      if (subscriber.length != 0) {
        return res.status(400).redirect('/existing_subscriber');
      }
      else {
        return Subscriber
          .create({
            email: req.body.email,
            phone: req.body.phone
          })
          .then(subscriber => {
            var emailBody = WelcomeEmailData(subscriber);
            SendWelcomeEmail(emailBody);
            res.status(201).redirect('/thanks')
          })
          .catch(error => {
            console.log(error.stack)
            res.status(500).redirect('/errors/500')
          });
      }
    })
    .catch(error => {
      console.log(error.stack)
      res.status(500).redirect('/errors/500')
    });
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
      if (subscriber.length != 0) {
        return res.status(400).redirect('/existing_subscriber');
      }
      else {
        return Subscriber
          .create({
            email: req.body.email,
          })
          .then(subscriber => {
            var emailBody = WelcomeEmailData(subscriber);
            SendWelcomeEmail(emailBody);
            res.status(201).redirect('/thanks')
          })
          .catch(error => {
            console.log(error.stack)
            res.status(500).redirect('/errors/500')
          });
      }
    })
    .catch(error => {
      console.log(error.stack)
      res.status(500).redirect('/errors/500')
    });
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
      if (subscriber.length != 0) {
        return res.status(400).redirect('/existing_subscriber');
      }
      else {
        return Subscriber
          .create({
            phone: req.body.phone
          })
          .then(subscriber => res.status(201).redirect('/thanks'))
          .catch(error => {
            console.log(error.stack)
            res.status(500).redirect('/errors/500')
          });
      }
    })
    .catch(error => {
      console.log(error.stack)
      res.status(500).redirect('/errors/500')
    });
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
