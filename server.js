const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const db = require('./utils/db');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fs = require('fs');

// Session configuration
app.use(session({
  secret: 'neurafrik-secret-key-2024',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Admin Authentication Middleware
const isAdmin = (req, res, next) => {
  if (req.session.admin) {
    next();
  } else {
    res.redirect('/admin/login');
  }
};

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Load translations
const locales = {
  en: JSON.parse(fs.readFileSync(path.join(__dirname, 'locales', 'en.json'), 'utf8')),
  fr: JSON.parse(fs.readFileSync(path.join(__dirname, 'locales', 'fr.json'), 'utf8'))
};

// Middleware for i18n
app.use((req, res, next) => {
  const lang = req.query.lang || 'en';
  res.locals.lang = lang;
  res.locals.t = locales[lang] || locales.en;
  next();
});

// Middleware to handle legacy .html extensions (Redirect to clean URLs)
app.use((req, res, next) => {
  if (req.path.endsWith('.html') && !req.path.includes('/archive/')) {
    const newPath = req.path.slice(0, -5);
    return res.redirect(301, newPath);
  }
  next();
});

// Routes
const pages = ['home', 'about', 'service', 'solution', 'contact'];

app.get('/', (req, res) => {
  res.render('home', { activePage: 'home' });
});

pages.forEach(page => {
  app.get(`/${page}`, (req, res) => {
    res.render(page, { activePage: page });
  });
});

// Serve static files (CSS, Images, etc.) AFTER routes
app.use(express.static(__dirname));

// Store submissions (in real app, use database)
const submissions = [];

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { fullName, email, service, message } = req.body;

  // Basic validation
  if (!fullName || !email || !service || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }

  // Store submission in DB
  const submission = db.saveSubmission({ fullName, email, service, message });

  if (!submission) {
    return res.status(500).json({ success: false, message: 'Error saving data' });
  }

  console.log('New Contact Submission saved to DB');

  res.json({ 
    success: true, 
    message: 'Thank you! We received your message. We\'ll contact you soon.',
    id: submission.id
  });
});

// Newsletter subscription endpoint
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email is required' 
    });
  }

  db.addSubscriber(email);
  console.log('Newsletter Subscription saved to DB:', email);

  res.json({ 
    success: true, 
    message: 'You\'ve been subscribed to our newsletter!' 
  });
});

// --- ADMIN ROUTES ---

// Admin Login Page
app.get('/admin/login', (req, res) => {
  if (req.session.admin) return res.redirect('/admin/dashboard');
  res.render('admin/login', { error: null });
});

// Admin Login Process
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simple auth (In production, use env vars and hashed passwords)
  if (username === 'admin' && password === 'admin123') {
    req.session.admin = true;
    res.redirect('/admin/dashboard');
  } else {
    res.render('admin/login', { error: 'Identifiants invalides' });
  }
});

// Admin Logout
app.get('/admin/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// Admin Dashboard
app.get('/admin/dashboard', isAdmin, (req, res) => {
  const submissions = db.getSubmissions();
  const subscribers = db.getSubscribers();
  
  const now = new Date();
  const simpleDate = d => new Date(d).toDateString();
  const recentMessagesCount = submissions.filter(s => {
    const subDate = new Date(s.timestamp);
    return (now - subDate) < (24 * 60 * 60 * 1000); // 24h
  }).length;

  res.render('admin/dashboard', { 
    stats: {
      messages: submissions.length,
      subscribers: subscribers.length,
      recentMessages: recentMessagesCount
    },
    recentSubmissions: submissions.slice(-5).reverse()
  });
});

// Admin Messages List
app.get('/admin/messages', isAdmin, (req, res) => {
  res.render('admin/messages', { 
    submissions: db.getSubmissions().reverse()
  });
});

// Admin Delete Message
app.get('/admin/messages/delete/:id', isAdmin, (req, res) => {
  db.deleteSubmission(req.params.id);
  res.redirect('/admin/messages');
});

// Admin Subscribers List
app.get('/admin/subscribers', isAdmin, (req, res) => {
  res.render('admin/subscribers', {
    subscribers: db.getSubscribers().reverse()
  });
});

// Admin Delete Subscriber
app.get('/admin/subscribers/delete/:email', isAdmin, (req, res) => {
  db.deleteSubscriber(req.params.email);
  res.redirect('/admin/subscribers');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Neurafrik Server running at http://localhost:${PORT}`);
  console.log(`📧 Contact endpoint: POST http://localhost:${PORT}/api/contact`);
  console.log(`📰 Newsletter endpoint: POST http://localhost:${PORT}/api/newsletter`);
});
