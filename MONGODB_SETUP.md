# MongoDB Atlas Setup Guide

## Quick Setup (Recommended)

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" and create an account
3. Choose "Free" tier (M0)

### 2. Create Database Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider (AWS/Google Cloud/Azure)
4. Choose a region close to you
5. Click "Create"

### 3. Set Up Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Username: `bementor`
4. Password: Create a strong password (save it!)
5. Role: "Read and write to any database"
6. Click "Add User"

### 4. Set Up Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### 5. Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with `bementor`

### 6. Update Backend Config
1. Open `backend/config.env`
2. Replace the MONGODB_URI line with your connection string:
```
MONGODB_URI=mongodb+srv://bementor:yourpassword@cluster.mongodb.net/bementor
```

## Alternative: Local MongoDB

If you prefer to install MongoDB locally:

### Windows
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install with default settings
3. MongoDB will run on `mongodb://localhost:27017`

### macOS
```bash
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu)
```bash
sudo apt update
sudo apt install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

## Test Connection

After setting up, test your connection:

```bash
cd backend
npm run dev
```

You should see: "✅ MongoDB connected successfully"

## Troubleshooting

### Connection Failed
- Check if your IP is whitelisted in MongoDB Atlas
- Verify username and password are correct
- Make sure the connection string is properly formatted

### SSL Issues
- Add `?ssl=true` to your connection string
- Or use `?ssl=false` for local development

### Authentication Failed
- Double-check username and password
- Make sure the user has the correct permissions 