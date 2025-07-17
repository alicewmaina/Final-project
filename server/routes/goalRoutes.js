const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');

// Create goal
router.post('/', goalController.createGoal);
// Get all goals
router.get('/', goalController.getGoals);
// Update goal
router.put('/:id', goalController.updateGoal);
// Delete goal
router.delete('/:id', goalController.deleteGoal);

module.exports = router; 