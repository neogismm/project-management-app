'use client';

import { useEffect, useState } from 'react';
import { fetchProjects } from '../../services/api';
import Link from 'next/link';
import AddProjectButton from '@/components/AddProjectButton';
import AddProjectForm from '@/components/AddProjectForm';
import ProjectModal from '@/components/project-modal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    try {
      const { data } = await fetchProjects();
      setProjects(data);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error(err);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const hideForm = () => {
    setShowForm(false);
  };

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setModalOpen(false);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className='w-full flex justify-end items-center p-4'>
        <AddProjectButton onClick={toggleForm} />
      </div>
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <h1 className='text-3xl font-bold'>Projects</h1>
        {projects.length > 0 ? (
          <ul>
            {projects.map((project) => (
              <li key={project._id} onClick={() => handleOpenModal(project)} className="text-blue-500 underline cursor-pointer">
                {project.name}
              </li>
            ))}
          </ul>
        ) : (
          <div>No projects found</div>
        )}
        {showForm && <AddProjectForm onHideForm={hideForm} onProjectAdded={getProjects} />}
      </div>
      {modalOpen && <ProjectModal project={selectedProject} onClose={handleCloseModal} />}
    </>
  );
}

export default Projects;