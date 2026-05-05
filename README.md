# CampusVoice - Smart Complaint Management System

A modern, AI-powered complaint management platform for educational institutions, leveraging Google's Gemini API for intelligent complaint analysis.

## 📋 Features

- **Anonymous & Identified Complaints**: Submit complaints with or without personal details
- **AI-Powered Analysis**: Google Gemini integration for accurate sentiment, priority, and keyword extraction
- **Graceful Degradation**: Automatic fallback to ensure system reliability
- **Role-Based Access**: Admin, Staff, and User roles with appropriate permissions
- **Real-time Tracking**: Track complaint status and resolution progress
- **Secure Authentication**: JWT-based authentication system
- **Responsive Design**: Modern UI built with React + Tailwind CSS

## 🏗️ Project Structure

```
CampusVoice/
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── controllers/  # Business logic
│   │   ├── models/       # MongoDB schemas
│   │   ├── routes/       # API endpoints
│   │   ├── services/     # Gemini AI & utilities
│   │   ├── middleware/   # Auth & role validation
│   │   ├── config/       # Database config
│   │   └── script/       # Testing scripts
│   └── package.json
└── frontend/             # React + Vite app
    ├── src/
    │   ├── components/   # UI components
    │   ├── pages/        # Page layouts
    │   ├── services/     # API client services
    │   ├── hooks/        # Custom React hooks
    │   └── test/         # Test files
    └── package.json
```

##  Getting Started

### Prerequisites

- Node.js 16+
- MongoDB (local or Atlas)
- Google Gemini API Key ([get one free](https://ai.google.dev/))

### Backend Setup

```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
MONGO_URI=mongodb://localhost:27017/campusvoice
JWT_SECRET=your-secret-key-here
GEMINI_API_KEY=your-api-key-here
PORT=5000
EOF

npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

##  Environment Variables

### Backend (.env)

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret for JWT token signing |
| `GEMINI_API_KEY` | Yes | Google Gemini API key |
| `GEMINI_MODEL` | No | Override default model (default: gemini-2.0-flash) |
| `PORT` | No | Server port (default: 5000) |

### Frontend (.env)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | No | Backend API URL (default: http://localhost:5000) |

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Complaints

- `GET /api/complaints` - Get all complaints (admin only)
- `POST /api/complaints` - Submit new complaint
- `GET /api/complaints/:id` - Get complaint details
- `PUT /api/complaints/:id` - Update complaint (admin only)
- `GET /api/complaints/track/:trackingId` - Track complaint anonymously

### Sentiment Analysis

- `POST /api/sentiment/analyze` - Analyze sentiment of text

### Staff Management

- `GET /api/staff` - Get staff list
- `PUT /api/staff/:id` - Update staff assignment (admin only)

### Admin Dashboard

- `GET /api/admin/stats` - Get system statistics (admin only)
- `GET /api/admin/complaints` - List all complaints (admin only)

##  Gemini AI Integration

### How It Works

1. User submits complaint text
2. Backend sends text to Gemini API
3. Gemini analyzes and returns:
   - **Sentiment**: positive, neutral, negative
   - **Priority**: low, medium, high, critical
   - **Keywords**: Relevant extracted terms
   - **Confidence**: Analysis confidence score (0-1)

### Supported Models

The system tries models in this order:
1. gemini-2.5-flash (latest)
2. gemini-2.0-flash
3. gemini-2.0-flash-lite
4. gemini-1.5-flash-latest
5. gemini-1.5-flash

### Fallback Mechanism

If Gemini API is unavailable:
- Sentiment: "neutral"
- Priority: "medium"
- Keywords: []
- Confidence: 0.35

This ensures the system remains operational even if the AI service is down.

##  Testing

### Test Gemini Integration

```bash
cd backend
npm run test:gemini "Your complaint text here"
```

### Example

```bash
npm run test:gemini "Hostel room has water leakage"
```

### Frontend Tests

```bash
cd frontend
npm run test
```

##  Database Models

### Complaint Schema

```javascript
{
  _id: ObjectId,
  category: String,
  complaintText: String,
  isAnonymous: Boolean,
  submittedBy: ObjectId,
  status: String, // "open", "in-progress", "resolved"
  createdAt: Date,
  updatedAt: Date,
  mlOutput: {
    sentiment: String,
    priority: String,
    keywords: [String],
    confidence: Number
  },
  analysisMeta: {
    source: "gemini" | "fallback",
    model: String,
    reason: String
  },
  trackingId: String
}
```

### User Schema

```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  name: String,
  role: String, // "user", "staff", "admin"
  createdAt: Date
}
```

##  Security

- ✅ Input validation on all endpoints
- ✅ JWT-based authentication
- ✅ Role-based access control (RBAC)
- ✅ API key stored server-side only
- ✅ Password hashing with bcrypt
- ✅ Gemini response sanitization
- ✅ CORS protection
- ✅ Rate limiting on sensitive endpoints

## 📈 Performance Metrics

| Operation | Latency |
|-----------|---------|
| Gemini Analysis (cached SDK) | 500-800ms |
| Fallback Analysis | <10ms |
| Database Query | 10-50ms |
| API Response (95th percentile) | <1s |

## 🚀 Deployment

### Render.com (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Render
3. Set environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `GEMINI_API_KEY`
4. Deploy automatically on push

### Production Checklist

- [ ] Set `GEMINI_API_KEY` in environment variables
- [ ] Ensure `.env` is in `.gitignore`
- [ ] Run `npm run test:gemini` to verify Gemini integration
- [ ] Monitor API response times and error rates
- [ ] Set up logging/monitoring dashboard
- [ ] Configure automated backups for MongoDB
- [ ] Enable HTTPS/SSL certificates
- [ ] Rotate API keys periodically

##  Troubleshooting

### Backend Issues

**"GEMINI_API_KEY not found"**
- Verify `.env` file exists with the key
- Restart the server: `npm run dev`

**"MongoDB connection refused"**
- Ensure MongoDB is running
- Check `MONGO_URI` connection string
- Verify network access if using Atlas

**"Slow Gemini responses"**
- Check internet connection
- Verify Gemini API status
- Consider using faster model: `gemini-2.0-flash-lite`
- Check API quota limits

### Frontend Issues

**"Cannot connect to backend"**
- Verify backend server is running on correct port
- Check `VITE_API_URL` environment variable
- Clear browser cache

**"Build errors"**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` and `npm run dev` again

##  Development Commands

### Backend

```bash
cd backend

# Start development server
npm run dev

# Test Gemini integration
npm run test:gemini "test complaint"

# Test sentiment analysis
node src/script/testGemini.js

# Create admin user
node src/script/createAdmin.js
```

### Frontend

```bash
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint
```

##  Architecture Decisions

### Why Gemini AI?
- Free tier available (15 requests/min)
- Excellent NLP capabilities
- Easy integration with Node.js
- Multiple model options for fallback
- Cost-effective for complaint analysis

### Why React + Vite?
- Fast development experience with HMR
- Optimized production builds
- Modern component architecture
- Great ecosystem and community

### Why MongoDB?
- Flexible schema for complaint data
- Horizontal scalability
- Excellent Node.js integration
- Free tier with Atlas

##  Resources

- [Google Gemini API Docs](https://ai.google.dev/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)



## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review the project analysis report for detailed technical info

---

