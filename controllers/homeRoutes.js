const router = require('express').Router();
const { Review, User} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req,res)=>{
  const reviewData = await Review.findAll();
  const reviews = reviewData.map(review=> review.get({plain:true}))
  res.render('homepage', {reviews})
});

router.get('/home', async (req,res)=>{
  const reviewData = await Review.findAll();
  const reviews = reviewData.map(review=> review.get({plain:true}))
  res.render('homepage', {reviews})
});

// router.get('/home', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/homepage');
//     return;
//   }

//   res.render('/homepage');
// });

router.get('/reviews-all', async (req,res)=>{
  const reviewData = await Review.findAll({include: [User]});
  const reviews = reviewData.map(review=> review.get({plain:true}))
  console.log(reviews)
  res.render('reviews-all', { reviews, loggedIn: req.session.logged_in});
});

router.get('/review-new', async (req,res)=>{
  const reviewNewData = await Review.findAll();
  const reviews = reviewNewData.map(review=> review.get({plain:true}))
  res.render('review-new', { reviews, loggedIn: req.session.logged_in});
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

    res.render('review-new', {
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
    res.redirect('/reviews-all');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/reviews-all');
    return;
  }

  res.render('signup');
});

router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).redirect("/");
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
