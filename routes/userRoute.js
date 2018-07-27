const USER_URL = '/data/user'
const userService = require('./services/userService');


module.exports = (app) => {

    app.get(USER_URL, (req, res) => {
        userService.query()
            .then(users => res.json(users))
    })

    app.get(USER_URL + '/:userId', (req, res) => {
        const userId = req.params.userId;

        userService.getById(userId)
            .then(user => res.json(user))
    })

    app.delete(USER_URL + '/:userId', (req, res) => {
        const userId = req.params.userId;

        userService.remove(userId)
            .then(() => res.end(`User ${userId} Deleted `))

    })

    app.post(USER_URL, (req, res) => {
        const user = req.body;
        userService.add(user)
            .then(user => {
                res.json(user)
            })
    })

    app.put(USER_URL + '/:userId', (req, res) => {
        const user = req.body;
        userService.update(user)
            .then(user => {
                res.json(user)
            })

    })


}