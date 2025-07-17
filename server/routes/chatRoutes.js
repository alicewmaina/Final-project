const express = require('express');
const router = express.Router();

// Example: Get chat history for a room (placeholder)
router.get('/:roomId/history', (req, res) => {
  // TODO: Implement fetching chat history for a room
  res.json({ message: `Chat history for room ${req.params.roomId}` });
});

module.exports = router; 