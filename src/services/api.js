import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api' });

export const fetchProjects = () => API.get('/projects');
export const createProject = (project) => API.post('/projects', project);
export const updateProject = (id, project) => API.put(`/projects/${id}`, project);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

export const fetchTasks = () => API.get('/tasks');
export const fetchTasksByProject = (projectId) => API.get(`/tasks/project/${projectId}`);
export const createTask = (task) => API.post('/tasks', task);
export const updateTask = (id, task) => API.put(`/tasks/${id}`, task);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
