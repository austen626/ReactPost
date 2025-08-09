import React from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../stores/authStore'

const Home: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                React Practice
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/posts"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm md:text-base transition-colors duration-200"
              >
                Posts
              </Link>
              <Link
                to="/create-post"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm md:text-base transition-colors duration-200"
              >
                Create Post
              </Link>
              {isAuthenticated ? (
                <>
                  <span className="text-gray-700 text-sm md:text-base">
                    Welcome, {user?.name || 'User'}!
                  </span>
                  <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm md:text-base transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm md:text-base transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm md:text-base transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              React Practice
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            A modern React application built with Vite, Tailwind CSS, Zustand, and React Router. 
            Experience the power of modern web development tools.
          </p>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/create-post"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Create Post
              </Link>
            </div>
          )}
          
          {isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/create-post"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Create Post
              </Link>
              <Link
                to="/posts"
                className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
              >
                View Posts
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Built with Modern Tools
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the latest in web development with our carefully chosen tech stack
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Vite</h3>
            <p className="text-gray-600 leading-relaxed">
              Lightning-fast build tool that provides instant hot module replacement and optimized builds for production.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Tailwind CSS</h3>
            <p className="text-gray-600 leading-relaxed">
              Utility-first CSS framework that allows you to build custom designs without leaving your HTML.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Zustand</h3>
            <p className="text-gray-600 leading-relaxed">
              Small, fast, and scalable state management solution with a comfortable API based on hooks.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">React Router</h3>
            <p className="text-gray-600 leading-relaxed">
              Declarative routing for React applications with nested routes and dynamic routing capabilities.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">TypeScript</h3>
            <p className="text-gray-600 leading-relaxed">
              Typed superset of JavaScript that adds static type checking and modern language features.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Zod</h3>
            <p className="text-gray-600 leading-relaxed">
              TypeScript-first schema validation library with excellent type inference and runtime validation.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">React Practice</h3>
            <p className="text-gray-400 mb-6">
              A modern React application showcasing the latest web development technologies
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                GitHub
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Documentation
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home 