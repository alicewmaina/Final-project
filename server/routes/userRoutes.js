const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/me', auth, (req, res) => {
  res.json({ user: req.user });
});

// Create user
router.post('/', userController.createUser);
// Get all users (protected)
router.get('/', auth, userController.getUsers);
// Update user (protected)
router.put('/:id', auth, userController.updateUser);
// Delete user (protected)
router.delete('/:id', auth, userController.deleteUser);

module.exports = router; 