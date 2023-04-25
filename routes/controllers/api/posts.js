const jwt = require('jsonwebtoken');
const connection = require('../../../model/database');

const getUsersPosts = async (req, res) => {
    const query = await connection.query('SELECT * FROM users JOIN posts ON users.id = posts.user_id ORDER BY posts.votes DESC');
    const postsData = await query.rows;
    res.status(201).json(postsData);
}
const getUserPosts = async (req, res) => {
    const {id} = req.params;
    const query = await connection.query('SELECT users.name, users.email, posts.id, posts.title, posts.content, posts.votes, posts.created_at FROM users JOIN posts ON posts.user_id = $1 AND users.id = $1', [+id]);
    const result = await query.rows;
    res.status(200).json(result);
}

const addPost = async (req, res) => {
    const {content } = req.body;
   const {token} = req.cookies;
   const user = await jwt.verify(token, process.env.SECRET_KEY);
    const query = await connection.query(`INSERT INTO posts
     (user_id, title, content, votes) 
     VALUES ($1, $2, $3, $4)`,[user.id," ", content, 0]);
    res.status(201).json(query.rows);

}
const deletePost = async (req, res) => {
    const {id} = req.params;
    console.log(+id)
    const query = await connection.query('DELETE FROM posts WHERE id = $1', [+id]);
    res.status(201).json({message: 'Post DELETED'});
}
const updatePostInc = async (req, res) => {
    const {id} = req.params;
    const query = await connection.query('UPDATE posts SET votes = votes + 1 WHERE id =$1', [+id]);
    const getvotes = await connection.query('SELECT votes FROM posts WHERE id =$1', [+id]);
    const result = await getvotes.rows;
    res.status(200).json(result)

}
const updatePostDec = async (req, res) => {
    
    const {id} = req.params;
    const query = await connection.query('UPDATE posts SET votes = votes - 1 WHERE id =$1', [+id]);
    const getvotes = await connection.query('SELECT votes FROM posts WHERE id =$1', [+id]);
    const result = await getvotes.rows;
    res.status(200).json(result)
}

module.exports = {getUsersPosts, getUserPosts, addPost, deletePost, updatePostInc, updatePostDec};