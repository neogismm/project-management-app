'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchTasksByProject } from '../../../services/api';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const getTasks = async () => {
        const { data } = await fetchTasksByProject(id);
        setTasks(data);
      };
      getTasks();
    }
  }, [id]);

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
