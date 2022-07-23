const router = require('express').Router();
const { Review, User} = require('../models');
const withAuth = require('../utils/auth');
const {Op} = require('sequelize');

router.get('/', async (req,res)=>{
  const reviewData = await Review.findAll();
  const reviews = reviewData.map(review=> review.get({plain:true}))
  res.render('homepage', {reviews})
});

router.get('/home', async (req,res)=>{
  const reviewData = await Review.findAll();
  const reviews = reviewData.map(review=> review.get({plain:true}))
  res.render('homepage', {reviews, loggedIn: req.session.loggedIn})
});

// router.get('/home', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.loggedIn) {
//     res.redirect('/homepage');
//     return;
//   }

//   res.render('/homepage');
// });

router.get('/reviews-all', async (req,res)=>{
  const reviewData = await Review.findAll({include: [User]});
  const reviews = reviewData.map(review => review.get({plain:true}))
  console.log(reviews, req.session)
  res.render('reviews-all', { reviews, loggedIn: req.session.loggedIn});
});

router.get('/reviews/:guest', async (req, res) => {
  // accepting username through req.body
  // get user from reviews by customer.name
  try {
    // console.log("name", req.body.name)
    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
        },
      ],
      where: { name: {[Op.substring]: req.params.guest} },
    });
    const reviews = reviewData.map((review) => review.get({ plain: true }));
    console.log(reviews)
    // res.json(reviews)
    // Rendering the handlebar page
  //   const reviewData = await Review.findAll({include: [User]});
  // const reviews = reviewData.map(review=> review.get({plain:true}))
  res.render('search', { reviews, loggedIn: req.session.loggedIn});
  // res.json(reviews)
  
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/review-new', async (req,res)=>{
  const reviewNewData = await Review.findAll();
  const reviews = reviewNewData.map(review=> review.get({plain:true}))
  res.render('review-new', { reviews, loggedIn: req.session.loggedIn});
});


// Use withAuth middleware to prevent access to route
router.get('/user', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.userId, {
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
  if (req.session.loggedIn) {
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
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).redirect("/");
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
