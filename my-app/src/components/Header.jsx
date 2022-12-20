import React from "react";
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import {useAuthContext} from '../hooks/useAuthContext'
//add context to check if user is authenticated, is so, display a Log out button, if not, Login page and Login.Register navbar

function Header() {
  const { logout } = useLogout()
  const {user} = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Notes</Link>
      </div>
      
      <nav>
      {user && (<div>
            <button onClick={handleClick}>Log out</button>
        </div> )}
        {!user && (
        <div>
            <Link to="/login"> <FaSignInAlt /> Login </Link>
            <Link to="/register"> <FaUser /> Register </Link>
        </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
