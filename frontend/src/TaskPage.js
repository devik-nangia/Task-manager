import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TaskPage() {
  const { taskID } = useParams();
  const [task, setTask] = useState(null);

  const [taskValue, setTaskValue] = useState('')

  const handleChange = (e) => {
    setTaskValue(e.target.value)
  }
  const navigate = useNavigate()

  const [isCompleted, setIsCompleted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("submitted")
    try {
      const response = await axios.patch(`http://localhost:8080/api/v1/tasks/${taskID}`, {
        name: taskValue,
        completed: isCompleted
      })
      console.log(response)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/tasks/${taskID}`)
      .then((response) => {
        setTask(response.data);
        setTaskValue(response.data.name);
      })
      .catch((error) => console.log(error));
  }, [taskID]);

  if (!task) return <h1>Loading task details...</h1>;

  return (
    <form className="task-detail p-5 flex gap-3">
      <input type="text" value={taskValue} onChange={(e) => handleChange(e)} className='focus:outline-none border border-black px-2 py-2'></input>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={(e) => setIsCompleted(e.target.checked)}
      />
      <button type="submit" onClick={handleSubmit} className='border bg-slate-600 text-white px-3'>Confirm edit</button>
    </form>
  );
}
