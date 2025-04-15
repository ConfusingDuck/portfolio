import React from 'react';
import { motion } from 'framer-motion';
import { config } from '../../config';

const PUBLIC_URL = process.env.PUBLIC_URL;

const About = () => {
  const skills = [
    "Full-Stack Development",
    "Electronics",
    "Robotics",
    "FPGA"
  ];

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const skillVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: i => ({ 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.3
      }
    }),
    hover: { 
      scale: 1.05,
      backgroundColor: "var(--color-primary-200)",
      color: "var(--color-primary-900)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section id="about" className="section min-h-screen flex items-center">
      <div className="container">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Hi, I'm <span className="text-primary-500">Raymond</span>
            </h1>
            <motion.p className="mb-8 text-gray-700 dark:text-gray-300">
              I'm passionate about building applications that solve real-world problems. 
              With experience in both front-end and back-end development, as well as machine learning,
              I love creating innovative solutions that make a difference.
            </motion.p>
            <motion.div className="flex flex-wrap gap-4">
              <motion.a
                href="#contact"
                className="btn-primary"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Contact Me
              </motion.a>
              <motion.a
                href="#coding-projects"
                className="btn-secondary"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                View Projects
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative h-72 md:h-96 mx-auto w-full max-w-md"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="absolute inset-0 bg-primary-200 dark:bg-primary-900 rounded-full transform translate-x-4 translate-y-4"
            />
            <motion.div className="absolute inset-0 overflow-hidden rounded-full">
              <motion.img
                src={config.getImagePath('/images/headshot.png')}
                alt="Profile"
                className="rounded-full object-cover w-full h-full border-4 border-primary-500 relative z-10"
                variants={imageVariants}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 