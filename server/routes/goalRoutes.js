const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');
const auth = require('../middleware/auth');

// Create goal
router.post('/', auth, goalController.createGoal);
// Get all goals
router.get('/', auth, goalController.getGoals);
// Update goal
router.put('/:id', auth, goalController.updateGoal);
// Delete goal
router.delete('/:id', auth, goalController.deleteGoal);

module.exports = router; 