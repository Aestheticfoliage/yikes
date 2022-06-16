const router = require('express').Router();
const userRoutes = require('./userRoutes');
const customerRoutes = require('./customerRoutes');

router.use('/users', userRoutes);
router.use('/customer', customerRoutes);

module.exports = router;
