import { useEffect, useContext } from "react"
import TaskBox  from "../components/TaskBox"
import TaskForm from "../components/TaskForm";
import { TaskContext } from "../context/taskContext";
import { AuthContext } from "../context/AuthContext";
const Home = () => {
  // const [tasks,setTasks] = useState([]);

  const {tasks, dispatch} = useContext(TaskContext);
  const {user} = useContext(AuthContext);

  useEffect(()=>{
    const fetchTasks = async () =>{
      try{
      const res = await fetch('http://localhost:8000/',{
        headers: {
          'Authorization' : `Bearer ${user.token}`
        }
      });
      const json = await res.json();

      if(res.ok){
        console.log(json);
        dispatch({type:'GET_TASKS',payload:json});
        // setTasks(json);
      }
    } catch(err){
      console.error(err);
    }
  };
  if(user){
  fetchTasks()
  }
  },[dispatch,user]);

  return (
    <div className="home">
    <div className="tasks">
      {tasks && tasks.map((task)=>(
        <TaskBox key={task._id} task={task} />
      ))}
    </div>
    <TaskForm />
    </div>
  )
}

export default Home
