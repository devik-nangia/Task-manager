import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import delIcon from './delete.svg';
import add from './add.svg'

export default function App() {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskSubmitSuccessful, setTaskSubmitSuccessful] = useState();
  const [taskError, setTaskError] = useState();

  const handleChange = (e) => {
    setTaskName(e.target.value);
  };

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/tasks')
      .then((response) => {
        setTasks(response.data.tasks);
      })
      .catch(error => console.log(error));
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/tasks', {
        name: taskName,
      });
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setTaskSubmitSuccessful(true);
      setTaskError(false);
      setTaskName('');
    } catch (error) {
      console.log(error);
      setTaskError(true);
      setTaskSubmitSuccessful(false);
    }
  };

  const deleteTask = async (taskID) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/tasks/${taskID}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskID));
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="task-form border-2 p-5 w-full h-screen flex flex-col justify-center items-center">
      <div className="md:w-1/2 w-full lg:w-1/3 absolute top-[20%] p-5">
        <h1 className='text-center mb-3 text-4xl font-bold'>Task Manager</h1>
        <form className='flex justify-between'>
          <input
            type="text"
            onChange={handleChange}
            placeholder="eg: clean bedroom"
            value={taskName}
            className="border w-full border-1 border-black p-1 focus:outline-none"
          />
          <button type="submit" onClick={addTask} className="border bg-slate-600 text-white px-3">
            <img src={add}></img>
          </button>
        </form>
        {taskError && <h1 className="text-red-500">Sorry! could not add task</h1>}
        {taskSubmitSuccessful && <h1 className="text-green-500">Task added!</h1>}
        {tasks.map((task) => (
          <div
            key={task._id}
            className="task-item flex items-center justify-between border-b py-2 cursor-pointer"
            onClick={() => navigate(`/${task._id}`)}
          >
            <h1 className={task.completed ? "line-through" : ""}>{task.name}</h1>
            <img
              src={delIcon}
              alt="Delete Task"
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(task._id);
              }}
              className="cursor-pointer w-5 h-5 ml-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

