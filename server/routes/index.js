const SubscribersController = require('../controllers').subscribers;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Subscribers Section',
  }));

  app.post('/api/subscribers', SubscribersController.create);
  app.get('/api/subscribers', SubscribersController.list);
  app.put('/api/subscribers/:subscriberId', SubscribersController.update);
  app.delete('/api/subscribers/:subscriberId', SubscribersController.destroy);
};