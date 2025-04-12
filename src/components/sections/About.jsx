import React from 'react';
import { motion } from 'framer-motion';

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
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
    <section id="about" className="section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col md:flex-row items-center gap-8"
        >
          <motion.div 
            className="w-full md:w-1/3"
            variants={itemVariants}
          >
            <div className="relative w-64 h-64 mx-auto md:mx-0">
              <motion.div
                className="absolute inset-0 rounded-full bg-primary-500 opacity-20"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1.2 }}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                viewport={{ once: true }}
              />
              <motion.img
                src="/images/headshot.png"
                alt="Profile"
                className="rounded-full object-cover w-full h-full border-4 border-primary-500 relative z-10"
                variants={imageVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              />
            </div>
          </motion.div>
          
          <div className="w-full md:w-2/3">
            <motion.h2 
              className="heading inline-block relative"
              variants={itemVariants}
            >
              About Me
              <motion.div 
                className="absolute -bottom-1 left-0 h-1 bg-primary-500" 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </motion.h2>
            
            <motion.p 
              className="text-lg mb-4"
              variants={itemVariants}
            >
              Hi guys! I'm a passionate software developer and hardware enthusiast with a strong background in both fields.
              I love creating innovative solutions that bridge the gap between software and hardware.
            </motion.p>
            
            <motion.p 
              className="text-lg mb-4"
              variants={itemVariants}
            >
              With expertise in full-stack development and hands-on experience in electronics and robotics,
              I bring a unique perspective to every project I work on.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-2 mt-6"
              variants={containerVariants}
            >
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  custom={index}
                  variants={skillVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-100 rounded-full text-sm cursor-pointer"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 