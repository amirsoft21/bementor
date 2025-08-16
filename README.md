# BeMentor - Real Mentoring Platform

BeMentor is a full-stack mentoring platform that connects students with qualified teachers. The platform features real user authentication, teacher profiles, booking system, and more.

## 🚀 Features

### Frontend (React)
- **Modern UI/UX** with Tailwind CSS and beautiful animations
- **Georgian Language** - Fully localized interface
- **Responsive Design** - Works on all devices
- **Real Authentication** - JWT-based login/signup
- **Teacher Discovery** - Search and filter teachers
- **Premium Subscriptions** - Multiple pricing tiers
- **Real-time Chat** - Socket.IO integration (coming soon)

### Backend (Node.js/Express)
- **RESTful API** with Express.js
- **MongoDB Database** with Mongoose ODM
- **JWT Authentication** with bcrypt password hashing
- **Role-based Access Control** (Student/Teacher/Admin)
- **Input Validation** with express-validator
- **Security Features** - Helmet, CORS, Rate limiting
- **File Upload** support with Cloudinary
- **Email Integration** with Nodemailer

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd testbementor
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp config.env.example config.env
# Edit config.env with your actual values
```

#### Environment Variables (config.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/bementor
# For production: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bementor

# JWT Secret (generate a strong secret)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Email Configuration (optional for now)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### 3. Frontend Setup

```bash
# Navigate back to root and then to frontend
cd ..
cd frontend

# Install dependencies
npm install

# Create environment file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

### 4. Database Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB locally
# Start MongoDB service
mongod
```

#### Option B: MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `backend/config.env`

### 5. Start the Application

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

## 🗄️ Database Models

### User Model
- Authentication fields (email, password)
- Profile information (name, avatar, bio)
- Role-based access (student/teacher/admin)
- Premium subscription status

### Teacher Model
- Teaching subjects and specializations
- Education and experience
- Hourly rates and availability
- Ratings and reviews
- Verification status

## 🔐 Authentication

The platform uses JWT (JSON Web Tokens) for authentication:

1. **Registration**: Users can sign up as students or teachers
2. **Login**: Email/password authentication with role verification
3. **Token Storage**: JWT tokens stored in localStorage
4. **Protected Routes**: API endpoints require valid JWT tokens

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Teachers
- `GET /api/teachers` - Get all teachers (with filters)
- `GET /api/teachers/:id` - Get single teacher
- `POST /api/teachers` - Create teacher profile
- `PUT /api/teachers/:id` - Update teacher profile

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Bookings (Coming Soon)
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings

### Messages (Coming Soon)
- `GET /api/messages/conversations` - Get conversations
- `POST /api/messages` - Send message

### Payments (Coming Soon)
- `POST /api/payments/subscribe` - Create subscription
- `GET /api/payments/subscriptions` - Get subscriptions

## 🎨 Frontend Features

### Styling
- **Tailwind CSS** for utility-first styling
- **Custom Animations** with hover effects and transitions
- **Indigo Color Scheme** with modern gradients
- **Poppins & Inter Fonts** for typography

### Components
- **Responsive Navigation** with user menu
- **Teacher Cards** with hover animations
- **Search & Filter** functionality
- **Pricing Plans** with subscription options
- **Form Validation** with error handling

### Teacher Profile Management
- **Dedicated "My Profile" Page** for teachers to manage their professional information
- **CV/Resume Upload** with file validation and progress tracking
- **Terms & Conditions Editor** for pricing and policies
- **Professional Information Management** including subjects, specializations, and achievements
- **Profile Preview** with real-time updates
- **Multi-tab Interface** for organized content management

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Start with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm start    # Start React development server
```

### Database Management
```bash
# Access MongoDB shell
mongosh

# Use database
use bementor

# View collections
show collections
```

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create Heroku app
heroku create your-bementor-app

# Add MongoDB addon
heroku addons:create mongolab

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)
```bash
# Build the app
npm run build

# Deploy to Vercel
vercel

# Or deploy to Netlify
netlify deploy
```

## 🔒 Security Features

- **Password Hashing** with bcrypt
- **JWT Token Validation**
- **Input Sanitization** with express-validator
- **CORS Protection**
- **Rate Limiting**
- **Helmet Security Headers**
- **SQL Injection Prevention** (MongoDB)

## 📞 Support

For support or questions:
- Create an issue in the repository
- Contact the development team

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**BeMentor** - Connecting students with amazing teachers! 🎓✨ 