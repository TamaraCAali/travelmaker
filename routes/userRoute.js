const USER_URL = '/data/user';
const userService = require('./services/userService');

module.exports = app => {
  app.get(USER_URL, (req, res) => {
    console.log('inside back user');

    userService.query().then(users => res.json(users));
  });

  app.get(USER_URL + '/:userId', (req, res) => {
    const userId = req.params.userId;

    userService.getById(userId).then(user => res.json(user));
  });

  app.delete(USER_URL + '/:userId', (req, res) => {
    const userId = req.params.userId;

    userService.remove(userId).then(() => res.end(`User ${userId} Deleted `));
  });

  app.post(USER_URL, (req, res) => {
    const user = req.body;
    userService.add(user).then(user => {
      res.json(user);
    });
  });

  app.put(USER_URL + '/:userId', (req, res) => {
    const user = req.body;
    userService.update(user).then(user => {
      res.json(user);
    });
  });

  app.post('/data/user/setUser', (req, res) => {
    userService
      .checkForUser(req.body)
      .then(user => {
        if (user !== null && user.password === req.body.password) {
          req.session.loggedinUser = user;
          delete user.password;
          res.json(user);
          console.log('after if pass');
        } else {
          console.log('wrong username or password');
          throw 'wrong username or password';
        }
      })
      .catch(err => res.status(401).send('Wrong user/pass'));
  });
};
