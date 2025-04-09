import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiJavascript
} from 'react-icons/si';

const skills = [
  { name: 'JavaScript', icon: SiJavascript, category: 'Languages', color: '#F7DF1E' },
  
];

const categories = [...new Set(skills.map(skill => skill.category))];

const SkillCard = ({ skill }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center space-x-4">
        <div 
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${skill.color}20` }}
        >
          <skill.icon 
            className="w-8 h-8" 
            style={{ color: skill.color }}
          />
        </div>
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
  );
};

const Skills = () => {
  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="heading">Skills & Expertise</h2>
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                  {category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <SkillCard key={skill.name} skill={skill} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 