import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const {user} = useContext(AuthContext);

  const handleClick = () => {
    logout()
  }
  return (
    <header>
        <div className="container">
            <Link to="/">
                <h1>CRUD App</h1>
            </Link>
            <nav>
          {user && (
            <div>
            <span className='navemail'>{user.email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
          )}
          {!user && (<div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            </div>
          )}
            </nav>

        </div>
    </header>
  )
}

export default Navbar
