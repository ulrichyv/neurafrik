# Neurafrik Solutions - AI & Automation for Africa

## 🚀 Getting Started

### Installation

1. **Install Node.js** if you haven't already
   - Download from [nodejs.org](https://nodejs.org)

2. **Navigate to project directory**
   ```bash
   cd "c:\Users\ulrich\Downloads\Nouveau dossier (15)\stitch\neurafrik_site"
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

### Running the Server

Start the development server:
```bash
npm start
```

The server will run at: **http://localhost:3000**

### Access the Website

Open your browser and visit:
- **Home**: http://localhost:3000/home.html
- **About**: http://localhost:3000/about.html
- **Services**: http://localhost:3000/service.html
- **Solutions**: http://localhost:3000/solution.html
- **Contact**: http://localhost:3000/contact.html

## 📋 Features

### Navigation
All pages have unified navigation that links between:
- Home
- About
- Services
- Solutions
- Contact

### Contact Form
Submit inquiries through the contact form at `/contact.html`:
- Full Name (required)
- Email Address (required)
- Service of Interest (required)
- Message (required)

### API Endpoints

#### Submit Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "service": "AI Strategy Consulting",
  "message": "I'm interested in your services"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you! We received your message. We'll contact you soon.",
  "id": 1
}
```

#### Get All Submissions
```
GET /api/submissions
```

Returns array of all form submissions

#### Get Specific Submission
```
GET /api/submissions/:id
```

Returns submission with specific ID

#### Subscribe to Newsletter
```
POST /api/newsletter
Content-Type: application/json

{
  "email": "subscriber@example.com"
}
```

## 🎨 Design System

### Color Palette
- **Primary**: `#00eeff` (Cyan)
- **Accent Purple**: `#bc00ff`
- **Background Dark**: `#050a0a`
- **Background Light**: `#f5f8f8`
- **Glass**: `rgba(15, 34, 35, 0.7)`

### Typography
- **Font**: Inter (weights: 300-900)
- **Icons**: Material Symbols Outlined

## 📁 Project Structure

```
neurafrik_site/
├── home.html           # Landing page
├── about.html          # About page
├── service.html        # Services page
├── solution.html       # Solutions showcase
├── contact.html        # Contact form
├── styles.css          # Shared CSS styles
├── server.js           # Express server
├── package.json        # Dependencies
└── README.md          # This file
```

## 🔧 Tech Stack

- **Frontend**: HTML5, Tailwind CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Frontend Framework**: None (vanilla HTML/CSS/JS)

## 📝 Form Data Handling

All form submissions are:
1. Validated on the server
2. Stored in memory (consider database for production)
3. Returned with success/error message
4. Logged to console for monitoring

## 🚀 Deployment

For production deployment:

1. Use a process manager like **PM2**
2. Use a reverse proxy like **Nginx**
3. Store form data in a database (MongoDB, PostgreSQL, etc.)
4. Add email notifications
5. Implement HTTPS/SSL

Example with PM2:
```bash
npm install -g pm2
pm2 start server.js
pm2 save
```

## 📞 Support

For questions or issues, contact: hello@neurafrik.com

---

**Built with ❤️ for African Enterprises**
