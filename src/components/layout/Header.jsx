import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { isDarkMode, toggleTheme } = useTheme();

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Coding Projects', href: '#coding-projects' },
    { label: 'Hardware Projects', href: '#hardware-projects' },
    { label: 'Skills', href: '#skills' },
    /*{ label: 'Contact', href: '#contact' },*/
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Determine active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  // Animation variants for logo
  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    }
  };

  // Animation variants for navigation items
  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-lg border-b border-gray-200 dark:border-gray-700' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.a
            href="#"
            className="text-2xl font-bold text-gray-800 dark:text-white relative group"
            initial="hidden"
            animate="visible"
            variants={logoVariants}
          >
            <span className="group-hover:text-primary-500 transition-colors duration-300">THE</span>{" "}
            <span className="group-hover:text-primary-500 transition-colors duration-300 delay-75">RAYMOND</span>{" "}
            <span className="group-hover:text-primary-500 transition-colors duration-300 delay-150">STACK</span>
            <motion.div 
              className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full" 
              transition={{ duration: 0.3, ease: "easeInOut" }}
              animate={{ width: isScrolled ? "100%" : "0%" }}
            />
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, i) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <motion.a
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={navVariants}
                  key={item.href}
                  href={item.href}
                  className={`relative px-1 py-2 transition-colors ${
                    isActive 
                      ? 'text-primary-500 dark:text-primary-400 font-medium' 
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.a>
              );
            })}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, rotate: isDarkMode ? -15 : 15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav 
            className="md:hidden py-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, i) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={item.href}
                  href={item.href}
                  className={`block py-2 relative ${
                    isActive 
                      ? 'text-primary-500 dark:text-primary-400 font-medium' 
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeMobileSection"
                      className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary-500"
                    />
                  )}
                </motion.a>
              );
            })}
          </motion.nav>
        )}
      </div>
    </header>
  );
};

export default Header; 