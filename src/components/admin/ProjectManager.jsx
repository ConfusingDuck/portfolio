import React, { useState, useEffect } from 'react';
import { fetchProjects, deleteProject } from '../../utils/dbManager';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please make sure the server is running.');
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await deleteProject(id);
      // Refresh projects list after deletion
      setRefreshTrigger(prev => prev + 1);
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Failed to delete project. Check if the server is running.');
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading projects...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>{error}</p>
        <button
          onClick={() => setRefreshTrigger(prev => prev + 1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Project Manager</h1>
      
      {projects.length === 0 ? (
        <p>No projects found. Add some projects to get started.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Technologies</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{project.id}</td>
                  <td className="py-2 px-4 border-b">{project.title}</td>
                  <td className="py-2 px-4 border-b">{project.description.substring(0, 50)}...</td>
                  <td className="py-2 px-4 border-b">{project.technologies}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectManager; 