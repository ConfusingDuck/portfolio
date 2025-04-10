import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../shared/ProjectCard';

const codingProjects = [
  {
    title: 'Just-Wash AI',
    description: 'A full-stack web app, to make washing hands more fun and engaging.',
    technologies: ['Typescript', 'Next.js', 'MongoDB', 'Flask', 'OpenCV'],
    image: '/images/justwash.png',
    github: 'https://github.com/hiatus770/just_wash_backend',
    demo: 'http://devpost.com/software/just-wash',
  },
  // ADD YOUR NEW PROJECTS HERE RAYMOND!!!
];

const allTechnologies = Array.from(
  new Set(codingProjects.flatMap((project) => project.technologies))
);

const CodingProjects = () => {
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);

  const filteredProjects = codingProjects.filter((project) =>
    selectedTechnologies.length === 0
      ? true
      : project.technologies.some((tech) => selectedTechnologies.includes(tech))
  );

  const toggleTechnology = (technology) => {
    setSelectedTechnologies((prev) =>
      prev.includes(technology)
        ? prev.filter((tech) => tech !== technology)
        : [...prev, technology]
    );
  };

  return (
    <section id="coding-projects" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="heading">Coding Projects</h2>
          
          <div className="mb-8">
            <h3 className="subheading">Filter by Technology</h3>
            <div className="flex flex-wrap gap-2">
              {allTechnologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => toggleTechnology(tech)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTechnologies.includes(tech)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CodingProjects; 