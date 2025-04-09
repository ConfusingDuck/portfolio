import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/layout/Header';
import About from './components/sections/About';
import CodingProjects from './components/sections/CodingProjects';
import HardwareProjects from './components/sections/HardwareProjects';
import Skills from './components/sections/Skills';
// import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
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
            {/*<Contact /> FOR NOW*/}
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
