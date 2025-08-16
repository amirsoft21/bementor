import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, DollarSign, Award } from 'lucide-react';

const TeacherCard = ({ teacher }) => {
  return (
    <div className="card hover-scale group">
      <div className="relative">
        <img
          src={teacher.avatar}
          alt={teacher.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        {teacher.isPremium && (
          <div className="absolute top-2 right-2 bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <Award className="w-3 h-3 mr-1" />
            პრემიუმი
          </div>
        )}
      </div>

      <div className="space-y-4">
        {/* Name and Rating Section */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors font-display mb-1">
              {teacher.name}
            </h3>
            <p className="text-sm text-gray-600">{teacher.education}</p>
          </div>
          <div className="text-right ml-4">
            <div className="flex items-center justify-end text-yellow-400 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(teacher.rating) ? 'fill-current' : ''}`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">
              {teacher.rating} ({teacher.reviewCount} შეფასება)
            </p>
          </div>
        </div>

        {/* Location and Experience - Same Level */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{teacher.location}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{teacher.experience} გამოცდილება</span>
          </div>
        </div>

        {/* Subjects Section */}
        <div className="flex flex-wrap gap-1">
          {teacher.subjects.slice(0, 3).map((subject, index) => (
            <span
              key={index}
              className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full"
            >
              {subject}
            </span>
          ))}
          {teacher.subjects.length > 3 && (
            <span className="text-gray-500 text-xs px-2 py-1">
              +{teacher.subjects.length - 3} მეტი
            </span>
          )}
        </div>

        {/* Price and Button Section */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center text-lg font-semibold text-gray-900">
            <DollarSign className="w-4 h-4 mr-1" />
            {teacher.hourlyRate}₾/საათი
          </div>
          <Link
            to={`/teacher/${teacher.id}`}
            className="btn-primary text-sm px-4 py-2 hover-lift"
          >
            პროფილის ნახვა
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard; 