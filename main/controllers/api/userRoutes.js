const router = require('express').Router();
const { User } = require('../../models');

// POST route for signup - add username and password
router.post('/signup', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      // Check if the error is specifically related to password length validation
      const pwdError = err.errors.find(
        (e) => e.path === 'password' && e.validatorKey === 'len'
      );
      if (pwdError) {
        // If it's a password length validation error, send the error message
        res.status(400).json({ err: pwdError.message });
      } else {
        // Handle other validation errors
        const errorMessages = err.errors.map((e) => e.message);
        res.status(400).json({ errors: errorMessages });
      }
    } else {
    console.log(err);
    res.status(500).json(err);
    }
  }
});

// POST route for login - search username and password to validate
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// POST route for logging out the user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
