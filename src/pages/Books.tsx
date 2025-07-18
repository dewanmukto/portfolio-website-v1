import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'
import booksData from '../../data/books.json'

interface Book {
  title: string
  cover: string
  blurb: string
  metadata: {
    category: string
    genres: string[]
    yearWritten: number
    yearPublished: number
    pages: number | null
    isbns: string[]
  }
  purchaseLinks: Array<{
    vendor: string
    edition: string
    price: string
    region: string
  }>
}

const Books: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [filter, setFilter] = useState<'all' | 'fiction' | 'non-fiction'>('all')

  const books = booksData as Book[]
  
  const filteredBooks = books.filter(book => {
    if (filter === 'all') return true
    return book.metadata.category.toLowerCase() === filter.replace('-', ' ')
  })

  const categories = ['all', 'fiction', 'non-fiction']

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
            <Icon icon="solar:book-bold-duotone" className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Published Works
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-futura font-bold text-gray-900 dark:text-white mb-6">
            My Books
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 font-lora max-w-3xl mx-auto mb-8">
            A collection of published works spanning fiction and non-fiction, exploring themes of 
            psychology, technology, language, and the human experience.
          </p>

          {/* Filter Tabs */}
          <div className="flex justify-center space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg inline-flex">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category as any)}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 capitalize ${
                  filter === category
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {category === 'all' ? 'All Books' : category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Books Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => setSelectedBook(book)}
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-800">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        book.metadata.category === 'Fiction'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                          : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      }`}>
                        {book.metadata.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {book.metadata.yearPublished}
                      </span>
                    </div>
                    
                    <h3 className="font-futura font-bold text-xl text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {book.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 font-lora text-sm line-clamp-3 mb-4">
                      {book.blurb}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {book.metadata.genres.slice(0, 3).map((genre) => (
                        <span
                          key={genre}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      {book.metadata.pages && (
                        <span className="flex items-center space-x-1">
                          <Icon icon="solar:document-bold-duotone" className="w-4 h-4" />
                          <span>{book.metadata.pages} pages</span>
                        </span>
                      )}
                      <span className="flex items-center space-x-1">
                        <Icon icon="solar:shop-bold-duotone" className="w-4 h-4" />
                        <span>{book.purchaseLinks.length} vendors</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Book Detail Modal */}
        <AnimatePresence>
          {selectedBook && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedBook(null)}
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
                      <Icon icon="solar:book-bold-duotone" className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Book Details
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedBook(null)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus-ring"
                    >
                      <Icon icon="solar:close-square-bold-duotone" className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <img
                        src={selectedBook.cover}
                        alt={selectedBook.title}
                        className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                      />
                    </div>

                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                            selectedBook.metadata.category === 'Fiction'
                              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                              : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          }`}>
                            {selectedBook.metadata.category}
                          </span>
                        </div>
                        
                        <h2 className="text-3xl font-futura font-bold text-gray-900 dark:text-white mb-4">
                          {selectedBook.title}
                        </h2>
                        
                        <p className="text-gray-600 dark:text-gray-400 font-lora leading-relaxed">
                          {selectedBook.blurb}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Written</div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {selectedBook.metadata.yearWritten}
                          </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Published</div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {selectedBook.metadata.yearPublished}
                          </div>
                        </div>
                        {selectedBook.metadata.pages && (
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pages</div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {selectedBook.metadata.pages}
                            </div>
                          </div>
                        )}
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">ISBNs</div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {selectedBook.metadata.isbns.length || 'N/A'}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Genres</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedBook.metadata.genres.map((genre) => (
                            <span
                              key={genre}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Purchase Options</h3>
                        <div className="space-y-3">
                          {selectedBook.purchaseLinks.map((link, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                            >
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {link.vendor}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  {link.edition} • {link.region}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-gray-900 dark:text-white">
                                  {link.price}
                                </div>
                              </div>
                            </div>
                          ))}
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

export default Books