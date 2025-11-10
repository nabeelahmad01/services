# 🚀 Quick Setup Guide - شروعات کی رہنمائی

## Step 1: Backend Setup (5 minutes)

### Install Dependencies
```bash
cd backend
npm install
```

### Configure Environment
Create `.env` file in `backend/` folder:
```
MONGODB_URI=mongodb://localhost:27017/service_marketplace
JWT_SECRET=my_super_secret_key_12345
PORT=5000
```

### Start MongoDB
```bash
# If you have MongoDB installed locally:
mongod

# Or use MongoDB Atlas (cloud):
# 1. Go to mongodb.com/cloud/atlas
# 2. Create free cluster
# 3. Get connection string
# 4. Update MONGODB_URI in .env
```

### Run Backend
```bash
npm start
# Should see: ✓ Server on port 5000
```

## Step 2: Frontend Setup (5 minutes)

### Install Dependencies
```bash
cd MechanicMarketplace
npm install
```

### Update API URL

**IMPORTANT**: Find your computer's IP address

**Windows:**
```bash
ipconfig
# Look for "IPv4 Address" under your WiFi/Ethernet
# Example: 192.168.1.100
```

**Mac/Linux:**
```bash
ifconfig
# Look for "inet" under en0 or wlan0
```

Update `constants/api.js`:
```javascript
const DEFAULT_API_URL = 'http://YOUR_IP:5000/api';
// Example: 'http://192.168.1.100:5000/api'
```

### Run App
```bash
npm start
# Scan QR code with Expo Go app on your phone
# Or press 'a' for Android emulator
```

## Step 3: Testing the App

### Create Test Accounts

**Customer Account:**
- Open app
- Click "Register"
- Select "Customer"
- Fill details
- Phone: 03001234567
- Password: test123

**Mechanic Account:**
- Register new account
- Select "Mechanic"
- Select categories (e.g., Car Mechanic, Plumber)
- Enter CNIC: 1234567890123
- Complete registration

### Test Flow

1. **Mechanic - Complete KYC:**
   - Go to Wallet tab
   - Click "Complete KYC"
   - Upload CNIC photo
   - Take selfie
   - Submit

2. **Admin - Approve KYC:**
   - Create admin user in MongoDB:
   ```javascript
   // In MongoDB Compass or Shell:
   db.users.insertOne({
     name: "Admin",
     phone: "03009999999",
     password: "$2a$10$...", // Use any existing password hash
     type: "admin"
   })
   ```
   - Login with admin account
   - Approve mechanic's KYC

3. **Customer - Post Request:**
   - Login as customer
   - Select service category
   - Describe problem
   - Enter location
   - Submit request

4. **Mechanic - Send Offer:**
   - Login as mechanic
   - View available jobs
   - Click on job
   - Enter price and time
   - Send offer

5. **Customer - Hire Mechanic:**
   - View received offers
   - Select best offer
   - Hire mechanic (1 diamond deducted)

6. **Test Other Features:**
   - Map tracking
   - Chat
   - Reviews
   - Buy diamonds

## Common Issues / عام مسائل

### Backend not connecting
```bash
# Check if MongoDB is running
# Check .env file exists
# Check port 5000 is not in use
```

### App not connecting to backend
```bash
# Check IP address is correct
# Make sure backend is running
# Make sure phone and computer are on same WiFi
```

### Can't scan QR code
```bash
# Use Expo Go app from Play Store
# Or run on emulator: npm run android
```

### Permission errors
```bash
# Grant camera permission in app settings
# Grant location permission in app settings
```

## Production Deployment / پروڈکشن ڈیپلائمنٹ

### Backend
- Deploy to Heroku, Railway, or DigitalOcean
- Use MongoDB Atlas for database
- Update API_BASE_URL in app

### Frontend
- Build APK: `expo build:android`
- Or use EAS: `eas build --platform android`
- Publish to Play Store

## Features Checklist / فیچرز چیک لسٹ

✅ User registration (Customer/Mechanic)  
✅ 8 service categories  
✅ KYC verification (CNIC + Selfie)  
✅ Admin approval panel  
✅ Diamond system (buy with JazzCash/Easypaisa)  
✅ Post service requests  
✅ Send/receive offers  
✅ Diamond deduction on hire  
✅ Real-time map tracking  
✅ Review system  
✅ Chat functionality  
✅ Leaderboard  
✅ Professional UI/UX  

## Need Help? / مدد چاہیے؟

All features are working and tested! If you encounter any issues:

1. Make sure backend is running (`npm start` in backend folder)
2. Check MongoDB connection
3. Verify IP address in constants/api.js
4. Ensure phone and computer on same WiFi
5. Check console logs for errors

---

**تمام فیچرز کام کر رہے ہیں! App استعمال کے لیے تیار ہے! 🎉**

**All features working! App is ready to use! 🚀**
