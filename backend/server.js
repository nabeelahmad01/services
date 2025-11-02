// ====== COMPLETE BACKEND CODE ======
// Copy تمام یہ code اپنے backend میں

// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✓ MongoDB Connected'))
.catch(err => console.log('✗ MongoDB Error:', err));

// ====== MODELS ======

// User Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: ['customer', 'mechanic'], required: true },
  categories: [String],
  cnic: String,
  kycVerified: { type: Boolean, default: false },
  rating: { type: Number, default: 4.5 },
  totalReviews: { type: Number, default: 0 },
  totalEarnings: { type: Number, default: 0 },
  diamonds: { type: Number, default: 0 },
  qualityScore: { type: Number, default: 90 },
  responseTime: { type: Number, default: 0 },
  completionRate: { type: Number, default: 100 },
  jobsCompleted: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const bcrypt = require('bcryptjs');
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

// ServiceRequest Model
const serviceRequestSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  latitude: Number,
  longitude: Number,
  status: { type: String, enum: ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'], default: 'pending' },
  offers: [{
    mechanicId: mongoose.Schema.Types.ObjectId,
    mechanicName: String,
    mechanicRating: Number,
    estimatedPrice: Number,
    estimatedTime: String,
    status: String,
    createdAt: { type: Date, default: Date.now }
  }],
  acceptedMechanic: mongoose.Schema.Types.ObjectId,
  completedAt: Date,
  createdAt: { type: Date, default: Date.now },
});

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);

// Review Model
const reviewSchema = new mongoose.Schema({
  mechanicId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  photos: [String],
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model('Review', reviewSchema);

// Transaction Model
const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['purchase', 'earning', 'deduction'] },
  diamonds: Number,
  amount: Number,
  paymentMethod: String,
  phoneNumber: String,
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Chat Model
const chatSchema = new mongoose.Schema({
  participantOne: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participantTwo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [{
    senderId: mongoose.Schema.Types.ObjectId,
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  lastMessage: String,
  lastMessageTime: Date,
  createdAt: { type: Date, default: Date.now },
});

const Chat = mongoose.model('Chat', chatSchema);

// Quality Score Model
const qualityScoreSchema = new mongoose.Schema({
  mechanicId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  responseTime: Number,
  completionRate: Number,
  quality: Number,
  professionalism: Number,
  updatedAt: { type: Date, default: Date.now },
});

const QualityScore = mongoose.model('QualityScore', qualityScoreSchema);

// ====== ROUTES ======

// Auth Routes
const authRouter = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

authRouter.post('/register', async (req, res) => {
  try {
    const { name, phone, password, type, categories, cnic } = req.body;
    let user = await User.findOne({ phone });
    if (user) return res.status(400).json({ message: 'User already exists' });
    
    if (type === 'mechanic' && !cnic) {
      return res.status(400).json({ message: 'KYC required for mechanics' });
    }
    
    user = new User({
      name, phone, password, type,
      categories: type === 'mechanic' ? categories : [],
      cnic: type === 'mechanic' ? cnic : null,
      kycVerified: type === 'mechanic' ? true : false,
    });
    
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ message: 'Registered', token, user: { id: user._id, name, type } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ message: 'Login successful', token, user: { id: user._id, name: user.name, type: user.type } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Service Routes
const serviceRouter = express.Router();

serviceRouter.post('/create', async (req, res) => {
  try {
    const { category, description, location, latitude, longitude } = req.body;
    const userId = req.headers['user-id'];
    
    const request = new ServiceRequest({
      customerId: userId, category, description, location, latitude, longitude
    });
    
    await request.save();
    res.status(201).json({ message: 'Request created', request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

serviceRouter.get('/available', async (req, res) => {
  try {
    const { category } = req.query;
    const requests = await ServiceRequest.find({
      status: 'pending',
      ...(category && { category })
    }).populate('customerId', 'name phone location').sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mechanics Routes
const mechanicRouter = express.Router();

mechanicRouter.get('/by-category', async (req, res) => {
  try {
    const { category } = req.query;
    const mechanics = await User.find({
      type: 'mechanic',
      categories: category,
      kycVerified: true
    }).select('name rating totalReviews categories qualityScore jobsCompleted').sort({ rating: -1 });
    res.json(mechanics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

mechanicRouter.get('/leaderboard', async (req, res) => {
  try {
    const mechanics = await User.find({ type: 'mechanic', kycVerified: true })
      .select('name rating totalReviews qualityScore jobsCompleted')
      .sort({ rating: -1, qualityScore: -1 })
      .limit(20);
    res.json(mechanics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Review Routes
const reviewRouter = express.Router();

reviewRouter.post('/submit', async (req, res) => {
  try {
    const { mechanicId, rating, comment, photos } = req.body;
    const customerId = req.headers['user-id'];
    
    const lastReview = await Review.findOne({ mechanicId, customerId }).sort({ createdAt: -1 });
    if (lastReview) {
      const daysDiff = (new Date() - lastReview.createdAt) / (1000 * 60 * 60 * 24);
      if (daysDiff < 15) {
        return res.status(400).json({
          message: `15 دن بعد ریویو دے سکیں۔ ${Math.ceil(15 - daysDiff)} دن باقی`
        });
      }
    }
    
    const review = new Review({ mechanicId, customerId, rating, comment, photos });
    await review.save();
    
    const allReviews = await Review.find({ mechanicId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    
    await User.findByIdAndUpdate(mechanicId, {
      rating: avgRating.toFixed(1),
      totalReviews: allReviews.length
    });
    
    res.status(201).json({ message: 'Review submitted', review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

reviewRouter.get('/:mechanicId', async (req, res) => {
  try {
    const reviews = await Review.find({ mechanicId: req.params.mechanicId })
      .populate('customerId', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Wallet Routes
const walletRouter = express.Router();

walletRouter.post('/buy-diamonds', async (req, res) => {
  try {
    const { packageName, paymentMethod, phoneNumber } = req.body;
    const userId = req.headers['user-id'];
    
    const prices = {
      small: { diamonds: 100, price: 500 },
      medium: { diamonds: 250, price: 1000 },
      large: { diamonds: 500, price: 2000 },
      premium: { diamonds: 1000, price: 3500 }
    };
    
    const pkg = prices[packageName];
    if (!pkg) return res.status(400).json({ message: 'Invalid package' });
    
    const transaction = new Transaction({
      userId, type: 'purchase', diamonds: pkg.diamonds, amount: pkg.price,
      paymentMethod, phoneNumber, status: 'completed'
    });
    
    await transaction.save();
    const user = await User.findByIdAndUpdate(userId, { $inc: { diamonds: pkg.diamonds } }, { new: true });
    
    res.json({ message: 'Diamonds purchased', diamonds: user.diamonds });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Chat Routes
const chatRouter = express.Router();

chatRouter.post('/send', async (req, res) => {
  try {
    const { recipientId, message } = req.body;
    const senderId = req.headers['user-id'];
    
    let chat = await Chat.findOne({
      $or: [
        { participantOne: senderId, participantTwo: recipientId },
        { participantOne: recipientId, participantTwo: senderId }
      ]
    });
    
    if (!chat) {
      chat = new Chat({ participantOne: senderId, participantTwo: recipientId, messages: [] });
    }
    
    chat.messages.push({ senderId, text: message });
    chat.lastMessage = message;
    chat.lastMessageTime = new Date();
    await chat.save();
    
    res.json({ message: 'Message sent', chat });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register Routes
app.use('/api/auth', authRouter);
app.use('/api/services', serviceRouter);
app.use('/api/mechanics', mechanicRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/wallet', walletRouter);
app.use('/api/chat', chatRouter);

// Health Check
app.get('/api/health', (req, res) => res.json({ status: 'Server running ✓' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✓ Server on port ${PORT}`));