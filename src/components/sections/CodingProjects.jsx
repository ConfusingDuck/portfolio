import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../shared/ProjectCard';
import { API_BASE_URL, config } from '../../config';

// Keeping the hardcoded projects as a fallback
const fallbackProjects = [
  {
    title: 'Just-Wash AI',
    description: 'A full-stack web app, to make washing hands more fun and engaging.',
    technologies: ['Typescript', 'Next.js', 'MongoDB', 'Flask', 'OpenCV'],
    image: config.getImagePath('/images/justwash.png'),
    github: 'https://github.com/hiatus770/just_wash_backend',
    demo: 'http://devpost.com/software/just-wash',
  },
  {
    title: 'Portfolio Website',
    description: 'My personal portfolio website built with React and SQL backend.',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'SQL', 'Express'],
    image: config.getImagePath('/images/portfolio.png'),
    github: 'https://github.com/ConfusingDuck/portfolio',
    demo: 'https://confusingduck.github.io/portfolio',
  }
];

const CodingProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Skip API call if we're in production (GitHub Pages)
        if (!API_BASE_URL) {
          console.log('Using fallback projects in production environment');
          setProjects(fallbackProjects);
          setLoading(false);
          return;
        }

        // Try to fetch from the backend API with a timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), config.apiTimeout);
        
        const response = await fetch(`${API_BASE_URL}/projects`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        let data = await response.json();
        
        // Parse technologies from string to array if needed
        data = data.map(project => ({
          ...project,
          technologies: typeof project.technologies === 'string' 
            ? project.technologies.split(',').map(tech => tech.trim())
            : project.technologies || [],
          github: project.github_url,
          demo: project.live_url,
          // Fix image path for GitHub Pages
          image: config.getImagePath(project.image_url)
        }));
        
        setProjects(data.length > 0 ? data : fallbackProjects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
        // Use fallback data on error
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Get all unique technologies across all projects
  const allTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies))
  );

  const filteredProjects = projects.filter((project) =>
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
          
          {loading ? (
            <p className="text-center py-10">Loading projects...</p>
          ) : error && API_BASE_URL ? (
            <div className="text-center py-10">
              <p className="text-red-500 mb-2">Error connecting to the database. Showing fallback projects.</p>
              <p className="text-sm text-gray-500">({error})</p>
            </div>
          ) : (
            <>
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
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.title || index} project={project} />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CodingProjects; 