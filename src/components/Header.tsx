import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: 'solar:home-2-bold-duotone' },
    { name: 'Books', href: '/books', icon: 'solar:book-bold-duotone' },
    { name: 'Designs', href: '/designs', icon: 'solar:palette-bold-duotone' },
    { name: 'Videos', href: '/videos', icon: 'solar:videocamera-bold-duotone' },
    { name: 'Employment', href: '/employment', icon: 'solar:case-bold-duotone' },
    { name: 'Contact', href: '/contact', icon: 'solar:letter-bold-duotone' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => location.pathname === path

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 rounded-lg flex items-center justify-center"
            >
              <span className="text-white dark:text-gray-900 font-futura font-bold text-lg">
                DM
              </span>
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="font-futura font-bold text-xl text-gray-900 dark:text-white">
                Dewan Mukto
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 -mt-1">
                Author & Developer
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 group ${
                  isActive(item.href)
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon
                  icon={item.icon}
                  className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                    isActive(item.href) ? 'text-white dark:text-gray-900' : ''
                  }`}
                />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus-ring"
              aria-label="Toggle theme"
            >
              <Icon
                icon={theme === 'light' ? 'solar:moon-bold-duotone' : 'solar:sun-bold-duotone'}
                className="w-5 h-5"
              />
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus-ring"
              aria-label="Toggle menu"
            >
              <Icon
                icon={isMenuOpen ? 'solar:close-square-bold-duotone' : 'solar:hamburger-menu-bold-duotone'}
                className="w-6 h-6"
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 pb-6"
            >
              <div className="grid grid-cols-2 gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon icon={item.icon} className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

export default Header