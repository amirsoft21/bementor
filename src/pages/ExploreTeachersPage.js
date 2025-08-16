import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, MapPin, DollarSign, Award, Info } from 'lucide-react';
import { mockTeachers, subjects, locations } from '../data/mockData';
import TeacherCard from '../components/teachers/TeacherCard';

const ExploreTeachersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter teachers based on search criteria
  const filteredTeachers = useMemo(() => {
    return mockTeachers.filter(teacher => {
      const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          teacher.subjects.some(subject => 
                            subject.toLowerCase().includes(searchTerm.toLowerCase())
                          ) ||
                          teacher.bio.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSubject = !selectedSubject || teacher.subjects.includes(selectedSubject);
      const matchesLocation = !selectedLocation || teacher.location === selectedLocation;
      
      const matchesPrice = !priceRange || (() => {
        const [min, max] = priceRange.split('-').map(Number);
        return teacher.hourlyRate >= min && teacher.hourlyRate <= max;
      })();

      const matchesRating = !ratingFilter || teacher.rating >= parseFloat(ratingFilter);

      return matchesSearch && matchesSubject && matchesLocation && matchesPrice && matchesRating;
    });
  }, [searchTerm, selectedSubject, selectedLocation, priceRange, ratingFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSubject('');
    setSelectedLocation('');
    setPriceRange('');
    setRatingFilter('');
  };

  const hasActiveFilters = searchTerm || selectedSubject || selectedLocation || priceRange || ratingFilter;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-display">
            იპოვეთ თქვენი იდეალური მასწავლებელი
          </h1>
          <p className="text-gray-600">
            აღმოაჩინეთ კვალიფიციური პედაგოგები, რომლებიც დაგეხმარებათ თქვენი სასწავლო მიზნების მიღწევაში
          </p>
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

        {/* Search and Filters */}
        <div className="card mb-8 shadow-medium">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="ძიება სახელით, საგნით ან საკვანძო სიტყვებით..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              ფილტრები
            </button>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                ყველა ფილტრის გასუფთავება
              </button>
            )}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              {/* Subject Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  საგანი
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="input-field"
                >
                  <option value="">ყველა საგანი</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  მდებარეობა
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="input-field"
                >
                  <option value="">ყველა მდებარეობა</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ფასის დიაპაზონი
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="input-field"
                >
                  <option value="">ნებისმიერი ფასი</option>
                  <option value="0-25">₾0 - ₾25/საათი</option>
                  <option value="25-50">₾25 - ₾50/საათი</option>
                  <option value="50-75">₾50 - ₾75/საათი</option>
                  <option value="75-100">₾75 - ₾100/საათი</option>
                  <option value="100-999">₾100+/საათი</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  მინიმალური შეფასება
                </label>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="input-field"
                >
                  <option value="">ნებისმიერი შეფასება</option>
                  <option value="4.5">4.5+ ვარსკვლავი</option>
                  <option value="4.0">4.0+ ვარსკვლავი</option>
                  <option value="3.5">3.5+ ვარსკვლავი</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            {filteredTeachers.length} მასწავლებელი ნაპოვნია
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>დალაგება:</span>
            <select className="border border-gray-300 rounded-md px-2 py-1 text-sm">
              <option>შესაბამისობა</option>
              <option>შეფასება</option>
              <option>ფასი: დაბლიდან მაღლა</option>
              <option>ფასი: მაღლიდან დაბლა</option>
            </select>
          </div>
        </div>

        {/* Teachers Grid */}
        {filteredTeachers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeachers.map(teacher => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              მასწავლებელი ვერ მოიძებნა
            </h3>
            <p className="text-gray-600 mb-4">
              სცადეთ თქვენი ძიების კრიტერიუმების ან ფილტრების შეცვლა
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary hover-lift"
            >
              ყველა ფილტრის გასუფთავება
            </button>
          </div>
        )}

        {/* Load More Button */}
        {filteredTeachers.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-secondary px-8 py-3 hover-lift">
              მეტი მასწავლებლის ნახვა
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreTeachersPage; 