import {useState, useContext} from 'react'
import {TaskContext} from '../context/taskContext';
import { AuthContext } from '../context/AuthContext';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [id, setId] = useState('');
    const [error,setError] = useState(null);

    const {dispatch} = useContext(TaskContext);
    const {user} = useContext(AuthContext);

    const handleUpdate = async (e) =>{
        e.preventDefault();
        if(!user){
            setError("You Must be logged in");
            return;
        }
        if(!id){
            setError('Id is required for updation');
        }
        const task = {title,description};
        console.log(task);

        try{
        const res = await fetch(`https://proinfo-crud.onrender.com/${id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
                'Authorization' : `Bearer ${user.token}`
            },
            body: JSON.stringify(task)
        })

        const json = await res.json();
        if(!res.ok){
            setError(json.error);
            return;
        }
        if(res.ok){
            setError(null);
            setTitle('');
            setDescription('');
            setId('');
            dispatch({type:'UPDATE_TASK',payload:json});

            console.log('task updated',json);
        }
    } catch(err){
        console.error(err);
    }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!user){
            setError('You Must Be Logged in');
            return;
        }

        const task = {title,description};
        console.log(task);

        const res = await fetch('https://proinfo-crud.onrender.com/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization' : `Bearer ${user.token}`
            },
            body: JSON.stringify(task)
        })

        const json = await res.json();
        if(!res.ok){
            setError(json.error);
        }
        if(res.ok){
            setError(null);
            setTitle('');
            setDescription('');
            setId('');
            dispatch({type:'ADD_TASK',payload:json});

            console.log('new task added',json);
        }


    }

  return (
    <form className='create' onSubmit={id ? handleUpdate : handleSubmit}>
        <h2>Add/Update A Task</h2>

        <label>Title</label>
        <input 
        type="text"
        onChange={(e)=>setTitle(e.target.value)}
        value={title}
         />
         <label>Description</label>
        <input 
        type="text"
        onChange={(e)=>setDescription(e.target.value)}
        value={description}
         />
        <label>Id (Required for Updation)</label>
            <input 
                type="text"
                onChange={(e) => setId(e.target.value)}
                value={id}
             />
        
         
        
        <button type="submit">Add/Update Task</button>

        {error && <div className='error'>{error}</div>}
      
    </form>
  )
}

export default TaskForm
