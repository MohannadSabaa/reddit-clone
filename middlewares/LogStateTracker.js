const jwt = require('jsonwebtoken');

const logStateTracker = async (req, res, next) => {
    const {token} = req.cookies;
    
    if(!token) {
       const guestToken = jwt.sign({type: 'guest'}, process.env.SECRET_KEY);
        res.cookie('guest',guestToken)
        next();
    }
    
}


module.exports = logStateTracker