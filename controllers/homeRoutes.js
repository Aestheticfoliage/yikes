const router = require('express').Router();
const { Review, User, Customer} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all reviews and JOIN with user data
    const reviewData = await Review.findAll({
      include: [
        {
          model: Customer,
          attributes: ['customer_name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const tempReviews = reviewData.map((reviews) => reviews.get({ plain: true }));
     let reviews = [];
     for (let i = 0; i < 10; i++) {
      reviews[i] = tempReviews[Math.floor(Math.random() * tempReviews.length)];

      Console.log('Pushing');
     }
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      reviews, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/review/:id', async (req, res) => {
  try {
    const reviewData = await Review.findByPk(req.params.id, {
      include: [
        {
          model: Customer,
          attributes: ['customer_name'],
        },
      ],
    });

    const project = reviewData.get({ plain: true });

    res.render('reviews', {
      ...reviews,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/user', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Review }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;