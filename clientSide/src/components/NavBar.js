import React, { useContext, useState,useEffect } from 'react';
import './css/NavBar.css';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import UserContext from './context/userContext';
import NestedList from './NestedList';
import SearchBar from './SearchBar';
import Notification from './Notification';

function NavBar({ color }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [showListMenu, setShowListMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Handle click outside notification box to close it
  const handleClickOutside = (event) => {
    if (!event.target.closest('.notification-icon')) {
      setShowNotification(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="NavBar-container" onMouseLeave={() => setShowListMenu(false)}>
      <div className={'NavBar-LeftSide'} style={{ backgroundColor: color }}>
        <Avatar
          onMouseEnter={() => setShowListMenu(true)}
          onClick={() => navigate(`/Profile/${user.user_id}`)}
          sx={{ cursor: 'pointer' }}
          alt="User Profile"
          src={user.profilepic}
        >
          B
        </Avatar>
        <div
          onMouseEnter={() => setShowListMenu(true)}
          style={showListMenu ? { position: 'absolute', top: '38px', left: '70px' } : { display: 'none' }}
        >
          <NestedList />
        </div>
        <i className="fas fa-bell"></i> {/* Message icon */}
        <div
          className="notification-icon"
          onClick={() => setShowNotification((prev) => !prev)}
          style={{ position: 'relative', cursor: 'pointer' }}
        >
          <i className="fas fa-envelope"></i> {/* Notification icon */}
          {showNotification && (
            <div
              style={{
                position: 'absolute',
                top: '30px',
                right: '0',
                zIndex: 1000,
                backgroundColor: 'white',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
              }}
            >
              <Notification />
            </div>
          )}
        </div>
      </div>

      <div className={'NavBar-MidleSide'} style={{ backgroundColor: color }}>
        <i onClick={() => navigate(`/HomePage`)} className="fas fa-home"></i> {/* Home icon */}
        <i onClick={() => navigate(`/journalTrader/${user.user_id}`)} className="fas fa-chart-bar"></i> {/* Chart icon */}
        <i onClick={() => navigate(`/stockNews`)} className="fa fa-newspaper"></i> {/* News icon */}
      </div>

      <div className={'NavBar-RightSide'} style={{ backgroundColor: color }}>
        <SearchBar />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/tradehub-ec4d8.appspot.com/o/profile_pics%2FBEARISH%20PIN%20BAR.png?alt=media&token=e5b096e0-28d2-4cd7-8b86-a80e69ef27f1"
          alt="logo"
        /> {/* Logo */}
      </div>
    </div>
  );
}

export default NavBar;
