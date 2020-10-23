const jwt = require('jsonwebtoken')
require('dotenv/config')

function AuthMiddleware(req, res, next) {
    const { authorization } = req.headers;
    
    if (!authorization) {

        return res.sendStatus(401);
    }
    
    const token = authorization.replace('Bearer', '').trim();

    try {
        const dataToken = jwt.verify(token, process.env.SECRET_JWT);
        req.userId = dataToken.id;

        return next();
    } catch (e) {
        
        return res.sendStatus(401);
    }
};

module.exports = AuthMiddleware;