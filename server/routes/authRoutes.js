 const express = require('express');
const { checkEmailExists, signup, login, validateSignup, validateLogin } = require('../controllers/userController');
const router = express.Router();

// Example route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth route working!' });
});

router.post('/check-email', checkEmailExists);
router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);

module.exports = router;
