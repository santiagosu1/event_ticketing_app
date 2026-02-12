# EventHub Pro 🎟️

![Project Status](https://img.shields.io/badge/Status-In_Development-yellow) ![License](https://img.shields.io/badge/License-MIT-blue) ![React](https://img.shields.io/badge/React-19.2.4-blue) ![Node](https://img.shields.io/badge/Node-Compatible-green)

> A modern platform to discover and book tickets for your favorite local events. Built with React and featuring a responsive design with global state management.

---

## 📸 Screenshots

![Home Page](./event-ticketing/public/assets/home.png)

---

## 📖 Description

EventHub Pro is a dynamic event ticketing application that allows users to explore local events, filter by categories, view detailed event information, and simulate the ticket purchasing process. This project was built to practice modern React development including Context API for state management, React Router for navigation, and responsive CSS design.

### ✨ Key Features

- ✅ Featured events showcase with hero carousel
- ✅ Search and filter events by category
- ✅ Detailed event information pages
- ✅ Responsive checkout process
- ✅ Global state management with Context API
- ✅ User authentication (Login/Register pages)
- ✅ Mobile-first responsive design
- ✅ Event cards with pricing and details
- ✅ Multiple ticket types support
- ✅ Payment modal simulation

---

## 🛠️ Tech Stack

**Frontend:**
- React 19.2.4
- React Router DOM 7.13.0
- CSS3 (Responsive Design)
- Context API (State Management)

**Backend (Mock Server):**
- JSON Server 1.0.0-beta.5 (for local API simulation)

**Development Tools:**
- Node.js (recommended: v18+)
- npm or yarn
- Create React App
- Git & GitHub
- VS Code

**Browser Support:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 📂 Project Structure

```
event_ticketing_app/                 (Root - contains package.json for JSON Server)
├── event-ticketing/                 (React Frontend - main app)
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── assets/
│   │       └── images/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/              (Navigation header)
│   │   │   ├── HeroCarousel/        (Featured events carousel)
│   │   │   ├── Categories/          (Category filter)
│   │   │   ├── EventCard/           (Event card component)
│   │   │   └── EventsSection/       (Events grid layout)
│   │   ├── data/                    (JSON Server database files)
│   │   │   ├── events.json
│   │   │   ├── users.json
│   │   │   ├── purchases.json
│   │   │   └── TheaterData.json
│   │   ├── Layouts/
│   │   │   └── MainLayout.js        (Page wrapper)
│   │   ├── Pages/
│   │   │   ├── Home.js              (Landing page)
│   │   │   ├── CheckOut.js          (Event details & purchase)
│   │   │   ├── MyTickets.js         (User tickets)
│   │   │   ├── Login.js             (Authentication)
│   │   │   ├── Signup.js            (Registration)
│   │   │   ├── UserInfo.js          (Profile)
│   │   │   ├── About.js             (About page)
│   │   │   └── NoContent.js         (404 page)
│   │   ├── App.js                   (Root component)
│   │   ├── AppContext.js            (Global state management)
│   │   ├── index.js                 (Entry point)
│   │   ├── index.css                (Global styles)
│   │   └── styles/
│   │       └── AuthModal.css
│   ├── package.json
│   └── README.md
├── package.json                     (Root - JSON Server dependency)
├── package-lock.json
└── README.md                        (This file)
```

### Component Responsibilities

| Component | Responsibility |
|-----------|-----------------|
| **Navbar** | Site navigation, branding, user menu |
| **HeroCarousel** | Showcase featured events with sliding gallery |
| **Categories** | Filter/search events by category |
| **EventCard** | Display event info: image, price, date, CTA button |
| **EventsSection** | Responsive grid layout for event cards |
| **MainLayout** | Common layout wrapper (header, footer, content area) |

### State Management

**AppContext.js** maintains:
- 🔐 User authentication state
- 🛒 Shopping cart (selected tickets)
- 📋 Event listings
- 👤 User profile data
- 🎟️ Purchase history

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** v18 or higher
- **npm** v9 or higher (or yarn v3+)
- Git

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/santiagosu1/event_ticketing_app.git
   cd event_ticketing_app
   ```

2. **Install root dependencies (JSON Server for mock API):**
   ```bash
   npm install
   ```

3. **Navigate to frontend and install:**
   ```bash
   cd event-ticketing
   npm install
   ```

4. **Start JSON Server (Terminal 1):**
   ```bash
   npm run json-server
   # API available at http://localhost:3001
   ```

5. **Start React Development Server (Terminal 2):**
   ```bash
   cd event-ticketing
   npm start
   # App opens at http://localhost:3000
   ```

### 🌐 API Endpoints (JSON Server)

The mock backend runs on `http://localhost:3001` with these endpoints:

```
Events:
  GET    /events              - Get all events
  GET    /events/:id          - Get single event
  POST   /events              - Create event
  PUT    /events/:id          - Update event
  DELETE /events/:id          - Delete event

Users:
  GET    /users               - Get all users
  POST   /users               - Register user
  GET    /users/:id           - Get user profile

Purchases:
  GET    /purchases           - Get purchase history
  POST   /purchases           - Record new purchase

Theater Data:
  GET    /TheaterData         - Get venue information
```

### 📁 Data Files Location

```
event-ticketing/src/data/
├── events.json         - Event catalog (auto-synced with JSON Server)
├── users.json          - User accounts
├── purchases.json      - Ticket purchase records
└── TheaterData.json    - Theater/venue details
```

---

## 🚀 Available Scripts

### Frontend Scripts (in `event-ticketing` directory)

#### `npm start`
- Runs React in development mode
- Opens [http://localhost:3000](http://localhost:3000)
- Hot reloads on file changes
- Requires JSON Server running on port 3001

#### `npm test`
- Launches test runner in interactive watch mode
- Tests all files matching `*.test.js` or `*.spec.js`

#### `npm run build`
- Creates optimized production build in `build/` folder
- Code is minified and bundled
- Ready for deployment to hosting services

#### `npm run eject`
⚠️ **Warning:** One-way operation! Reveals all configuration.

### Root Scripts

#### `npm run json-server`
- Starts JSON Server mock API
- Runs on **http://localhost:3001**
- Watches `event-ticketing/src/data/` for changes
- Implements REST API for all data operations

---

## 🗺️ Application Routes

### Page Routes (React Router)

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home.js | Landing page with carousel & featured events |
| `/events` | EventsSection | Browse all events with category filters |
| `/event/:id` | CheckOut.js | Event details & ticket purchasing |
| `/checkout` | CheckOut.js | Final ticket purchase confirmation |
| `/my-tickets` | MyTickets.js | View user's purchased tickets |
| `/login` | Login.js | User authentication |
| `/signup` | Signup.js | New user registration |
| `/about` | About.js | About EventHub Pro |
| `/user-info` | UserInfo.js | User profile settings |
| `/*` | NoContent.js | 404 error page |

## ⚙️ Configuration & Environment

### Environment Variables (Optional)
Create `.env` in `event-ticketing/`:
```bash
REACT_APP_API_URL=http://localhost:3001
REACT_APP_API_TIMEOUT=5000
REACT_APP_ENV=development
```

### JSON Server Configuration
The JSON Server uses `event-ticketing/src/data/` as database:
- **Default Port:** 3001
- **Database Files:** JSON-based (events.json, users.json, etc.)
- **Auto-reload:** Watches for file changes automatically
- **No reset on restart:** Data persists between server restarts

---

## 🐛 Troubleshooting

### Port Already In Use

**Port 3000 (React):**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

**Port 3001 (JSON Server):**
```bash
# Use alternate port
json-server --watch event-ticketing/src/data/ --port 3002
# Update REACT_APP_API_URL in .env
```

### Dependency Issues

```bash
# Clear cache and reinstall
cd event-ticketing
rm -rf node_modules package-lock.json
npm install
```

### Module Not Found Errors
```bash
# Ensure both root and event-ticketing have dependencies
npm install              # Root
cd event-ticketing && npm install  # Frontend
```

### Hot Reload Not Working
- Verify both servers are running
- Check if file watcher limit is reached (macOS/Linux):
  ```bash
  echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
  sudo sysctl -p
  ```

### JSON Server Not Responding
```bash
# Check if running
curl http://localhost:3001/events

# Restart if needed
pkill -f json-server
npm run json-server
```

### CORS Issues
- Ensure JSON Server is running
- Verify API URL in .env matches running server
- Check `AppContext.js` for API configuration

---

## 📋 Core Features

### Home Page
- 🎠 Hero carousel showcasing featured events (auto-rotating)
- 🎯 Events grid with advanced filtering and search
- 📂 Category filters for event discovery
- 🎟️ Event cards displaying key information (date, location, price, image)
- 📱 Fully responsive design

### Event Browsing & Discovery
- Filter events by category (Concerts, Comedy, Theater, Sports, etc.)
- Sort by date, popularity, or price
- Event preview cards with quick details
- Detailed event information pages
- Ticket availability indicators

### Ticket Purchasing Flow
- Multiple ticket type options (VIP, General, Student, etc.)
- Dynamic quantity selection with real-time pricing
- Order summary with itemized breakdown
- Payment form simulation (no real payment processing)
- Order confirmation and reference numbers
- Currency support (USD/Soles)

### User Account Management
- User registration and login system
- User profile with personal information
- Purchase history tracking
- "My Tickets" dashboard to view all bookings
- Order history with ticket details

### Modern UI/UX
- Mobile-first responsive design
- Smooth transitions and animations
- Intuitive navigation
- Accessible components
- Performance optimized

---

## 💻 Development Workflow

### Recommended Workflow

1. **Development Setup**
   ```bash
   npm install                    # Root dependencies
   cd event-ticketing
   npm install                    # Frontend dependencies
   ```

2. **Start Development (open 2 terminals)**
   ```bash
   # Terminal 1: JSON Server (from root)
   npm run json-server
   
   # Terminal 2: React App (from event-ticketing)
   npm start
   ```

3. **File Structure Tips**
   - Keep components in `src/components/` with CSS files alongside
   - Keep page logic in `src/Pages/`
   - Manage global state through `src/AppContext.js`
   - Add new data to `src/data/*.json` files

4. **Adding New Features**
   - Create feature branch: `git checkout -b feature/your-feature`
   - Develop and test locally
   - Commit with clear messages: `git commit -m 'Add feature description'`
   - Push and create Pull Request

5. **Testing Data Changes**
   - Modify JSON files in `src/data/`
   - JSON Server auto-reloads
   - Check API with: `curl http://localhost:3001/events`

### Debugging Tips
- Use React Developer Tools browser extension
- Check Network tab for API calls
- Verify JSON Server logs for any issues
- Use `console.log()` in components for debugging
- Check AppContext for state management issues

---

## 🎯 Future Enhancements

- [ ] Backend integration with real database
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] User cart persistence
- [ ] Email confirmation for bookings
- [ ] Admin dashboard for event management
- [ ] Reviews and ratings system
- [ ] Event recommendations based on history
- [ ] Multiple language support

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions to improve this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## ✒️ Authors

| Name | GitHub | Role |
|------|--------|------|
| **Santiago Suarez** | [@santiagosu1](https://github.com/santiagosu1) | Lead Developer |
| **Javier Nieto** | [@Javier0311](https://github.com/Javier0311) | Developer |
| **Jose Zevallos** | [@josegabrielzevallos](https://github.com/josegabrielzevallos) | Developer |

---

## 📧 Support

For questions or issues, please open an issue on GitHub or contact the development team.

## 🙏 Acknowledgments

- React documentation and community
- Create React App for the initial setup
- All contributors who have helped with feedback and improvements

---

**Last Updated:** February 12, 2026
