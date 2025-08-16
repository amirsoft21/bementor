const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    // TODO: Implement booking creation
    res.status(201).json({
      success: true,
      message: 'დაჯავშნა წარმატებით შეიქმნა'
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'დაჯავშნის შექმნისას შეცდომა მოხდა'
    });
  }
});

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    // TODO: Implement get bookings
    res.json({
      success: true,
      data: []
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'დაჯავშნების მიღებისას შეცდომა მოხდა'
    });
  }
});

module.exports = router; 