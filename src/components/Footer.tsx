import React from 'react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: 'solar:github-bold-duotone',
      href: 'https://github.com/dewanmukto',
    },
    {
      name: 'Dribbble',
      icon: 'solar:dribbble-bold-duotone',
      href: 'https://dribbble.com/dewanmukto',
    },
    {
      name: 'YouTube',
      icon: 'solar:youtube-bold-duotone',
      href: 'https://youtube.com/@dewanmukto',
    },
    {
      name: 'LinkedIn',
      icon: 'solar:linkedin-bold-duotone',
      href: 'https://linkedin.com/in/dewanmukto',
    },
  ]

  const quickLinks = [
    { name: 'Books', href: '/books' },
    { name: 'Designs', href: '/designs' },
    { name: 'Videos', href: '/videos' },
    { name: 'Employment', href: '/employment' },
  ]

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-gray-900 font-futura font-bold text-lg">
                  DM
                </span>
              </div>
              <div>
                <h3 className="font-futura font-bold text-xl text-gray-900 dark:text-white">
                  Dewan Mukto
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Author, Developer & Creative Professional
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Crafting stories, building digital experiences, and creating meaningful connections 
              through technology and literature. Based between Bangladesh and Canada.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus-ring"
                  aria-label={link.name}
                >
                  <Icon icon={link.icon} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-futura font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-futura font-semibold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Icon icon="solar:letter-bold-duotone" className="w-5 h-5" />
                <span className="text-sm">hello@dewanmukto.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Icon icon="solar:map-point-bold-duotone" className="w-5 h-5" />
                <span className="text-sm">Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Icon icon="solar:map-point-bold-duotone" className="w-5 h-5" />
                <span className="text-sm">St. John's, Canada</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Dewan Mukto. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <a href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer