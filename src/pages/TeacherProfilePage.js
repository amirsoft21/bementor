import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import { mockTeachers } from '../data/mockData';
import { 
  Star, 
  MapPin, 
  Clock, 
  DollarSign, 
  Award, 
  MessageCircle, 
  Calendar,
  BookOpen,
  Globe,
  Phone,
  Mail,
  ArrowLeft,
  Check,
  Users,
  Info
} from 'lucide-react';
import toast from 'react-hot-toast';

const TeacherProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { createConversation } = useChat();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Find teacher by ID
  const teacher = mockTeachers.find(t => t.id === parseInt(id));

  if (!teacher) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">მასწავლებელი ვერ მოიძებნა</h2>
          <p className="text-gray-600 mb-4">მასწავლებელი, რომელსაც ეძებთ, არ არსებობს.</p>
          <button onClick={() => navigate('/explore')} className="btn-primary">
            მასწავლებლების ნახვა
          </button>
        </div>
      </div>
    );
  }

  const handleContact = () => {
    if (!currentUser) {
      toast.error('გთხოვთ შეხვიდეთ სისტემაში მასწავლებელთან დასაკავშირებლად');
      navigate('/login');
      return;
    }

    if (currentUser.role === 'teacher') {
      toast.error('მასწავლებლებს არ შეუძლიათ სხვა მასწავლებლებთან დაკავშირება');
      return;
    }

    // Create conversation and navigate to chat
    const conversationId = createConversation(
      teacher.id,
      teacher.name,
      teacher.avatar
    );
    
    navigate('/chat');
    toast.success(`დაიწყეთ საუბარი ${teacher.name}-თან`);
  };

  const handleBookLesson = () => {
    if (!currentUser) {
      toast.error('გთხოვთ შეხვიდეთ სისტემაში გაკვეთილის დაჯავშნისთვის');
      navigate('/login');
      return;
    }

    if (currentUser.role === 'teacher') {
      toast.error('მასწავლებლებს არ შეუძლიათ გაკვეთილების დაჯავშნა');
      return;
    }

    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/explore')}
          className="flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          მასწავლებლების ნახვა
        </button>

        {/* Teacher Header */}
        <div className="card mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Teacher Image */}
            <div className="lg:w-1/3">
              <div className="relative">
                <img
                  src={teacher.avatar}
                  alt={teacher.name}
                  className="w-full h-80 lg:h-96 object-cover rounded-lg"
                />
                {teacher.isPremium && (
                  <div className="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    პრემიუმი
                  </div>
                )}
              </div>
            </div>

            {/* Teacher Info */}
            <div className="lg:w-2/3">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{teacher.name}</h1>
                  <p className="text-lg text-gray-600 mb-3">{teacher.education}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-yellow-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(teacher.rating) ? 'fill-current' : ''}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    {teacher.rating} ({teacher.reviewCount} შეფასება)
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {teacher.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {teacher.experience} გამოცდილება
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  {teacher.hourlyRate}₾/საათი
                </div>
                <div className="flex items-center text-gray-600">
                  <Globe className="w-4 h-4 mr-2" />
                  {teacher.languages.join(', ')}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleContact}
                  className="btn-primary flex items-center justify-center"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  შეტყობინება
                </button>
                <button
                  onClick={handleBookLesson}
                  className="btn-accent flex items-center justify-center"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  გაკვეთილის დაჯავშნა
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Info Notice */}
        <div className="card mb-8 bg-blue-50 border-blue-200">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">BEMENTOR პლატფორმის შესახებ</h3>
              <p className="text-blue-800 text-sm">
                BEMENTOR არის მასწავლებლების აღმოჩენისა და დაკავშირების პლატფორმა. ჩვენ ვაკავშირებთ სტუდენტებსა და მასწავლებლებს, 
                მაგრამ ფაქტობრივი გაკვეთილები (ონლაინ ან ოფლაინ) მოწყობილია პირდაპირ სტუდენტს/მშობელსა და მასწავლებელს შორის, 
                ჩვენი პლატფორმის გარეთ.
              </p>
            </div>
          </div>
        </div>

        {/* Teacher Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">შესახებ</h2>
              <p className="text-gray-600 leading-relaxed">{teacher.bio}</p>
            </div>

            {/* Subjects */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">საგნები და სპეციალიზაციები</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">სწავლებული საგნები</h3>
                  <div className="flex flex-wrap gap-2">
                    {teacher.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">სპეციალიზაციები</h3>
                  <div className="flex flex-wrap gap-2">
                    {teacher.specializations.map((spec, index) => (
                      <span
                        key={index}
                        className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">მიღწევები და გამოცდილება</h2>
              <ul className="space-y-2">
                {teacher.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Availability */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-3">ხელმისაწვდომობა</h3>
              <div className="space-y-2">
                {teacher.availability.map((day, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-3">საკონტაქტო ინფორმაცია</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">ხელმისაწვდომია პლატფორმის მეშვეობით</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">ხელმისაწვდომია პლატფორმის მეშვეობით</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-3">სწრაფი სტატისტიკა</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">პასუხის მაჩვენებელი</span>
                  <span className="font-medium">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">პასუხის დრო</span>
                  <span className="font-medium">2 საათი</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">სწავლებული სტუდენტები</span>
                  <span className="font-medium">500+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">გაკვეთილის დაჯავშნა</h3>
            <p className="text-gray-600 mb-4">
              გაკვეთილის დაჯავშნის ფუნქცია მოგვიანებით დაემატება. ამ დროისთვის, გთხოვთ დაუკავშირდეთ მასწავლებელს პირდაპირ შეტყობინების მეშვეობით.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="btn-secondary flex-1"
              >
                გაუქმება
              </button>
              <button
                onClick={() => {
                  setIsBookingModalOpen(false);
                  handleContact();
                }}
                className="btn-primary flex-1"
              >
                დაუკავშირდი
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherProfilePage; 