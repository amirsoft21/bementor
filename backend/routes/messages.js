const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Get user conversations
// @route   GET /api/messages/conversations
// @access  Private
router.get('/conversations', protect, async (req, res) => {
  try {
    // TODO: Implement get conversations
    res.json({
      success: true,
      data: []
    });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({
      success: false,
      message: 'საუბრების მიღებისას შეცდომა მოხდა'
    });
  }
});

// @desc    Send message
// @route   POST /api/messages
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    // TODO: Implement send message
    res.status(201).json({
      success: true,
      message: 'შეტყობინება წარმატებით გაიგზავნა'
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: 'შეტყობინების გაგზავნისას შეცდომა მოხდა'
    });
  }
});

module.exports = router; 