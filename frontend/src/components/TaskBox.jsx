import {useState, useContext} from 'react'
import { Copy, ClipboardCheck } from 'lucide-react';
import { TaskContext } from '../context/taskContext';
import { AuthContext } from '../context/AuthContext';

const TaskBox = ({task}) => {
    const [isHovered, setIsHovered] = useState(false);
    const {user} = useContext(AuthContext);

    const copyToClip = () =>{
         try {
          navigator.clipboard.writeText(task._id);
          alert("Copied the Clipboard");
        } catch {
          alert("Invalid Request");
        }
    }
    const {dispatch} = useContext(TaskContext);
    const handleDelete = async()=>{ 
      if(!user){
        return;
      }
      try{
       const res = await fetch(`http://localhost:8000/${task._id}`,{
            method:'DELETE',
            headers:{
            'Authorization' : `Bearer ${user.token}`
            }
        })

        const json = await res.json();

        if(res.ok){
            dispatch({type:'DELETE_TASK',payload:json});
            console.log('task Deleted',json);
        }
      } catch(err){
        console.error(err);
      }
    }
  return (
    <div className='task-details'>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p>{task._id}
        <p className='copy'>Copy
        <span 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {isHovered ? (
                        <Copy onClick={copyToClip} size={15} />
                    ) : (
                        <Copy onClick={copyToClip} size={15} />
                    )}
                </span>
        </p>
        </p>
        
        <button className='btn' onClick={handleDelete}>Delete</button>
    </div>
  )
}
export default TaskBox
