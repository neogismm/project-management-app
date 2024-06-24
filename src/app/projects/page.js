'use client';

import { useEffect, useState } from 'react';
import { fetchProjects } from '../../services/api';
import Link from 'next/link';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getProjects = async () => {
      try {
        const { data } = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to fetch projects');
        console.error(err);
      }
    };
    getProjects();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <>
    <div className='w-full flex justify-end items-center p-4'>
      {/* to add_project button */}
    </div>
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-3xl font-bold'>Projects</h1>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <Link href={`/projects/${project._id}`} className="text-blue-500 underline cursor-pointer">
                {project.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>No projects found</div>
      )}
    </div>
    </>
  );
}

export default Projects;