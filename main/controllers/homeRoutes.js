const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//routes for getting all the blog posts from the database sorted in descending order by date_created
router.get('/', async (req, res) => {
  try {
    // Get all the posts
    const blogData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [["date_created", "DESC"]],
    });

    const blogPosts = blogData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      active_home: true,
      blogPosts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//route for displaying a single post, found by the post's id and all it's data with the username joined.
router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id,{
      include: [
        {
          model: Comment,
          attributes: ['id', 'body', 'post_id', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        { 
          model: User, attributes: ['id','username']
        }
      ]
    });

    const post = postData.get({plain: true});
    res.render('post', {
        active_home: true,
        post, 
        logged_in: req.session.logged_in
    });
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

//route for editing/updating a post - send a logged in user to the edit post page
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id,{
      include: [
        { 
          model: User, attributes: ['id','username']
        }
      ]
    });
    const post = postData.get({plain: true});
    res.render('edit-post', {
        active_dashboard: true,
        post, 
        logged_in: req.session.logged_in
    });
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

// Route for user login page, if already logged in redirect to the home page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Rout for user logout - on logout redirect to the home page
router.get('/logout', (req, res) => {

  res.redirect('/');
  return;

});

// Route for user signup page, if already logged in redirect to the home page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  } else {
    res.render('signup');
  }
});

// Route for a new post page, available only when user is logged in.
router.get('/new-post', (req,res) => {
  if (req.session.logged_in) {
    res.render('new-post', {
      active_newpost: true,
      logged_in: req.session.logged_in
    });
    return;
  }
});

module.exports = router;
