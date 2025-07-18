import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'
import videosData from '../../data/videos.json'

interface Video {
  thumbnail: string
  video: string
}

const Videos: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const videosPerPage = 12

  const videos = videosData as Video[]
  
  const totalPages = Math.ceil(videos.length / videosPerPage)
  const startIndex = (currentPage - 1) * videosPerPage
  const currentVideos = videos.slice(startIndex, startIndex + videosPerPage)

  const getVideoId = (embedUrl: string) => {
    const match = embedUrl.match(/embed\/([^?]+)/)
    return match ? match[1] : ''
  }

  const getVideoTitle = (embedUrl: string) => {
    const videoId = getVideoId(embedUrl)
    return `Video ${videoId}`
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
            <Icon icon="solar:videocamera-bold-duotone" className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Video Content
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-futura font-bold text-gray-900 dark:text-white mb-6">
            Video Gallery
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 font-lora max-w-3xl mx-auto mb-8">
            A collection of video content showcasing creative projects, tutorials, and insights 
            into my work across various disciplines and interests.
          </p>

          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Icon icon="solar:play-bold-duotone" className="w-4 h-4" />
              <span>{videos.length} Videos</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center space-x-1">
              <Icon icon="solar:gallery-bold-duotone" className="w-4 h-4" />
              <span>Page {currentPage} of {totalPages}</span>
            </div>
          </div>
        </motion.div>

        {/* Videos Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {currentVideos.map((video, index) => (
              <motion.div
                key={`${currentPage}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-800">
                  <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={video.thumbnail}
                      alt={getVideoTitle(video.video)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Icon icon="solar:play-bold-duotone" className="w-6 h-6 text-gray-900 dark:text-white ml-1" />
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                      {getVideoTitle(video.video)}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Click to watch
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center items-center space-x-2 mt-12"
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-ring"
            >
              <Icon icon="solar:arrow-left-bold-duotone" className="w-5 h-5" />
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors focus-ring ${
                    currentPage === page
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-ring"
            >
              <Icon icon="solar:arrow-right-bold-duotone" className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <Icon icon="solar:videocamera-bold-duotone" className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Video Player
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedVideo(null)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus-ring"
                    >
                      <Icon icon="solar:close-square-bold-duotone" className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <iframe
                      src={selectedVideo.video}
                      title={getVideoTitle(selectedVideo.video)}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <motion.a
                      href={selectedVideo.video.replace('/embed/', '/watch?v=')}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors focus-ring"
                    >
                      <Icon icon="solar:youtube-bold-duotone" className="w-5 h-5" />
                      <span>Watch on YouTube</span>
                    </motion.a>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedVideo(null)}
                      className="inline-flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus-ring"
                    >
                      <Icon icon="solar:arrow-left-bold-duotone" className="w-5 h-5" />
                      <span>Back to Gallery</span>
                    </motion.button>
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

export default Videos