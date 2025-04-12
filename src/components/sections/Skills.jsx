import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiJavascript,
  SiReact,
  SiPython,
  SiNodedotjs,
  SiArduino,
  SiRaspberrypi
} from 'react-icons/si';

const skills = [
  { name: 'JavaScript', icon: SiJavascript, category: 'Languages', color: '#F7DF1E', description: 'Modern ES6+ JavaScript for frontend and backend development' },
  { name: 'React', icon: SiReact, category: 'Frontend', color: '#61DAFB', description: 'Building interactive user interfaces with React and its ecosystem' },
  { name: 'Python', icon: SiPython, category: 'Languages', color: '#3776AB', description: 'Data analysis, automation, and backend development' },
  { name: 'Node.js', icon: SiNodedotjs, category: 'Backend', color: '#339933', description: 'Server-side JavaScript for building scalable applications' },
  { name: 'Arduino', icon: SiArduino, category: 'Hardware', color: '#00979D', description: 'Microcontroller programming for IoT and embedded systems' },
  { name: 'Raspberry Pi', icon: SiRaspberrypi, category: 'Hardware', color: '#C51A4A', description: 'Single-board computer for various hardware projects' },
];

const categories = [...new Set(skills.map(skill => skill.category))];

const SkillCard = ({ skill }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <motion.div
      className="relative h-40 w-full perspective-1000"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "-50px" }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <AnimatePresence initial={false}>
        {!isFlipped ? (
          <motion.div
            key="front"
            className="absolute inset-0 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow flex items-center"
            initial={{ rotateY: 180 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 180 }}
            transition={{ duration: 0.4 }}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex items-center space-x-4">
              <motion.div 
                className="p-3 rounded-lg"
                style={{ backgroundColor: `${skill.color}20` }}
                whileHover={{ 
                  backgroundColor: `${skill.color}40`,
                  scale: 1.05
                }}
                transition={{ duration: 0.2 }}
              >
                <skill.icon 
                  className="w-8 h-8" 
                  style={{ color: skill.color }}
                />
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {skill.name}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {skill.category}
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            className="absolute inset-0 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex items-center justify-center"
            initial={{ rotateY: -180 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: -180 }}
            transition={{ duration: 0.4 }}
            style={{ 
              backfaceVisibility: "hidden",
              background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}05)`
            }}
          >
            <p className="text-gray-700 dark:text-gray-300 text-center">
              {skill.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div className="relative inline-block mb-10" variants={categoryVariants}>
            <motion.h2 className="heading">Skills & Expertise</motion.h2>
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-primary-500"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </motion.div>
          
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 mb-12"
            variants={categoryVariants}
          >
            Hover or tap on a skill card to see more details
          </motion.p>

          <div className="space-y-16">
            {categories.map((category) => (
              <motion.div 
                key={category}
                variants={categoryVariants}
              >
                <motion.div className="relative inline-block mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {category}
                  </h3>
                  <motion.div
                    className="absolute -bottom-2 left-0 h-0.5 bg-primary-400/70"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  />
                </motion.div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <SkillCard key={skill.name} skill={skill} />
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 