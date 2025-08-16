const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subjects: [{
    type: String,
    required: true
  }],
  education: {
    type: String,
    required: [true, 'განათლება აუცილებელია']
  },
  experience: {
    type: String,
    required: [true, 'გამოცდილება აუცილებელია']
  },
  hourlyRate: {
    type: Number,
    required: [true, 'საათობრივი ფასი აუცილებელია'],
    min: [0, 'ფასი არ შეიძლება იყოს უარყოფითი']
  },
  bio: {
    type: String,
    required: [true, 'ბიო აუცილებელია'],
    maxlength: [1000, 'ბიო არ შეიძლება იყოს 1000 სიმბოლოზე მეტი']
  },
  availability: [{
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }],
  languages: [{
    type: String
  }],
  specializations: [{
    type: String
  }],
  achievements: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  totalStudents: {
    type: Number,
    default: 0
  },
  totalHours: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  documents: [{
    name: String,
    url: String,
    type: String // 'certificate', 'diploma', 'id', etc.
  }],
  teachingStyle: {
    type: String,
    enum: ['structured', 'flexible', 'interactive', 'traditional'],
    default: 'flexible'
  },
  ageGroups: [{
    type: String,
    enum: ['children', 'teenagers', 'adults', 'seniors']
  }],
  onlineTeaching: {
    type: Boolean,
    default: true
  },
  inPersonTeaching: {
    type: Boolean,
    default: true
  },
  groupSessions: {
    type: Boolean,
    default: false
  },
  groupSize: {
    type: Number,
    default: 1,
    min: 1,
    max: 10
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search functionality
teacherSchema.index({ 
  subjects: 'text', 
  bio: 'text', 
  'user.name': 'text' 
});

// Virtual for average rating calculation
teacherSchema.virtual('averageRating').get(function() {
  return this.reviewCount > 0 ? this.rating / this.reviewCount : 0;
});

// Ensure virtual fields are serialized
teacherSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Teacher', teacherSchema); 