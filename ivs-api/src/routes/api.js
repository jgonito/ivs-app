const memberController = require('../controllers/member.controller');
const apiRouter = require('express').Router();
const jwt = require("jsonwebtoken");

apiRouter.post('/', memberController.create);

// below end points must be authorized
apiRouter.use((req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken || bearerToken.indexOf('Bearer ') !== 0) {
            console.log(bearerToken);
            return res.status(403).send('invalid token');
        }

        const token = bearerToken.split(' ')[1];
        jwt.verify(token, process.env.APP_PRIVATE_KEY);
    } catch (err) {
        return res.status(403).send('invalid token');
    }

    next();
});
apiRouter.get('/:email', memberController.get);
apiRouter.get('/', memberController.getList);

module.exports = apiRouter;