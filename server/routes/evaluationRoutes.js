const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');
const auth = require('../middleware/auth');

// Create evaluation
router.post('/', auth, evaluationController.createEvaluation);
// Get all evaluations
router.get('/', auth, evaluationController.getEvaluations);
// Update evaluation
router.put('/:id', auth, evaluationController.updateEvaluation);
// Delete evaluation
router.delete('/:id', auth, evaluationController.deleteEvaluation);

module.exports = router; 