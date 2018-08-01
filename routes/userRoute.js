const USER_URL = '/data/user';
const userService = require('./services/userService');

module.exports = app => {
  app.get(USER_URL, (req, res) => {
    console.log('inside back user');

    userService.query().then(users => res.json(users));
  });

  app.post(USER_URL + '/range', (req, res) => {
    const filter = req.body;
    const loc = filter.loc;
    const range = filter.range;
    console.log('inside post filter', filter, loc, range);

    userService.queryFilterLoc(loc, range).then(users => res.json(users));
  });

  app.post(USER_URL + '/users', (req, res) => {
    const userIds = req.body.userIds;
    console.log('routes userIds:', userIds);
    
    return userService.getByIds(userIds)
    .then(users => {
      console.log('routes got:', users);
      return res.json(users)
    });
  });
  
  app.get(USER_URL + '/:userId', (req, res) => {
    const userId = req.params.userId;

    return userService.getById(userId).then(user => res.json(user));
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

  app.post('/data/user/setFbUser', (req, res) => {
    const user = req.body;
    const userId = '' + 1 * user.id;
    // const userId = '121212';
    console.log('route', user);
    userService
      .getByFbId(userId)
      .then(user => {
        if (user !== null) {
          user.img = req.body.picture.data.url;
          req.session.loggedinUser = user;
          delete user.password;
          delete user.FB_id;
          res.json(user);
          console.log('after if pass', user);
        } else {
          console.log('fb null wrong username or password');
          throw 'wrong username or password';
        }
      })
      .catch(err => res.status(401).send('Wrong user/pass'));
  });
};
