import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'
import designsData from '../../data/designs.json'

interface Design {
  title: string
  category: string
  thumbnail: string
  link: string
}

const Designs: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null)

  const designs = designsData as Design[]
  
  const categories = ['all', ...Array.from(new Set(designs.map(design => design.category)))]
  
  const filteredDesigns = selectedCategory === 'all' 
    ? designs 
    : designs.filter(design => design.category === selectedCategory)

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'ui design':
        return 'solar:smartphone-bold-duotone'
      case 'web design':
        return 'solar:monitor-bold-duotone'
      case 'graphic design':
        return 'solar:palette-bold-duotone'
      default:
        return 'solar:design-bold-duotone'
    }
  }

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
            <Icon icon="solar:palette-bold-duotone" className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Creative Portfolio
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-futura font-bold text-gray-900 dark:text-white mb-6">
            Design Work
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 font-lora max-w-3xl mx-auto mb-8">
            A showcase of UI/UX designs, web interfaces, and graphic design projects that blend 
            creativity with functionality to deliver exceptional user experiences.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 capitalize ${
                  selectedCategory === category
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Icon 
                  icon={category === 'all' ? 'solar:gallery-bold-duotone' : getCategoryIcon(category)} 
                  className="w-4 h-4" 
                />
                <span>{category === 'all' ? 'All Designs' : category}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Designs Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredDesigns.map((design, index) => (
              <motion.div
                key={design.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => setSelectedDesign(design)}
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-800">
                  <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={design.thumbnail}
                      alt={design.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon 
                        icon={getCategoryIcon(design.category)} 
                        className="w-5 h-5 text-gray-600 dark:text-gray-400" 
                      />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {design.category}
                      </span>
                    </div>
                    
                    <h3 className="font-futura font-bold text-xl text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {design.title}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Click to view details
                      </span>
                      <Icon 
                        icon="solar:arrow-right-bold-duotone" 
                        className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-200" 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredDesigns.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Icon icon="solar:gallery-bold-duotone" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No designs found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try selecting a different category to see more designs.
            </p>
          </motion.div>
        )}

        {/* Design Detail Modal */}
        <AnimatePresence>
          {selectedDesign && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedDesign(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        icon={getCategoryIcon(selectedDesign.category)} 
                        className="w-6 h-6 text-gray-600 dark:text-gray-400" 
                      />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {selectedDesign.category}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedDesign(null)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus-ring"
                    >
                      <Icon icon="solar:close-square-bold-duotone" className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-futura font-bold text-gray-900 dark:text-white mb-4">
                        {selectedDesign.title}
                      </h2>
                    </div>

                    <div className="aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                      <img
                        src={selectedDesign.thumbnail}
                        alt={selectedDesign.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.a
                        href={selectedDesign.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center justify-center space-x-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors focus-ring"
                      >
                        <Icon icon="solar:external-link-bold-duotone" className="w-5 h-5" />
                        <span>View Full Project</span>
                      </motion.a>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedDesign(null)}
                        className="inline-flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus-ring"
                      >
                        <Icon icon="solar:arrow-left-bold-duotone" className="w-5 h-5" />
                        <span>Back to Gallery</span>
                      </motion.button>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Project Details
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Category</div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {selectedDesign.category}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            Completed
                          </div>
                        </div>
                      </div>
                    </div>
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

export default Designs