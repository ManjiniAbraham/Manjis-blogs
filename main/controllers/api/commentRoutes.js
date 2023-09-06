const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//POST for new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            post_id: req.body.post_id,
            user_id: req.session.user_id,
            body: req.body.comment,
        });

        res.status(200).json(newComment);

    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;