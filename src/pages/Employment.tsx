import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'
import employmentData from '../../data/employments.json'

interface Employment {
  company: string
  role: string | string[]
  start_date: string
  end_date: string
  location: {
    city: string
    country: string
  }
  industry: string
  department: string
}

const Employment: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Employment | null>(null)
  const [filter, setFilter] = useState<'all' | 'current' | 'past'>('all')

  const employments = employmentData as Employment[]
  
  const filteredEmployments = employments.filter(job => {
    if (filter === 'all') return true
    if (filter === 'current') return job.end_date === 'Present'
    if (filter === 'past') return job.end_date !== 'Present'
    return true
  })

  const getIndustryIcon = (industry: string) => {
    switch (industry.toLowerCase()) {
      case 'technology':
        return 'solar:code-bold-duotone'
      case 'education':
        return 'solar:book-bold-duotone'
      case 'entertainment':
        return 'solar:videocamera-bold-duotone'
      case 'retail':
      case 'retail/wholesale':
        return 'solar:shop-bold-duotone'
      case 'journalism':
        return 'solar:document-text-bold-duotone'
      case 'culinary':
        return 'solar:chef-hat-bold-duotone'
      case 'game development':
        return 'solar:gameboy-bold-duotone'
      default:
        return 'solar:case-bold-duotone'
    }
  }

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = endDate === 'Present' ? new Date() : new Date(endDate)
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    
    let duration = ''
    if (years > 0) duration += `${years} year${years > 1 ? 's' : ''}`
    if (remainingMonths > 0) {
      if (duration) duration += ' '
      duration += `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`
    }
    
    return duration || '1 month'
  }

  const filters = [
    { key: 'all', label: 'All Positions', icon: 'solar:case-bold-duotone' },
    { key: 'current', label: 'Current', icon: 'solar:star-bold-duotone' },
    { key: 'past', label: 'Past', icon: 'solar:history-bold-duotone' },
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
            <Icon icon="solar:case-bold-duotone" className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Professional Journey
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-futura font-bold text-gray-900 dark:text-white mb-6">
            Employment History
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 font-lora max-w-3xl mx-auto mb-8">
            A comprehensive overview of my professional experience across various industries, 
            showcasing growth, adaptability, and diverse skill development.
          </p>

          {/* Filter Tabs */}
          <div className="flex justify-center space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg inline-flex">
            {filters.map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  filter === filterOption.key
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon icon={filterOption.icon} className="w-4 h-4" />
                <span>{filterOption.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Employment Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform md:-translate-x-0.5"></div>
          
          <motion.div
            layout
            className="space-y-8"
          >
            <AnimatePresence>
              {filteredEmployments.map((job, index) => (
                <motion.div
                  key={`${job.company}-${job.start_date}`}
                  layout
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white dark:bg-gray-900 border-4 border-gray-900 dark:border-white rounded-full transform md:-translate-x-1/2 z-10">
                    {job.end_date === 'Present' && (
                      <div className="absolute inset-1 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                  </div>

                  {/* Content Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`ml-12 md:ml-0 w-full md:w-5/12 ${
                      index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}
                  >
                    <div
                      className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 cursor-pointer"
                      onClick={() => setSelectedJob(job)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <Icon 
                              icon={getIndustryIcon(job.industry)} 
                              className="w-6 h-6 text-gray-600 dark:text-gray-400" 
                            />
                          </div>
                          <div>
                            <h3 className="font-futura font-bold text-lg text-gray-900 dark:text-white">
                              {job.company}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {job.industry} • {job.department}
                            </p>
                          </div>
                        </div>
                        {job.end_date === 'Present' && (
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium rounded-full">
                            Current
                          </span>
                        )}
                      </div>

                      <div className="mb-4">
                        <div className="font-medium text-gray-900 dark:text-white mb-1">
                          {Array.isArray(job.role) ? job.role.join(', ') : job.role}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {job.start_date} - {job.end_date} • {formatDateRange(job.start_date, job.end_date)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                          <Icon icon="solar:map-point-bold-duotone" className="w-4 h-4" />
                          <span>{job.location.city}, {job.location.country}</span>
                        </div>
                        <Icon 
                          icon="solar:arrow-right-bold-duotone" 
                          className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" 
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { 
              label: 'Total Positions', 
              value: employments.length.toString(), 
              icon: 'solar:case-bold-duotone' 
            },
            { 
              label: 'Industries', 
              value: new Set(employments.map(job => job.industry)).size.toString(), 
              icon: 'solar:buildings-bold-duotone' 
            },
            { 
              label: 'Countries', 
              value: new Set(employments.map(job => job.location.country)).size.toString(), 
              icon: 'solar:global-bold-duotone' 
            },
            { 
              label: 'Current Roles', 
              value: employments.filter(job => job.end_date === 'Present').length.toString(), 
              icon: 'solar:star-bold-duotone' 
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 text-center"
            >
              <Icon icon={stat.icon} className="w-8 h-8 mx-auto mb-3 text-gray-600 dark:text-gray-400" />
              <div className="text-3xl font-futura font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Job Detail Modal */}
        <AnimatePresence>
          {selectedJob && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedJob(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <Icon 
                          icon={getIndustryIcon(selectedJob.industry)} 
                          className="w-6 h-6 text-gray-600 dark:text-gray-400" 
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl font-futura font-bold text-gray-900 dark:text-white">
                          {selectedJob.company}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          {selectedJob.industry} • {selectedJob.department}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedJob(null)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus-ring"
                    >
                      <Icon icon="solar:close-square-bold-duotone" className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Role(s)</div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {Array.isArray(selectedJob.role) 
                            ? selectedJob.role.map((role, index) => (
                                <div key={index}>{role}</div>
                              ))
                            : selectedJob.role
                          }
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Duration</div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {formatDateRange(selectedJob.start_date, selectedJob.end_date)}
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Period</div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {selectedJob.start_date} - {selectedJob.end_date}
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Location</div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {selectedJob.location.city}, {selectedJob.location.country}
                        </div>
                      </div>
                    </div>

                    {selectedJob.end_date === 'Present' && (
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Icon icon="solar:star-bold-duotone" className="w-5 h-5 text-green-600 dark:text-green-400" />
                          <span className="font-medium text-green-800 dark:text-green-200">
                            Currently Active Position
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Employment