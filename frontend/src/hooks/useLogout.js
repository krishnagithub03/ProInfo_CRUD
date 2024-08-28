import { useContext } from 'react';
import { AuthContext } from './../context/AuthContext';
import { TaskContext } from '../context/taskContext';

export const useLogout = () => {
  const { dispatch } = useContext(AuthContext)
  const {dispatch : taskDispatch} = useContext(TaskContext);

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    taskDispatch({ type: 'GET_TASKS', payload : null});
  }

  return { logout }
}