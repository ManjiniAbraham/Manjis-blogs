const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// POST route for creating a new blog post - use the title, content and logged in user_id
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            body: req.body.content,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);

    } catch (err) {
        res.status(400).json(err);
    }
});

// POST route for updating existing blog post based on the :id passed and logged in user_id
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update({
            title: req.body.title,
            body: req.body.content,
            user_id: req.session.user_id
        },{
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE route for deleting existing blog post based on the :id passed and logged in user_id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        });

        if (!postData) {
            res.status(404).json({ message: "Cant delete this post!" });
            return;
        }

        res.status(200).json(postData);

    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route for finding existing blog post based on the :id passed
router.get('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            where: {
                user_id: req.session.user_id
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No Post found with this id!' });
            return;
        }

        const post = postData.get({plain: true});

        res.json(post);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }   
});

module.exports = router;
