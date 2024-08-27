import {useState} from 'react'

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [id, setId] = useState('');
    const [error,setError] = useState(null);

    const handleUpdate = async (e) =>{
        e.preventDefault();
        if(!id){
            setError('Id is required for updation');
            return;
        }

        const task = {title,description,id};
        console.log(task);

        const res = await fetch(`http://localhost:8000/${id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
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

            console.log('task updated',json);
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const task = {title,description};
        console.log(task);

        const res = await fetch('http://localhost:8000/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
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
        {/* <button type='submit'>Update Task</button> */}

        {error && <div className='error'>{error}</div>}
      
    </form>
  )
}

export default TaskForm
