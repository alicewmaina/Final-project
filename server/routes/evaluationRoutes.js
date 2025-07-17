const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');

// Create evaluation
router.post('/', evaluationController.createEvaluation);
// Get all evaluations
router.get('/', evaluationController.getEvaluations);
// Update evaluation
router.put('/:id', evaluationController.updateEvaluation);
// Delete evaluation
router.delete('/:id', evaluationController.deleteEvaluation);

module.exports = router; 