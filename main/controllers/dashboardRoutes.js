const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Route for getting all posts belonging to the user for the dasboard - can be accessed only when logged in
router.get('/', withAuth, async (req, res) => {
    try {
        const blogData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [{
                model: User
            }],
            order: [["date_created", "DESC"]],
        });

        const blogPosts = blogData.map((post) => post.get({plain: true}));

        res.render('dashboard', {
            active_dashboard: true,
            blogPosts, 
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;