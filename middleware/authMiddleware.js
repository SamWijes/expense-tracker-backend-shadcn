var jwt = require("jsonwebtoken");
// require('dotenv').config()


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
function AuthMiddleware(req, res, next) {
  // console.log(req.headers);
  
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // console.log(req.headers);
    
    return res.status(401).json({ message: "Authentication Failed" });
  }
  const token = authHeader.match(/^Bearer\s+(.+)$/);
  
  
  
  try {
    const auth = jwt.verify(token[1], process.env.SECRET_KEY);
    // console.log(auth);
    
    
    req.user = auth.username;
    req.email=auth.email;
    req.id=auth.id;

    next();
  } catch (error) {
    return res.status(401).send(error);
  }
}

module.exports = { AuthMiddleware };
