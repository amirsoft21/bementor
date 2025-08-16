const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Teacher = require('../models/Teacher');
const { protect } = require('../middleware/auth');

const router = express.Router();

// In-memory storage for development when MongoDB is not available
const inMemoryUsers = new Map();
const inMemoryTeachers = new Map();

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('სახელი უნდა იყოს 2-50 სიმბოლო'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო'),
  body('role')
    .isIn(['student', 'teacher'])
    .withMessage('როლი უნდა იყოს სტუდენტი ან მასწავლებელი')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, password, role, phone, location } = req.body;

    // Check if MongoDB is connected
    const isMongoConnected = require('mongoose').connection.readyState === 1;

    if (isMongoConnected) {
      // Use MongoDB
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'მომხმარებელი ამ ელ-ფოსტით უკვე არსებობს'
        });
      }

      // Create user
      const user = await User.create({
        name,
        email,
        password,
        role,
        phone,
        location
      });

      // If user is a teacher, create teacher profile
      if (role === 'teacher') {
        await Teacher.create({
          user: user._id,
          subjects: [],
          education: '',
          experience: '',
          hourlyRate: 0,
          bio: ''
        });
      }

      // Generate JWT token
      const token = user.getSignedJwtToken();

      res.status(201).json({
        success: true,
        message: 'მომხმარებელი წარმატებით შეიქმნა',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          isPremium: user.isPremium
        }
      });
    } else {
      // Use in-memory storage
      if (inMemoryUsers.has(email)) {
        return res.status(400).json({
          success: false,
          message: 'მომხმარებელი ამ ელ-ფოსტით უკვე არსებობს'
        });
      }

      // Create user in memory
      const userId = Date.now().toString();
      const user = {
        id: userId,
        name,
        email,
        password, // In production, this should be hashed
        role,
        phone,
        location,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        isPremium: false,
        premiumPlan: 'free',
        isVerified: false,
        createdAt: new Date()
      };

      inMemoryUsers.set(email, user);

      // If user is a teacher, create teacher profile in memory
      if (role === 'teacher') {
        const teacherId = Date.now().toString();
        const teacher = {
          id: teacherId,
          user: userId,
          subjects: [],
          education: '',
          experience: '',
          hourlyRate: 0,
          bio: '',
          rating: 0,
          reviewCount: 0,
          isActive: true,
          createdAt: new Date()
        };
        inMemoryTeachers.set(userId, teacher);
      }

      // Generate simple token (in production, use proper JWT)
      const token = Buffer.from(JSON.stringify({ id: userId, email, role })).toString('base64');

      res.status(201).json({
        success: true,
        message: 'მომხმარებელი წარმატებით შეიქმნა (Development Mode)',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          isPremium: user.isPremium
        }
      });
    }

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'რეგისტრაციისას შეცდომა მოხდა'
    });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა'),
  body('password')
    .exists()
    .withMessage('პაროლი აუცილებელია')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { email, password, role } = req.body;

    // Check if MongoDB is connected
    const isMongoConnected = require('mongoose').connection.readyState === 1;

    if (isMongoConnected) {
      // Use MongoDB
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'არასწორი ელ-ფოსტა ან პაროლი'
        });
      }

      // Check if user role matches
      if (role && user.role !== role) {
        return res.status(401).json({
          success: false,
          message: `ეს ანგარიში არ არის ${role === 'student' ? 'სტუდენტის' : 'მასწავლებლის'} ანგარიში`
        });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'არასწორი ელ-ფოსტა ან პაროლი'
        });
      }

      // Update last login
      user.lastLogin = Date.now();
      await user.save();

      // Generate JWT token
      const token = user.getSignedJwtToken();

      res.json({
        success: true,
        message: 'წარმატებით შეხვედით',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          isPremium: user.isPremium,
          premiumPlan: user.premiumPlan
        }
      });
    } else {
      // Use in-memory storage
      const user = inMemoryUsers.get(email);
      if (!user || user.password !== password) {
        return res.status(401).json({
          success: false,
          message: 'არასწორი ელ-ფოსტა ან პაროლი'
        });
      }

      // Check if user role matches
      if (role && user.role !== role) {
        return res.status(401).json({
          success: false,
          message: `ეს ანგარიში არ არის ${role === 'student' ? 'სტუდენტის' : 'მასწავლებლის'} ანგარიში`
        });
      }

      // Generate simple token
      const token = Buffer.from(JSON.stringify({ id: user.id, email, role: user.role })).toString('base64');

      res.json({
        success: true,
        message: 'წარმატებით შეხვედით (Development Mode)',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          isPremium: user.isPremium,
          premiumPlan: user.premiumPlan
        }
      });
    }

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'შესვლისას შეცდომა მოხდა'
    });
  }
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const isMongoConnected = require('mongoose').connection.readyState === 1;

    if (isMongoConnected) {
      const user = await User.findById(req.user.id);
      
      res.json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          phone: user.phone,
          location: user.location,
          bio: user.bio,
          isPremium: user.isPremium,
          premiumPlan: user.premiumPlan,
          isVerified: user.isVerified
        }
      });
    } else {
      // Find user in memory by token
      const user = Array.from(inMemoryUsers.values()).find(u => u.id === req.user.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'მომხმარებელი ვერ მოიძებნა'
        });
      }

      res.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          phone: user.phone,
          location: user.location,
          bio: user.bio,
          isPremium: user.isPremium,
          premiumPlan: user.premiumPlan,
          isVerified: user.isVerified
        }
      });
    }
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'მომხმარებლის მონაცემების მიღებისას შეცდომა მოხდა'
    });
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'წარმატებით გამოხვედით'
  });
});

module.exports = router; 