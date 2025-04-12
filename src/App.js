import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/layout/Header';
import About from './components/sections/About';
import CodingProjects from './components/sections/CodingProjects';
import HardwareProjects from './components/sections/HardwareProjects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

function App() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <About />
            <CodingProjects />
            <HardwareProjects />
            <Skills />
            <Contact />
          </main>
          <Footer />
          
          <AnimatePresence>
            {showScrollButton && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 p-3 rounded-full bg-primary-500 text-white shadow-lg z-50 hover:bg-primary-600 transition-colors"
                aria-label="Scroll to top"
              >
                <FiArrowUp className="w-6 h-6" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
