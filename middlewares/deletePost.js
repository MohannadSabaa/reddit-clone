
const jwt = require('jsonwebtoken');
const connection = require('../model/database');
require('express').urlencoded({extended: false})
const deletePostAuth = async (req, res, next) => {
try {
      const {id} = req.params;
      const token  = req.cookies.token;
      const user = await jwt.verify(token, process.env.SECRET_KEY);
      const post = await connection.query(`SELECT * FROM users JOIN posts ON posts.user_id =$1 AND posts.id =$2`, [user.id, +id])
      const result = await post.rows;
   
    if(result.length === 0) throw new Error('Post not found')
 else {
    next();
 }
}
catch(error) {
res.status(403).json({message: `action failed`});
}
}

module.exports = deletePostAuth;