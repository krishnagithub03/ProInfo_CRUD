import { useEffect, useState } from "react"
import TaskBox  from "../components/TaskBox"
import TaskForm from "../components/TaskForm";
const Home = () => {
  const [tasks,setTasks] = useState([]);

  useEffect(()=>{
    const fetchTasks = async () =>{
      const res = await fetch('http://localhost:8000/');
      const json = await res.json();

      if(res.ok){
        // console.log(json);
        setTasks(json);
      }
    };
    fetchTasks()
  },[]);

  return (
    <div className="home">
    <div className="tasks">
      {tasks && tasks.map(task=>(
        <TaskBox key={task.id} task={task} />
      ))}
    </div>
    <TaskForm />
    </div>
  )
}

export default Home
