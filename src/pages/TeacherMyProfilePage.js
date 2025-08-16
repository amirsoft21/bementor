import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
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
  AlertCircle,
  Edit,
  Eye,
  Download,
  Trash2,
  Plus,
  Calendar,
  Globe,
  Star,
  MessageCircle,
  Settings,
  FileEdit,
  Shield,
  Info
} from 'lucide-react';
import toast from 'react-hot-toast';

const TeacherMyProfilePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [cvFile, setCvFile] = useState(null);
  const [cvFileName, setCvFileName] = useState('');
  const [cvUploadProgress, setCvUploadProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

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
    availability: currentUser?.availability || [],
    termsAndConditions: currentUser?.termsAndConditions || ''
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
        toast.error('გთხოვთ ატვირთოთ PDF ან Word დოკუმენტი');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('ფაილის ზომა უნდა იყოს 5MB-ზე ნაკლები');
        return;
      }

      setCvFile(file);
      setCvFileName(file.name);
      toast.success('CV წარმატებით ატვირთულია!');
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
        toast.success('CV წარმატებით ატვირთულია!');
      }

      // Simulate profile update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('პროფილი წარმატებით განახლდა!');
      setIsEditing(false);
    } catch (error) {
      toast.error('შეცდომა პროფილის განახლებისას. გთხოვთ სცადოთ თავიდან.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Profile Preview */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">პროფილის გადახედვა</h3>
          <button
            onClick={() => setIsEditing(true)}
            className="btn-primary flex items-center"
          >
            <Edit className="w-4 h-4 mr-2" />
            რედაქტირება
          </button>
        </div>
        
        <div className="flex items-start space-x-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-gray-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{formData.name}</h2>
            <p className="text-gray-600 mb-3">{formData.education}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {formData.location}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {formData.experience} გამოცდილება
              </div>
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                {formData.hourlyRate}₾/საათი
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-6 h-6 text-primary-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formData.subjects.length}</p>
          <p className="text-sm text-gray-600">საგნები</p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">4.8</p>
          <p className="text-sm text-gray-600">რეიტინგი</p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <MessageCircle className="w-6 h-6 text-accent-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">24</p>
          <p className="text-sm text-gray-600">შეტყობინება</p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">3</p>
          <p className="text-sm text-gray-600">მომავალი გაკვეთილი</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ბოლო აქტივობა</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">გაკვეთილი დასრულდა</p>
              <p className="text-sm text-gray-600">მათემატიკა - ალექსანდრე</p>
            </div>
            <span className="text-sm text-gray-500">2 საათის წინ</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">ახალი შეტყობინება</p>
              <p className="text-sm text-gray-600">მარიამ - ფიზიკის გაკვეთილი</p>
            </div>
            <span className="text-sm text-gray-500">4 საათის წინ</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEditForm = () => (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* CV Upload Section */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">CV/Resume ატვირთვა</h2>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ატვირთეთ თქვენი CV/Resume
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
                    დააჭირეთ ატვირთვისთვის ან ჩაიტანეთ ფაილი
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DOC, DOCX (მაქსიმუმ 5MB)
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
                    <span>ატვირთვა...</span>
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
                  <span className="text-sm">ატვირთვა დასრულდა!</span>
                </div>
              )}
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-900 mb-1">CV ატვირთვის რჩევები</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• ჩართეთ თქვენი განათლება, გამოცდილება და სერტიფიკატები</li>
                  <li>• ხაზი გაუსვით სწავლების გამოცდილებას და მიღწევებს</li>
                  <li>• შეინარჩუნეთ პროფესიონალური და კარგად ფორმატირებული</li>
                  <li>• მაქსიმალური ფაილის ზომა: 5MB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">ძირითადი ინფორმაცია</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              სრული სახელი
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
              ელ-ფოსტა
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
              ტელეფონის ნომერი
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
              მდებარეობა
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="input-field"
              placeholder="მაგ., თბილისი, საქართველო"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              საათობრივი ფასი (₾)
            </label>
            <input
              type="number"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleInputChange}
              className="input-field"
              placeholder="მაგ., 45"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              გამოცდილების წლები
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="input-field"
              placeholder="მაგ., 5 წელი"
            />
          </div>
        </div>
      </div>

      {/* Education & Bio */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">განათლება და ბიო</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              განათლება
            </label>
            <textarea
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              rows={3}
              className="input-field"
              placeholder="მაგ., მათემატიკის დოქტორი, თსუ"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ბიო
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="input-field"
              placeholder="მოყვით სტუდენტებს თქვენი სწავლების სტილის, გამოცდილების და იმის შესახებ, რაც გახდის თქვენ უნიკალურს..."
            />
          </div>
        </div>
      </div>

      {/* Subjects & Specializations */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">საგნები და სპეციალიზაციები</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              საგნები (მძიმით გამოყოფილი)
            </label>
            <input
              type="text"
              value={formData.subjects.join(', ')}
              onChange={(e) => handleArrayInputChange('subjects', e.target.value)}
              className="input-field"
              placeholder="მაგ., მათემატიკა, ფიზიკა, კალკულუსი"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              სპეციალიზაციები (მძიმით გამოყოფილი)
            </label>
            <input
              type="text"
              value={formData.specializations.join(', ')}
              onChange={(e) => handleArrayInputChange('specializations', e.target.value)}
              className="input-field"
              placeholder="მაგ., AP კალკულუსი, ტესტების მზადება, უნივერსიტეტის მათემატიკა"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ენები (მძიმით გამოყოფილი)
            </label>
            <input
              type="text"
              value={formData.languages.join(', ')}
              onChange={(e) => handleArrayInputChange('languages', e.target.value)}
              className="input-field"
              placeholder="მაგ., ქართული, ინგლისური, რუსული"
            />
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">პირობები და განწყობები</h2>
        
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-yellow-900 mb-1">პირობების შესახებ</h3>
                <p className="text-sm text-yellow-800">
                  აქ შეგიძლიათ დაწეროთ თქვენი ფასები, გადახდის პრეფერენციები და გაუქმების პოლიტიკა. 
                  ეს ინფორმაცია ნახვადი იქნება სტუდენტებისთვის.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              თქვენი პირობები და განწყობები
            </label>
            <textarea
              name="termsAndConditions"
              value={formData.termsAndConditions}
              onChange={handleInputChange}
              rows={8}
              className="input-field"
              placeholder="მაგალითი:

ფასები:
- 1 საათი: 45₾
- 1.5 საათი: 65₾
- 2 საათი: 85₾

გადახდა:
- ნაღდი ფული გაკვეთილის დროს
- ბანკის გადარიცხვა

გაუქმების პოლიტიკა:
- 24 საათით ადრე გაუქმება უფასოა
- 24 საათში - 50% ფასი
- გაკვეთილის დროს - სრული ფასი

სხვა პირობები:
- მასალები ცალკე ფასად
- საშინაო დავალებების შემოწმება უფასოა"
            />
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">მიღწევები და სერტიფიკატები</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            მიღწევები (მძიმით გამოყოფილი)
          </label>
          <textarea
            value={formData.achievements.join(', ')}
            onChange={(e) => handleArrayInputChange('achievements', e.target.value)}
            rows={3}
            className="input-field"
            placeholder="მაგ., წლის საუკეთესო მასწავლებელი 2022, 15+ გამოქვეყნებული ნაშრომი, 10,000+ საათი სწავლებული"
          />
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="btn-secondary"
        >
          გაუქმება
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary flex items-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              შენახვა...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              ცვლილებების შენახვა
            </>
          )}
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                დაბრუნება დეშბორდზე
              </button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">ჩემი პროფილი</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {['overview', 'edit', 'cv', 'terms'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'overview' && 'გადახედვა'}
                {tab === 'edit' && 'რედაქტირება'}
                {tab === 'cv' && 'CV'}
                {tab === 'terms' && 'პირობები'}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'edit' && renderEditForm()}
          {activeTab === 'cv' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">CV მენეჯმენტი</h2>
              <p className="text-gray-600 mb-4">CV ატვირთვა და მენეჯმენტი ხელმისაწვდომია "რედაქტირება" ჩანართში.</p>
              <button
                onClick={() => setActiveTab('edit')}
                className="btn-primary"
              >
                CV-ის ატვირთვა
              </button>
            </div>
          )}
          {activeTab === 'terms' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">პირობები და განწყობები</h2>
              <p className="text-gray-600 mb-4">პირობების რედაქტირება ხელმისაწვდომია "რედაქტირება" ჩანართში.</p>
              <button
                onClick={() => setActiveTab('edit')}
                className="btn-primary"
              >
                პირობების რედაქტირება
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherMyProfilePage; 