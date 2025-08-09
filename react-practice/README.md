# React Practice App

A modern React application built with Vite, featuring Tailwind CSS, Zustand state management, and React Router for navigation.

## Features

- ⚡ **Vite** - Fast build tool and development server
- 🎨 **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- 🗃️ **Zustand** - Lightweight state management library
- 🚀 **React Router** - Client-side routing for single-page applications
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🔐 **Authentication Flow** - Login and signup functionality with form validation

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **React Router DOM** - Client-side routing

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
│   ├── Home.jsx        # Home page with navigation
│   ├── Login.jsx       # Login form
│   └── Signup.jsx      # Signup form
├── stores/             # Zustand stores
│   └── authStore.js    # Authentication state management
├── App.jsx             # Main app component with routing
├── main.jsx            # App entry point
└── index.css           # Tailwind CSS imports
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-practice
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## State Management

The app uses Zustand for state management with a simple authentication store:

```javascript
const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  signup: (userData) => set({ user: userData, isAuthenticated: true }),
  updateUser: (userData) => set({ user: { ...userData } })
}))
```

## Routing

The app includes three main routes:

- `/` - Home page with navigation and feature showcase
- `/login` - Login form with validation
- `/signup` - Signup form with validation

## Styling

The app uses Tailwind CSS for styling, providing:
- Responsive design utilities
- Consistent color scheme
- Modern UI components
- Hover and focus states
- Smooth transitions

## Development

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route to `src/App.jsx`
3. Import and use the component

### Adding New Stores

1. Create a new store file in `src/stores/`
2. Use the `create` function from Zustand
3. Import and use the store in your components

### Customizing Tailwind

Edit `tailwind.config.js` to customize:
- Colors
- Spacing
- Typography
- Breakpoints
- Custom utilities

## Build and Deployment

### Production Build

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### Deployment

The built files can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Any web server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
