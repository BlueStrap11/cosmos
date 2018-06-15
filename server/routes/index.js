const SubscribersController = require('../controllers').subscribers;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Subscribers Section',
  }));
  app.post('/api/subscribers', SubscribersController.create);
  app.post('/api/emailsubscribers', SubscribersController.createEmail);
  app.post('/api/phonesubscribers', SubscribersController.createPhone);
  app.get('/api/subscribers', SubscribersController.list);
  app.get('/api/subscribers/byEmail/:subscriberEmail', SubscribersController.getSubscriberByEmail);
  app.get('/api/subscribers/byPhone/:subscriberPhone', SubscribersController.getSubscriberByPhone);
  app.get('/api/subscribers/one', SubscribersController.getSubscriber);
  app.put('/api/subscribers/:subscriberId', SubscribersController.update);
  app.delete('/api/subscribers/:subscriberId', SubscribersController.destroy);
};
