import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Books from './pages/Books'
import Designs from './pages/Designs'
import Videos from './pages/Videos'
import Employment from './pages/Employment'
import Contact from './pages/Contact'

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/designs" element={<Designs />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/employment" element={<Employment />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}

export default App