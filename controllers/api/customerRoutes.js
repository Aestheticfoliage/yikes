const router = require('express').Router();
const { User, Customer } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newCustomer = await Customer.create({
      ...req.body,
      userId: req.session.user_id,
    });

    console.log('newPost', newCustomer);

    res.status(200).json(newCustomer);
  } catch (err) {
    res.status(400).json(err);
  }
});



router.delete('/:id', withAuth, async (req, res) => {
  try {
    const customerData = await Customer.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!Customer) {
      res.status(404).json({ message: 'No customer found with this id!' });
      return;
    }

    res.status(200).json(customerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;