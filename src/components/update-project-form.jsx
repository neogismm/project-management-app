import React from 'react';
import { updateProject } from '@/services/api';
import { useForm } from 'react-hook-form';

export default function UpdateProjectForm({ project, description, id, onFormSubmitSuccess }) {

  const { register, handleSubmit, formState:{ errors } } = useForm();
  const onSubmit = async (data) => {
    try {
      const projectData = {
        name: data.name,
        description: data.description
      };
      const response = await updateProject(id, projectData);
      console.log(response);
      onFormSubmitSuccess();
    }
    catch (error) {
      console.error('Error updating project', error);
    }
  }

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="newProjectName" className="block text-sm font-medium leading-6 text-gray-900">
          New name
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder={project}
            {...register('name', {required: 'Project name is required'})}
          />
          {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
        </div>
        <label htmlFor="newProjectName" className="block text-sm font-medium leading-6 text-gray-900">
          Description
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder={description}
            {...register('description', {required: 'Description is required'})}
          />
          {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
        </div>
        <div className='px-4 py-3'>
          <button type='submit' className='mt-3 inline-flex w-full justify-center rounded-md bg-green-200 px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-100 sm:mt-0 sm:w-auto"'>
          Submit
          </button>
        </div>
      </form>
    )
  }
  