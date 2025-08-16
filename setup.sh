#!/bin/bash

echo "🚀 BeMentor Setup Script"
echo "========================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Create backend directory if it doesn't exist
if [ ! -d "backend" ]; then
    echo "📁 Creating backend directory..."
    mkdir backend
fi

# Navigate to backend and install dependencies
echo "📦 Installing backend dependencies..."
cd backend

# Create package.json if it doesn't exist
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found in backend directory. Please ensure the backend files are properly set up."
    exit 1
fi

npm install

# Create config.env if it doesn't exist
if [ ! -f "config.env" ]; then
    echo "📝 Creating config.env file..."
    cat > config.env << EOF
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/bementor

# JWT Secret (CHANGE THIS IN PRODUCTION!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Email Configuration (optional for now)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
EOF
    echo "✅ config.env created. Please edit it with your actual values."
fi

cd ..

# Navigate to frontend and install dependencies
echo "📦 Installing frontend dependencies..."
cd frontend

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
    echo "✅ .env created."
fi

npm install

cd ..

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Edit backend/config.env with your MongoDB connection string"
echo "2. Start MongoDB (local or Atlas)"
echo "3. Start the backend: cd backend && npm run dev"
echo "4. Start the frontend: cd frontend && npm start"
echo ""
echo "🌐 The application will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000/api"
echo ""
echo "📚 For detailed instructions, see README.md" 