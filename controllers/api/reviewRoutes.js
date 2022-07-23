const router = require('express').Router();
const { Review, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/all', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [User],
    });
    const review = reviewData.map((review) => review.get({ plain: true }));

    console.log(review);

    res.render('reviews-all', {review, loggedIn: req.session.loggedIn});

    // res.status(200).json(reviewData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/new', withAuth, async (req, res) => {
  const body = req.body;
    console.log(body);
  try {
    const newReview = await Review.create({ ...body, userId: req.session.userId });

    console.log(' New Review Posted', newReview);

    res.render('reviews-all', {newReview, loggedIn: req.session.loggedIn})
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.userId,
      },
    });

    if (!Review) {
      res.status(404).json({ message: 'No reviews found with this id!' });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/', async (req, res) => {
  // accepting username through req.body
  // get user from reviews by customer.name
  try {
    console.log("name", req.body.name)
    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
        },
      ],
      where: { name: req.body.name },
    });
    const reviews = reviewData.map((review) => review.get({ plain: true }));
    console.log(reviews)
    // res.json(reviews)
    // Rendering the handlebar page
  //   const reviewData = await Review.findAll({include: [User]});
  // const reviews = reviewData.map(review=> review.get({plain:true}))
  // res.render('search', { reviews, loggedIn: req.session.loggedIn});
  res.json(reviews)
  
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;