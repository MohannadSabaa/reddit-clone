const jwt = require('jsonwebtoken');

const auth = async (req, res, next) =>{
try {
    const token = req.cookies.token;
    const user =  await jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;
    if(user) {
    next();
  }
}

catch(error) {
    res.status(403).json({message: 'token not valid'});
}
   
}

const justAdmins = async (req, res, next) => {
  const {admin_token} = req.cookies;
  
if(admin_token) {
  const result = jwt.verify(admin_token, process.env.SECRET_KEY);
  if(result) next();
}
  else res.status(403).redirect('/');
}
const votesAuth =  async (req, res, next) => { 
  const {token} = req.cookies;
  if(!token) res.status(403).send({message: 'not Allowed'});
  if(token) {
    const result = await jwt.verify(token, process.env.SECRET_KEY);
   if(result) {
    req.user = result;
    next();
   }
   else 
   res.status(403).json({message: 'Not Allowed'})
  }
 
 
}

module.exports = {auth, justAdmins, votesAuth};