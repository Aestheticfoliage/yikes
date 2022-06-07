const path = require('path');

const router = require('express').Router();

router.get('./login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.get('./signUp', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/signUp.html'));
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/mainPage.hmtl'));
});

module.exports = router;