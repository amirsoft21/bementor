const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// In-memory storage for subscriptions
const subscriptions = new Map();

// @desc    Create subscription
// @route   POST /api/payments/subscribe
// @access  Private
router.post('/subscribe', protect, async (req, res) => {
  try {
    const { planId, billingCycle } = req.body;
    
    // Mock subscription plans
    const plans = {
      'premium': {
        name: 'Premium',
        price: billingCycle === 'yearly' ? 99 : 9.99,
        features: ['ულიმიტო მასწავლებელი', 'პრიორიტეტული მხარდაჭერა', 'ვიდეო ზარები']
      },
      'professional': {
        name: 'Professional',
        price: billingCycle === 'yearly' ? 199 : 19.99,
        features: ['ყველა Premium ფუნქცია', 'პერსონალური მენეჯერი', 'სპეციალური ფასები']
      }
    };

    const plan = plans[planId];
    if (!plan) {
      return res.status(400).json({
        success: false,
        message: 'არასწორი გეგმა'
      });
    }

    // Create subscription
    const subscription = {
      id: Date.now().toString(),
      userId: req.user.id,
      planId,
      planName: plan.name,
      price: plan.price,
      billingCycle,
      status: 'active',
      startDate: new Date(),
      endDate: new Date(Date.now() + (billingCycle === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000),
      features: plan.features
    };

    subscriptions.set(subscription.id, subscription);

    res.status(201).json({
      success: true,
      message: 'გამოწერა წარმატებით შეიქმნა',
      subscription: {
        id: subscription.id,
        planName: subscription.planName,
        price: subscription.price,
        status: subscription.status,
        endDate: subscription.endDate
      }
    });

  } catch (error) {
    console.error('Create subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'გამოწერის შექმნისას შეცდომა მოხდა'
    });
  }
});

// @desc    Get user subscriptions
// @route   GET /api/payments/subscriptions
// @access  Private
router.get('/subscriptions', protect, async (req, res) => {
  try {
    const userSubscriptions = Array.from(subscriptions.values())
      .filter(sub => sub.userId === req.user.id);

    res.json({
      success: true,
      data: userSubscriptions
    });
  } catch (error) {
    console.error('Get subscriptions error:', error);
    res.status(500).json({
      success: false,
      message: 'გამოწერების მიღებისას შეცდომა მოხდა'
    });
  }
});

// @desc    Cancel subscription
// @route   DELETE /api/payments/subscriptions/:id
// @access  Private
router.delete('/subscriptions/:id', protect, async (req, res) => {
  try {
    const subscription = subscriptions.get(req.params.id);
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'გამოწერა ვერ მოიძებნა'
      });
    }

    if (subscription.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'არაა ნებართვა ამ გამოწერის გაუქმებისთვის'
      });
    }

    subscription.status = 'cancelled';
    subscriptions.set(req.params.id, subscription);

    res.json({
      success: true,
      message: 'გამოწერა წარმატებით გაუქმდა'
    });

  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'გამოწერის გაუქმებისას შეცდომა მოხდა'
    });
  }
});

// @desc    Get available plans
// @route   GET /api/payments/plans
// @access  Public
router.get('/plans', (req, res) => {
  const plans = [
    {
      id: 'free',
      name: 'უფასო',
      price: 0,
      features: ['5 მასწავლებელი თვეში', 'ძირითადი მხარდაჭერა', 'ჩატი']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 9.99,
      yearlyPrice: 99,
      features: ['ულიმიტო მასწავლებელი', 'პრიორიტეტული მხარდაჭერა', 'ვიდეო ზარები']
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 19.99,
      yearlyPrice: 199,
      features: ['ყველა Premium ფუნქცია', 'პერსონალური მენეჯერი', 'სპეციალური ფასები']
    }
  ];

  res.json({
    success: true,
    data: plans
  });
});

module.exports = router; 