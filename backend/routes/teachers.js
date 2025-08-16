const express = require('express');
const Teacher = require('../models/Teacher');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Mock teacher data for development when MongoDB is not available
const mockTeachers = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'ნინო ბერიძე',
      email: 'nino@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      location: 'თბილისი, ვაკე'
    },
    subjects: ['მათემატიკა', 'ფიზიკა'],
    education: 'თბილისის სახელმწიფო უნივერსიტეტი',
    experience: '5 წელი',
    hourlyRate: 25,
    bio: 'გამოცდილი მასწავლებელი მათემატიკისა და ფიზიკის სფეროში',
    rating: 4.8,
    reviewCount: 12,
    isFeatured: true,
    isVerified: true
  },
  {
    id: '2',
    user: {
      id: '2',
      name: 'გიორგი მაისურაძე',
      email: 'giorgi@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      location: 'თბილისი, საბურთალო'
    },
    subjects: ['ინგლისური', 'გერმანული'],
    education: 'ილია ჭავჭავაძის უნივერსიტეტი',
    experience: '3 წელი',
    hourlyRate: 20,
    bio: 'ენების მასწავლებელი, ფოკუსირებული ვიზუალურ მასალებზე',
    rating: 4.6,
    reviewCount: 8,
    isFeatured: false,
    isVerified: true
  },
  {
    id: '3',
    user: {
      id: '3',
      name: 'ანა კაპანაძე',
      email: 'ana@example.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      location: 'თბილისი, დიდუბე'
    },
    subjects: ['ქიმია', 'ბიოლოგია'],
    education: 'თსუ ბიოლოგიის ფაკულტეტი',
    experience: '7 წელი',
    hourlyRate: 30,
    bio: 'ბუნებრივი მეცნიერებების მასწავლებელი პრაქტიკული მიდგომით',
    rating: 4.9,
    reviewCount: 15,
    isFeatured: true,
    isVerified: true
  }
];

// @desc    Get all teachers with filters
// @route   GET /api/teachers
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      search,
      subject,
      location,
      minPrice,
      maxPrice,
      minRating,
      sortBy = 'rating',
      page = 1,
      limit = 12
    } = req.query;

    // Check if MongoDB is connected
    const isMongoConnected = require('mongoose').connection.readyState === 1;

    if (isMongoConnected) {
      // Use MongoDB
      // Build query
      let query = { isActive: true };
      
      // Search functionality
      if (search) {
        query.$text = { $search: search };
      }

      // Subject filter
      if (subject) {
        query.subjects = { $in: [subject] };
      }

      // Location filter
      if (location) {
        query['user.location'] = { $regex: location, $options: 'i' };
      }

      // Price range filter
      if (minPrice || maxPrice) {
        query.hourlyRate = {};
        if (minPrice) query.hourlyRate.$gte = Number(minPrice);
        if (maxPrice) query.hourlyRate.$lte = Number(maxPrice);
      }

      // Rating filter
      if (minRating) {
        query.rating = { $gte: Number(minRating) };
      }

      // Build sort object
      let sort = {};
      switch (sortBy) {
        case 'rating':
          sort = { rating: -1 };
          break;
        case 'price-low':
          sort = { hourlyRate: 1 };
          break;
        case 'price-high':
          sort = { hourlyRate: -1 };
          break;
        case 'experience':
          sort = { experience: -1 };
          break;
        default:
          sort = { rating: -1 };
      }

      // Pagination
      const skip = (page - 1) * limit;

      const teachers = await Teacher.find(query)
        .populate('user', 'name email avatar location phone')
        .sort(sort)
        .skip(skip)
        .limit(Number(limit));

      const total = await Teacher.countDocuments(query);

      res.json({
        success: true,
        count: teachers.length,
        total,
        pagination: {
          current: Number(page),
          pages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1
        },
        data: teachers
      });
    } else {
      // Use mock data
      let filteredTeachers = [...mockTeachers];

      // Apply filters
      if (search) {
        const searchLower = search.toLowerCase();
        filteredTeachers = filteredTeachers.filter(teacher => 
          teacher.user.name.toLowerCase().includes(searchLower) ||
          teacher.subjects.some(subject => subject.toLowerCase().includes(searchLower)) ||
          teacher.bio.toLowerCase().includes(searchLower)
        );
      }

      if (subject) {
        filteredTeachers = filteredTeachers.filter(teacher =>
          teacher.subjects.includes(subject)
        );
      }

      if (location) {
        filteredTeachers = filteredTeachers.filter(teacher =>
          teacher.user.location.toLowerCase().includes(location.toLowerCase())
        );
      }

      if (minPrice) {
        filteredTeachers = filteredTeachers.filter(teacher =>
          teacher.hourlyRate >= Number(minPrice)
        );
      }

      if (maxPrice) {
        filteredTeachers = filteredTeachers.filter(teacher =>
          teacher.hourlyRate <= Number(maxPrice)
        );
      }

      if (minRating) {
        filteredTeachers = filteredTeachers.filter(teacher =>
          teacher.rating >= Number(minRating)
        );
      }

      // Apply sorting
      switch (sortBy) {
        case 'rating':
          filteredTeachers.sort((a, b) => b.rating - a.rating);
          break;
        case 'price-low':
          filteredTeachers.sort((a, b) => a.hourlyRate - b.hourlyRate);
          break;
        case 'price-high':
          filteredTeachers.sort((a, b) => b.hourlyRate - a.hourlyRate);
          break;
        default:
          filteredTeachers.sort((a, b) => b.rating - a.rating);
      }

      // Apply pagination
      const total = filteredTeachers.length;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + Number(limit);
      const paginatedTeachers = filteredTeachers.slice(startIndex, endIndex);

      res.json({
        success: true,
        count: paginatedTeachers.length,
        total,
        pagination: {
          current: Number(page),
          pages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1
        },
        data: paginatedTeachers
      });
    }

  } catch (error) {
    console.error('Get teachers error:', error);
    res.status(500).json({
      success: false,
      message: 'მასწავლებლების მიღებისას შეცდომა მოხდა'
    });
  }
});

// @desc    Get single teacher
// @route   GET /api/teachers/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate('user', 'name email avatar location phone bio');

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'მასწავლებელი ვერ მოიძებნა'
      });
    }

    res.json({
      success: true,
      data: teacher
    });

  } catch (error) {
    console.error('Get teacher error:', error);
    res.status(500).json({
      success: false,
      message: 'მასწავლებლის მიღებისას შეცდომა მოხდა'
    });
  }
});

// @desc    Create teacher profile
// @route   POST /api/teachers
// @access  Private (Teachers only)
router.post('/', protect, authorize('teacher'), async (req, res) => {
  try {
    const {
      subjects,
      education,
      experience,
      hourlyRate,
      bio,
      availability,
      languages,
      specializations,
      achievements
    } = req.body;

    // Check if teacher profile already exists
    const existingProfile = await Teacher.findOne({ user: req.user.id });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: 'მასწავლებლის პროფილი უკვე არსებობს'
      });
    }

    const teacher = await Teacher.create({
      user: req.user.id,
      subjects,
      education,
      experience,
      hourlyRate,
      bio,
      availability,
      languages,
      specializations,
      achievements
    });

    res.status(201).json({
      success: true,
      message: 'მასწავლებლის პროფილი წარმატებით შეიქმნა',
      data: teacher
    });

  } catch (error) {
    console.error('Create teacher error:', error);
    res.status(500).json({
      success: false,
      message: 'მასწავლებლის პროფილის შექმნისას შეცდომა მოხდა'
    });
  }
});

// @desc    Update teacher profile
// @route   PUT /api/teachers/:id
// @access  Private (Teacher owner only)
router.put('/:id', protect, authorize('teacher'), async (req, res) => {
  try {
    let teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'მასწავლებელი ვერ მოიძებნა'
      });
    }

    // Make sure user owns the teacher profile
    if (teacher.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'არაა ნებართვა ამ პროფილის რედაქტირებისთვის'
      });
    }

    teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      message: 'პროფილი წარმატებით განახლდა',
      data: teacher
    });

  } catch (error) {
    console.error('Update teacher error:', error);
    res.status(500).json({
      success: false,
      message: 'პროფილის განახლებისას შეცდომა მოხდა'
    });
  }
});

// @desc    Get featured teachers
// @route   GET /api/teachers/featured
// @access  Public
router.get('/featured/featured', async (req, res) => {
  try {
    const teachers = await Teacher.find({ 
      isFeatured: true, 
      isActive: true 
    })
    .populate('user', 'name email avatar location')
    .limit(6)
    .sort({ rating: -1 });

    res.json({
      success: true,
      count: teachers.length,
      data: teachers
    });

  } catch (error) {
    console.error('Get featured teachers error:', error);
    res.status(500).json({
      success: false,
      message: 'რეკომენდირებული მასწავლებლების მიღებისას შეცდომა მოხდა'
    });
  }
});

module.exports = router; 