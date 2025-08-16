import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  User, 
  BookOpen, 
  MapPin, 
  Clock, 
  DollarSign, 
  Award,
  Save,
  ArrowLeft,
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const TeacherProfileEditPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [cvFileName, setCvFileName] = useState('');
  const [cvUploadProgress, setCvUploadProgress] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    location: currentUser?.location || '',
    hourlyRate: currentUser?.hourlyRate || '',
    education: currentUser?.education || '',
    experience: currentUser?.experience || '',
    bio: currentUser?.bio || '',
    subjects: currentUser?.subjects || [],
    specializations: currentUser?.specializations || [],
    achievements: currentUser?.achievements || [],
    languages: currentUser?.languages || [],
    availability: currentUser?.availability || []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value.split(',').map(item => item.trim()).filter(item => item)
    }));
  };

  const handleCvUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a PDF or Word document');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setCvFile(file);
      setCvFileName(file.name);
      toast.success('CV uploaded successfully!');
    }
  };

  const removeCvFile = () => {
    setCvFile(null);
    setCvFileName('');
    setCvUploadProgress(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate CV upload
      if (cvFile) {
        setCvUploadProgress(0);
        for (let i = 0; i <= 100; i += 10) {
          await new Promise(resolve => setTimeout(resolve, 100));
          setCvUploadProgress(i);
        }
        toast.success('CV uploaded successfully!');
      }

      // Simulate profile update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Profile updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Error updating profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Profile & CV</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* CV Upload Section */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">CV/Resume Upload</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload your CV/Resume
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleCvUpload}
                      className="hidden"
                      id="cv-upload"
                    />
                    <label htmlFor="cv-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC, DOCX (max 5MB)
                      </p>
                    </label>
                  </div>
                </div>
              </div>

              {cvFile && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">{cvFileName}</p>
                        <p className="text-sm text-green-700">
                          {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeCvFile}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {cvUploadProgress > 0 && cvUploadProgress < 100 && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm text-green-700 mb-1">
                        <span>Uploading...</span>
                        <span>{cvUploadProgress}%</span>
                      </div>
                      <div className="w-full bg-green-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${cvUploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {cvUploadProgress === 100 && (
                    <div className="flex items-center mt-3 text-green-700">
                      <Check className="w-4 h-4 mr-2" />
                      <span className="text-sm">Upload complete!</span>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-blue-900 mb-1">CV Upload Tips</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Include your education, experience, and certifications</li>
                      <li>• Highlight your teaching experience and achievements</li>
                      <li>• Keep it professional and well-formatted</li>
                      <li>• Maximum file size: 5MB</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., Tbilisi, Georgia"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hourly Rate (₾)
                </label>
                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., 45"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., 5 years"
                />
              </div>
            </div>
          </div>

          {/* Education & Bio */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Education & Bio</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education
                </label>
                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  rows={3}
                  className="input-field"
                  placeholder="e.g., PhD in Mathematics, TSU"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="input-field"
                  placeholder="Tell students about your teaching style, experience, and what makes you unique..."
                />
              </div>
            </div>
          </div>

          {/* Subjects & Specializations */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Subjects & Specializations</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subjects (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.subjects.join(', ')}
                  onChange={(e) => handleArrayInputChange('subjects', e.target.value)}
                  className="input-field"
                  placeholder="e.g., Mathematics, Physics, Calculus"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specializations (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.specializations.join(', ')}
                  onChange={(e) => handleArrayInputChange('specializations', e.target.value)}
                  className="input-field"
                  placeholder="e.g., AP Calculus, Test Prep, College Math"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.languages.join(', ')}
                  onChange={(e) => handleArrayInputChange('languages', e.target.value)}
                  className="input-field"
                  placeholder="e.g., Georgian, English, Russian"
                />
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Achievements & Certifications</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Achievements (comma-separated)
              </label>
              <textarea
                value={formData.achievements.join(', ')}
                onChange={(e) => handleArrayInputChange('achievements', e.target.value)}
                rows={3}
                className="input-field"
                placeholder="e.g., Teacher of the Year 2022, Published 15+ papers, 10,000+ hours taught"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex items-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherProfileEditPage; 