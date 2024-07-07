import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createProject } from "@/services/api";

export default function AddProjectForm({ onProjectAdded }) {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const projectData = {
        name: data.projectName,
        description: data.description,
      };
      const response = await createProject(projectData);
      console.log("Project created successfully:", response.data);
      reset(); // Reset form fields after successful submission
      setIsFormVisible(false);
      if (onProjectAdded) {
        onProjectAdded();
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    isFormVisible && (
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto my-8">
        <div>
          <label
            htmlFor="projectName"
            className="block text-sm font-medium text-gray-700"
          >
            Project Name:
          </label>
          <input
            type="text"
            id="projectName"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black"
            {...register("projectName", {
              required: "Project Name is required",
            })}
          />
          {errors.projectName && (
            <span className="text-xs text-red-500">
              {errors.projectName.message}
            </span>
          )}
        </div>
        <div className="mt-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="description"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <span className="text-xs text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    )
  );
}
