import {useState} from 'react'
import { Copy, ClipboardCheck } from 'lucide-react';

const TaskBox = ({task}) => {
    const [isHovered, setIsHovered] = useState(false);
    const copyToClip = () =>{
         try {
          navigator.clipboard.writeText(task._id);
          alert("Copied the Clipboard");
        } catch {
          alert("Invalid Request");
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
        
        <button className='btn'>Delete</button>
    </div>
  )
}
export default TaskBox
