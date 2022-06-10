const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./customerRoutes');

router.use('/users', userRoutes);
router.use('/customer', projectRoutes);

module.exports = router;
