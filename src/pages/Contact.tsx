import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitStatus('success')
    setFormData({ name: '', email: '', subject: '', message: '' })
    
    setTimeout(() => setSubmitStatus('idle'), 5000)
  }

  const contactMethods = [
    {
      icon: 'solar:letter-bold-duotone',
      title: 'Email',
      description: 'Send me a direct message',
      value: 'hello@dewanmukto.com',
      href: 'mailto:hello@dewanmukto.com',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: 'solar:phone-bold-duotone',
      title: 'Phone',
      description: 'Call for urgent matters',
      value: '+1 (709) 123-4567',
      href: 'tel:+17091234567',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: 'solar:map-point-bold-duotone',
      title: 'Location',
      description: 'Based between two countries',
      value: 'Dhaka, BD • St. John\'s, CA',
      href: null,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: 'solar:calendar-bold-duotone',
      title: 'Schedule',
      description: 'Book a consultation',
      value: 'Available Mon-Fri',
      href: 'https://calendly.com/dewanmukto',
      color: 'text-orange-600 dark:text-orange-400'
    }
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      icon: 'solar:github-bold-duotone',
      href: 'https://github.com/dewanmukto',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      name: 'LinkedIn',
      icon: 'solar:linkedin-bold-duotone',
      href: 'https://linkedin.com/in/dewanmukto',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Dribbble',
      icon: 'solar:dribbble-bold-duotone',
      href: 'https://dribbble.com/dewanmukto',
      color: 'hover:text-pink-600'
    },
    {
      name: 'YouTube',
      icon: 'solar:youtube-bold-duotone',
      href: 'https://youtube.com/@dewanmukto',
      color: 'hover:text-red-600'
    }
  ]

  const subjects = [
    'General Inquiry',
    'Book Discussion',
    'Design Project',
    'Development Work',
    'Collaboration',
    'Speaking Engagement',
    'Media Interview',
    'Other'
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full mb-6">
            <Icon icon="solar:letter-bold-duotone" className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Get in Touch
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-futura font-bold text-gray-900 dark:text-white mb-6">
            Contact Me
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 font-lora max-w-3xl mx-auto">
            Whether you're interested in my books, need creative services, or want to collaborate 
            on a project, I'd love to hear from you. Let's start a conversation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-futura font-bold text-gray-900 dark:text-white mb-6">
                Send a Message
              </h2>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <Icon icon="solar:check-circle-bold-duotone" className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-green-800 dark:text-green-200 font-medium">
                      Message sent successfully! I'll get back to you soon.
                    </span>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell me about your project, question, or how I can help you..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-ring"
                >
                  {isSubmitting ? (
                    <>
                      <Icon icon="solar:loading-bold-duotone" className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Icon icon="solar:letter-bold-duotone" className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300"
                >
                  {method.href ? (
                    <a href={method.href} className="block">
                      <div className={`w-12 h-12 ${method.color} bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4`}>
                        <Icon icon={method.icon} className="w-6 h-6" />
                      </div>
                      <h3 className="font-futura font-bold text-lg text-gray-900 dark:text-white mb-1">
                        {method.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {method.description}
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {method.value}
                      </p>
                    </a>
                  ) : (
                    <div>
                      <div className={`w-12 h-12 ${method.color} bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4`}>
                        <Icon icon={method.icon} className="w-6 h-6" />
                      </div>
                      <h3 className="font-futura font-bold text-lg text-gray-900 dark:text-white mb-1">
                        {method.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {method.description}
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {method.value}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800"
            >
              <h3 className="font-futura font-bold text-xl text-gray-900 dark:text-white mb-6">
                Connect on Social Media
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-all duration-200 text-gray-600 dark:text-gray-400 ${link.color}`}
                  >
                    <Icon icon={link.icon} className="w-6 h-6" />
                    <span className="font-medium">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Icon icon="solar:clock-circle-bold-duotone" className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="font-futura font-bold text-lg text-gray-900 dark:text-white">
                  Availability
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                I typically respond to messages within 24-48 hours. For urgent matters, 
                please call or mention "URGENT" in your subject line.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  Currently available for new projects
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact