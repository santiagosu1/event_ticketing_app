# EventHub Pro 🎟️

![Project Status](https://img.shields.io/badge/Status-In_Development-yellow) ![License](https://img.shields.io/badge/License-MIT-blue) ![React](https://img.shields.io/badge/React-19.2.4-blue) ![Node](https://img.shields.io/badge/Node-Compatible-green)

> A modern platform to discover and book tickets for your favorite local events. Built with React and featuring a responsive design with global state management.

---

## 📸 Screenshots

![Home Page](./public/assets/home.png)

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

**Development Tools:**
- Create React App
- Git & GitHub
- VS Code
- npm / yarn

**Browser Support:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)

---

## 📂 Project Structure

```
event_ticketing_app/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   └── assets/
│       └── images/
├── src/
│   ├── components/
│   │   ├── Categories/
│   │   │   ├── Categories.js
│   │   │   └── Categories.css
│   │   ├── EventCard/
│   │   │   ├── EventCard.js
│   │   │   └── EventCard.css
│   │   ├── EventsSection/
│   │   │   ├── EventsSection.js
│   │   │   └── EventsSection.css
│   │   ├── HeroCarousel/
│   │   │   ├── HeroCarousel.js
│   │   │   └── HeroCarousel.css
│   │   └── Navbar/
│   │       ├── Navbar.js
│   │       └── Navbar.css
│   ├── data/
│   │   ├── events.json
│   │   └── TheaterData.json
│   ├── Layouts/
│   │   └── MainLayout.js
│   ├── Pages/
│   │   ├── Home.js
│   │   ├── Home.css
│   │   ├── CheckOut.js
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── About.js
│   │   ├── UserInfo.js
│   │   ├── NoContent.js
│   │   └── headerfooter.css
│   ├── App.js
│   ├── AppContext.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

### Component Overview

| Component | Purpose |
|-----------|---------|
| **Navbar** | Navigation header with logo and menu |
| **HeroCarousel** | Featured events carousel on home page |
| **Categories** | Filter events by category |
| **EventsSection** | Grid display of event cards |
| **EventCard** | Individual event card with image, details, and CTA |
| **MainLayout** | Wrapper layout for all pages |

### Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Main landing page with events showcase |
| **Checkout** | `/checkout/:id` | Event details and ticket purchase flow |
| **Login** | `/login` | User authentication page |
| **Signup** | `/signup` | User registration page |
| **About** | `/about` | About page |
| **User Info** | `/user-info` | User profile information |
| **NoContent** | `*` | 404 not found page |

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/santiagosu1/event_ticketing_app.git
   cd event_ticketing_app/event-ticketing
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

---

## 🚀 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`
**Note: this is a one-way operation. Once you eject, you can't go back!**

---

## 📋 Features in Detail

### Home Page
- Hero carousel showcasing featured events
- Events grid with search/filter functionality
- Category filters for easy browsing
- Event cards with essential information (date, location, price)

### Event Details & Checkout
- Full event information display
- Multiple ticket type options
- Quantity selector for each ticket type
- Payment modal with form validation
- Success confirmation screen
- Price calculation with currency support (USD/Soles)

### User Authentication
- Login page for returning users
- Sign-up page for new users
- User profile information page

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

**Last Updated:** February 2026