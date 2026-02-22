const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { initGridFS } = require('./config/gridfs');
const { initSocket } = require('./config/socket');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Initialize express
const app = express();
const server = http.createServer(app);

// Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Init socket handlers
initSocket(io);

// Body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: 'Too many requests, try again later' },
});
app.use('/api/', limiter);

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Passport
const passport = require('./config/passport');
app.use(passport.initialize());

// API Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/courses', require('./routes/api/courses'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/ai', require('./routes/api/ai'));
app.use('/api/dashboard', require('./routes/api/dashboard'));
app.use('/api/gamification', require('./routes/api/gamification'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Acadrix API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// Error handler
app.use(errorHandler);

// Connect to DB and start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const conn = await connectDB();

    // Initialize GridFS
    initGridFS(conn.connection);

    server.listen(PORT, () => {
      console.log(`
╔══════════════════════════════════════════╗
║                                          ║
║     🎓 ACADRIX SERVER RUNNING           ║
║     📡 Port: ${PORT}                       ║
║     🌍 Env: ${process.env.NODE_ENV || 'development'}              ║
║     ✅ MongoDB Connected                 ║
║     🔌 Socket.io Ready                   ║
║     📁 GridFS Initialized                ║
║                                          ║
╚══════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});

module.exports = { app, server, io };
