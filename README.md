# 🔧 Service Marketplace - Complete Professional App

## Overview / خلاصہ

A complete professional service marketplace application built with React Native (Expo) and Node.js backend. This app connects customers with service professionals (mechanics, electricians, plumbers, etc.) in Pakistan.

یہ ایک مکمل پروفیشنل سروس مارکیٹ پلیس ایپلی کیشن ہے جو React Native (Expo) اور Node.js بیک اینڈ کے ساتھ بنائی گئی ہے۔

## ✨ Complete Features / مکمل خصوصیات

### For Customers / صارفین کے لیے
- ✅ **8+ Service Categories** - Bike Mechanic, Car Mechanic, Plumber, Electrician, AC & Fridge, General Mart, Carpenter, Painter
- ✅ **Post Service Requests** - Describe your problem and location
- ✅ **Receive Multiple Offers** - Get offers from verified mechanics
- ✅ **Real-time Map Tracking** - Track mechanic location live with category icons
- ✅ **Review System** - Rate and review mechanics (15-day limit per mechanic)
- ✅ **Chat System** - Direct messaging with mechanics
- ✅ **Leaderboard** - View top-rated mechanics

### For Mechanics / مکینکس کے لیے
- ✅ **Complete KYC System** - CNIC upload + Live selfie verification
- ✅ **Admin Approval** - KYC must be approved before accepting jobs
- ✅ **Diamond System** - 10 free diamonds on signup, buy more with JazzCash/Easypaisa
- ✅ **Send Offers** - Bid on jobs with price and time estimates
- ✅ **Diamond Deduction** - 1 diamond deducted when customer hires you
- ✅ **Job Management** - View available jobs filtered by categories
- ✅ **Analytics Dashboard** - Track earnings, ratings, and performance
- ✅ **Multiple Categories** - Register for multiple service categories

### Payment Integration / پیمنٹ
- 💎 **Diamond Packages**:
  - Small: 100 💎 = Rs. 500
  - Medium: 250 💎 = Rs. 1,000
  - Large: 500 💎 = Rs. 2,000
  - Premium: 1000 💎 = Rs. 3,500
- 📱 JazzCash Integration
- 📲 Easypaisa Integration

### Admin Panel / ایڈمن پینل
- ✅ **KYC Verification** - Approve/Reject mechanic documents
- ✅ **View CNIC Images** - Review uploaded ID cards
- ✅ **View Selfies** - Verify mechanic identity
- ✅ **Bulk Management** - Handle multiple KYC requests

## 🚀 Installation / تنصیب

### Prerequisites / ضروریات
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Expo CLI
- Android Studio / Xcode (for emulator)

### Backend Setup / بیک اینڈ سیٹ اپ

```bash
cd backend

# Install dependencies
npm install

# Create .env file
# Add your MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/service_marketplace
JWT_SECRET=your_secret_key_here
PORT=5000

# Start backend server
node server.js
```

### Frontend Setup / فرنٹ اینڈ سیٹ اپ

```bash
cd MechanicMarketplace

# Install all dependencies
npm install

# Update API URL in constants/api.js
# Replace with your computer's IP address
# Find IP: ipconfig (Windows) or ifconfig (Mac/Linux)

# Start Expo development server
npm start

# Or run on specific platform
npm run android  # For Android
npm run ios      # For iOS
```

## 📱 How to Use / استعمال کی رہنمائی

### Customer Flow / کسٹمر کا طریقہ کار

1. **Register** as Customer
2. **Select Service Category** (Car Mechanic, Plumber, etc.)
3. **Post Request** with description and location
4. **Wait for Offers** from verified mechanics
5. **View Offers** with price, time, mechanic rating
6. **Hire Mechanic** - 1 diamond deducted from mechanic
7. **Track Location** on map with live updates
8. **Chat** with mechanic
9. **Complete Job** and submit review

### Mechanic Flow / مکینک کا طریقہ کار

1. **Register** as Mechanic
2. **Select Categories** you specialize in
3. **Complete KYC**:
   - Upload CNIC photo
   - Take live selfie
   - Wait for admin approval
4. **Buy Diamonds** (10 free on signup)
   - Select package
   - Choose payment method (JazzCash/Easypaisa)
   - Enter phone number
5. **View Available Jobs** in your categories
6. **Send Offer** with:
   - Your price quote
   - Estimated completion time
   - Optional message
7. **Wait for Customer** to hire you
8. **Complete Job** - 1 diamond deducted upon hire
9. **Build Rating** through good reviews

### Admin Flow / ایڈمن کا طریقہ کار

1. **Login** as admin (create admin account in DB)
2. **View Pending KYC Requests**
3. **Click on Request** to view details
4. **Review Documents**:
   - CNIC image
   - Selfie image
   - User information
5. **Approve or Reject**
6. **Mechanic Gets Notified** of KYC status

## 🗂️ Project Structure / پروجیکٹ کی ساخت

```
market_services/
├── backend/
│   ├── server.js           # Main backend with all APIs
│   ├── package.json        # Backend dependencies
│   └── .env               # Environment variables
│
└── MechanicMarketplace/
    ├── App.js              # Main navigation
    ├── screens/
    │   ├── CustomerHomeScreen.js       # Service categories
    │   ├── ServiceCategoryScreen.js    # Post request
    │   ├── OffersScreen.js             # View offers
    │   ├── MapTrackingScreen.js        # Live tracking
    │   ├── ReviewSubmitScreen.js       # Submit reviews
    │   ├── MechanicHomeScreen.js       # Available jobs
    │   ├── SendOfferScreen.js          # Send offer
    │   ├── KYCVerificationScreen.js    # KYC upload
    │   ├── WalletScreen.js             # Buy diamonds
    │   ├── AdminKYCScreen.js           # Admin approval
    │   └── ... (other screens)
    ├── constants/
    │   └── api.js          # API configuration
    └── package.json        # Frontend dependencies
```

## 🔌 API Endpoints / API اینڈ پوائنٹس

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login

### Services
- POST `/api/services/create` - Create service request
- GET `/api/services/available` - Get available requests

### KYC
- POST `/api/kyc/upload` - Upload KYC documents
- GET `/api/kyc/status` - Check KYC status

### Admin
- GET `/api/admin/kyc-requests` - Get pending KYC
- POST `/api/admin/kyc-approve` - Approve/Reject KYC

### Offers
- POST `/api/offers/send` - Send offer to request
- POST `/api/offers/accept` - Accept offer (deducts diamond)
- GET `/api/offers/received/:requestId` - Get offers for request
- GET `/api/offers/my-offers` - Get mechanic's offers

### Wallet
- POST `/api/wallet/buy-diamonds` - Purchase diamonds

### Reviews
- POST `/api/reviews/submit` - Submit review
- GET `/api/reviews/:mechanicId` - Get mechanic reviews

### Location
- POST `/api/location/update` - Update location
- GET `/api/location/mechanic/:id` - Get mechanic location

## 💎 Diamond System / ڈائمنڈ سسٹم

### How It Works / کیسے کام کرتا ہے

1. **Signup Bonus** - 10 free diamonds for new mechanics
2. **Purchase** - Buy more with JazzCash/Easypaisa
3. **Deduction** - 1 diamond deducted when customer hires you
4. **Purpose** - Ensures quality offers, prevents spam

### Why Diamonds? / ڈائمنڈز کیوں؟

- Prevents mechanics from sending spam offers
- Ensures serious, quality proposals
- Sustainable business model
- Fair pricing for both parties

## 🎨 UI/UX Features / یوزر انٹرفیس

- ✅ Modern, clean design
- ✅ Smooth animations
- ✅ Professional color scheme (#007AFF blue, #4CAF50 green)
- ✅ Responsive layouts
- ✅ Category icons for easy recognition
- ✅ Real-time updates
- ✅ Loading states and error handling
- ✅ Empty states with helpful messages

## 🔐 Security Features / سیکیورٹی

- ✅ Password hashing with bcrypt
- ✅ JWT authentication
- ✅ KYC verification (CNIC + Selfie)
- ✅ Admin approval required
- ✅ 15-day review limit per mechanic
- ✅ Secure image upload (base64)

## 📊 Database Schema / ڈیٹا بیس

### User Model
```javascript
{
  name, phone, password, type (customer/mechanic/admin),
  categories[], cnic, cnicImage, selfieImage,
  kycStatus (pending/approved/rejected), kycVerified,
  rating, totalReviews, diamonds, qualityScore,
  jobsCompleted, location {lat, lng}, isOnline
}
```

### ServiceRequest Model
```javascript
{
  customerId, category, description, location,
  latitude, longitude, status,
  offers: [{
    mechanicId, mechanicName, mechanicRating,
    estimatedPrice, estimatedTime, message, status
  }],
  acceptedMechanic, finalPrice, completedAt
}
```

## 🚀 Next Steps / اگلے قدم

### Pending Features (Optional)
- 🔔 Push Notifications
- 📞 Voice/Video Calling
- 💬 Advanced Chat (images, voice messages)
- 📈 Advanced Analytics
- 🌙 Dark Mode
- 🌍 Multi-language Support (Full Urdu)

## 🐛 Testing / ٹیسٹنگ

```bash
# Backend
cd backend
node server.js
# Should show: ✓ Server on port 5000

# Frontend
cd MechanicMarketplace
npm start
# Scan QR with Expo Go app
```

## 📝 Notes / نوٹس

1. **IP Address** - Update `constants/api.js` with your computer's IP
2. **MongoDB** - Make sure MongoDB is running
3. **Permissions** - Grant camera, location permissions in app
4. **Testing** - Test with 2 devices (1 customer, 1 mechanic)
5. **Admin** - Create admin user directly in MongoDB

## 🤝 Support / مدد

If you face any issues:
1. Check MongoDB connection
2. Verify IP address in api.js
3. Ensure all dependencies installed
4. Check backend console for errors
5. Clear Expo cache: `expo start -c`

## 📜 License

This is a complete professional app ready for deployment!

---

**Created with ❤️ for Pakistan's Service Industry**

تمام فیچرز مکمل ہیں اور کام کر رہے ہیں! 🎉
