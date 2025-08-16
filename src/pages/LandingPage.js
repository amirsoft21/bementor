import React from 'react';
import { Link } from 'react-router-dom';
import { Users, MessageCircle, Shield, Star, ArrowRight, Search, Link as LinkIcon } from 'lucide-react';
import { mockTeachers, testimonials } from '../data/mockData';
import TeacherCard from '../components/teachers/TeacherCard';

const LandingPage = () => {
  const featuredTeachers = mockTeachers.filter(teacher => teacher.featured);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary-800 to-primary-900">
          {/* Subtle wave pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,300 Q300,200 600,300 T1200,300 L1200,600 L0,600 Z" fill="url(#wave1)"/>
              <path d="M0,350 Q300,250 600,350 T1200,350 L1200,600 L0,600 Z" fill="url(#wave2)"/>
              <defs>
                <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.1)"/>
                  <stop offset="50%" stopColor="rgba(255,255,255,0.05)"/>
                  <stop offset="100%" stopColor="rgba(255,255,255,0.1)"/>
                </linearGradient>
                <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(99,102,241,0.1)"/>
                  <stop offset="50%" stopColor="rgba(99,102,241,0.05)"/>
                  <stop offset="100%" stopColor="rgba(99,102,241,0.1)"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Minimal dots pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute top-40 right-40 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-white rounded-full"></div>
            <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-white rounded-full"></div>
          </div>
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display leading-tight">
                <span className="block mb-2">იპოვეთ თქვენი იდეალური</span>
                <span className="block text-accent-300">მასწავლებელი დღეს</span>
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-gray-200 max-w-3xl mx-auto">
                BEMENTOR - სწავლებისა და სწავლების ყველაზე სანდო პლატფორმა საქართველოში
              </p>
              <p className="text-lg mb-8 text-gray-300 max-w-2xl mx-auto">
                ჩვენ ვაკავშირებთ სტუდენტებსა და მასწავლებლებს, ვქმნით გამჭვირვალე და ეფექტურ საგანმანათლებლო ეკოსისტემას
              </p>
              <p className="text-lg mb-8 text-gray-300 max-w-2xl mx-auto">
                სრულიად უფასო პლატფორმა მასწავლებლებისა და სტუდენტების დასაკავშირებლად
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/explore" className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-lg px-8 py-4 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 hover:scale-105 shadow-lg">
                  მასწავლებლის პოვნა
                </Link>
                <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-105 shadow-lg">
                  გახდი მასწავლებელი
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 group">
              <div className="text-4xl font-bold text-white mb-3">500+</div>
              <div className="text-white font-medium">შემოწმებული მასწავლებელი</div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 group">
              <div className="text-4xl font-bold text-white mb-3">10,000+</div>
              <div className="text-white font-medium">დაკავშირებული სტუდენტი</div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 group">
              <div className="text-4xl font-bold text-white mb-3">50+</div>
              <div className="text-white font-medium">საგანი</div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 group">
              <div className="text-4xl font-bold text-white mb-3">4.8★</div>
              <div className="text-white font-medium">საშუალო შეფასება</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
              რატომ აირჩიოთ BEMENTOR?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ჩვენ ვქმნით ყველაზე სანდო და გამჭვირვალე პლატფორმას მასწავლებლებისა და სტუდენტების დასაკავშირებლად
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">შემოწმებული მასწავლებლები</h3>
              <p className="text-gray-600 leading-relaxed">
                ყველა მასწავლებელი ჩვენს პლატფორმაზე გადის ფრთხილ შემოწმებას. ჩვენ ვამოწმებთ მათ კვალიფიკაციას, გამოცდილებას და რეკომენდაციებს.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">მარტივი ძიება</h3>
              <p className="text-gray-600 leading-relaxed">
                იპოვეთ თქვენთვის იდეალური მასწავლებელი საგნის, მდებარეობის, ფასისა და შეფასების მიხედვით. ჩვენი ფილტრები დაგეხმარებათ სწრაფად პოვნაში.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <LinkIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">პირდაპირი კავშირი</h3>
              <p className="text-gray-600 leading-relaxed">
                დაუკავშირდით მასწავლებელს პირდაპირ ჩვენი პლატფორმის მეშვეობით. შემდეგ განსაზღვრეთ გაკვეთილების დრო და ფორმატი თქვენს შორის.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
              როგორ მუშაობს BEMENTOR?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              მარტივი 3 ნაბიჯი იდეალური მასწავლებლის პოვნისთვის
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">მოძებნეთ მასწავლებელი</h3>
              <p className="text-gray-600">
                გამოიყენეთ ჩვენი ფილტრები საგნის, მდებარეობის, ფასისა და შეფასების მიხედვით
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">დაუკავშირდით</h3>
              <p className="text-gray-600">
                გაეცანით მასწავლებლის პროფილს, შეფასებებს და დაუკავშირდით პირდაპირ
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">დაწყეთ სწავლება</h3>
              <p className="text-gray-600">
                შეთანხმდით გაკვეთილების დროსა და ფორმატზე და დაიწყეთ სწავლება
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Teachers Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
                რეკომენდირებული მასწავლებლები
              </h2>
              <p className="text-xl text-gray-600">
                ჩვენი საუკეთესო მასწავლებლები, რომლებიც დაგეხმარებათ თქვენი მიზნების მიღწევაში
              </p>
            </div>
            <Link to="/explore" className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2">
              ყველას ნახვა
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
              რას ამბობენ ჩვენი მომხმარებლები
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              მიიღეთ შთაგონება ჩვენი წარმატებული სტუდენტებისა და მასწავლებლების ისტორიებიდან
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-primary-900 to-primary-800 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-white/20 transform rotate-45"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
            მზად ხართ დასაწყებად?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            შეუერთდით ათასობით სტუდენტსა და მასწავლებელს, რომლებიც უკვე იყენებენ BEMENTOR-ს
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="bg-gradient-to-r from-amber-600 to-amber-700 text-white text-lg px-8 py-4 rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 hover:scale-105 shadow-lg">
              დაწყება უფასოდ
            </Link>
            <Link to="/explore" className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white text-lg px-8 py-4 rounded-lg hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 hover:scale-105 shadow-lg">
              მასწავლებლების ნახვა
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 