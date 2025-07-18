import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

const Home: React.FC = () => {
  const stats = [
    { label: 'Books Published', value: '6+', icon: 'solar:book-bold-duotone' },
    { label: 'Design Projects', value: '9+', icon: 'solar:palette-bold-duotone' },
    { label: 'Video Content', value: '37+', icon: 'solar:videocamera-bold-duotone' },
    { label: 'Years Experience', value: '6+', icon: 'solar:star-bold-duotone' },
  ]

  const highlights = [
    {
      title: 'Latest Book',
      subtitle: 'In The Wildest Dimensions',
      description: 'A psychological thriller exploring memory, trust, and the warped nature of truth.',
      image: 'https://dewanmukto.github.io/asset/images/ITWD_cover.png',
      link: '/books',
      icon: 'solar:book-bold-duotone',
    },
    {
      title: 'Recent Design',
      subtitle: 'Clothing Store App',
      description: 'Modern UI design for a fashion retail mobile application.',
      image: 'https://cdn.dribbble.com/userupload/10781385/file/original-3743ff23b01ec3c79d77c427ef685987.png?resize=400x300&vertical=center',
      link: '/designs',
      icon: 'solar:palette-bold-duotone',
    },
    {
      title: 'Current Role',
      subtitle: 'Mux AI - Developer',
      description: 'Leading web development and creative strategy initiatives.',
      image: null,
      link: '/employment',
      icon: 'solar:case-bold-duotone',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <Icon icon="solar:star-bold-duotone" className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Author & Developer
                  </span>
                </motion.div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-futura font-bold text-gray-900 dark:text-white leading-tight">
                  Hi, I'm{' '}
                  <span className="gradient-text">
                    Dewan Mukto
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-400 font-lora leading-relaxed max-w-2xl">
                  A creative professional crafting compelling stories through literature and 
                  building innovative digital experiences through technology. Based between 
                  Bangladesh and Canada.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/books"
                    className="inline-flex items-center space-x-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors focus-ring"
                  >
                    <Icon icon="solar:book-bold-duotone" className="w-5 h-5" />
                    <span>Explore My Books</span>
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/contact"
                    className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus-ring"
                  >
                    <Icon icon="solar:letter-bold-duotone" className="w-5 h-5" />
                    <span>Get in Touch</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-600 dark:to-gray-400 rounded-2xl blur-2xl opacity-20 animate-pulse-slow"></div>
                <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-white dark:text-gray-900 font-futura font-bold text-2xl">
                        DM
                      </span>
                    </div>
                    <div>
                      <h3 className="font-futura font-bold text-xl text-gray-900 dark:text-white">
                        Dewan Mukto
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Multi-disciplinary Creative
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      {stats.slice(0, 4).map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="text-center"
                        >
                          <Icon icon={stat.icon} className="w-6 h-6 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                          <div className="font-futura font-bold text-lg text-gray-900 dark:text-white">
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-futura font-bold text-gray-900 dark:text-white mb-4">
              Recent Highlights
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-lora max-w-2xl mx-auto">
              A glimpse into my latest work across literature, design, and professional endeavors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link
                  to={highlight.link}
                  className="block bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-800"
                >
                  {highlight.image ? (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={highlight.image}
                        alt={highlight.subtitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                      <Icon icon={highlight.icon} className="w-16 h-16 text-gray-400 dark:text-gray-600" />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon icon={highlight.icon} className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {highlight.title}
                      </span>
                    </div>
                    <h3 className="font-futura font-bold text-xl text-gray-900 dark:text-white mb-2">
                      {highlight.subtitle}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 font-lora">
                      {highlight.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl font-futura font-bold text-gray-900 dark:text-white">
              Let's Create Something Amazing Together
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-lora max-w-2xl mx-auto">
              Whether you're interested in my books, need creative design work, or want to 
              collaborate on a project, I'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors focus-ring"
                >
                  <Icon icon="solar:letter-bold-duotone" className="w-5 h-5" />
                  <span>Start a Conversation</span>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/employment"
                  className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus-ring"
                >
                  <Icon icon="solar:case-bold-duotone" className="w-5 h-5" />
                  <span>View My Experience</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home