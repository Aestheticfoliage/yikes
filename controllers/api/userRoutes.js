const router = require('express').Router();
const { User } = require('../../models');

// router.post('/', async (req, res) => {
//   try {
//     const userData = await User.create(req.body);
//     console.log(userData + "USERDATAHERE");
//     req.session.save(() => {
//       req.session.userId = userData.id;
//       req.session.loggedIn = true;
//       res.status(200).json(userData);
//     });
//     console.log(userData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });
router.get('/all', async (req,res)=>{
  try {
    const users = await User.findAll()
    res.json(users) // sending json
  } catch (error) {
    res.status(500).json(err)
  }
})

router.post('/new', async (req, res) => {
  console.log(req.body)
  try {
    const newUser = await User.create({
      userName: req.body.userName,
      business_name: req.body.business_name,
      email: req.body.email,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.userName = newUser.userName;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.post('/signIn', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { userName: req.body.userName } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);
    console.log(validPassword);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.userName = userData.userName;
      req.session.loggedIn = true;

      res.json({ user: userData, message: 'You are now logged in!' });
      console.log("You are now logged in!")
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.post('/logout', (req, res) => {
//   if (req.session.loggedIn) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });


module.exports = router;
