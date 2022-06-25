const router = require('express').Router();
const { Review } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      userId: req.session.user_id,
    });

    console.log('newPost', newReview);

    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});



router.delete('/:id', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
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

router.get('/search', withAuth, async (req, res) => {
  try {
    console.log("Reviews");
    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
        },
      ],
      where: { user_id: req.session.user_id },
    });
    const reviews = reviewData.map((review) => review.get({ plain: true }));
    res.render('search', { reviews });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;