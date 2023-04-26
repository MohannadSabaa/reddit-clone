const express = require('express');
const { getUsers } = require('../controllers/api/users');
const { getUsersPosts, getUserPosts, addPost, deletePost, updatePostInc, updatePostDec } = require('../controllers/api/posts');
const deletePostAuth = require('../../middlewares/deletePost');
const { justAdmins, votesAuth } = require('../../middlewares/authorization');

const router = express.Router();


router.get('/users', justAdmins ,getUsers);
router.get('/posts', getUsersPosts);
router.post('/posts',votesAuth,addPost);
router.delete('/posts/:id',deletePostAuth,deletePost);
router.put('/posts/inc/:id',votesAuth,updatePostInc)
router.put('/posts/dec/:id', votesAuth,updatePostDec);
router.get('/posts/:id/:name', getUserPosts)

module.exports = router;