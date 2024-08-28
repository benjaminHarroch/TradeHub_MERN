import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/SearchBAr.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.length > 0) {
      axios.get('https://tradehub-mern.onrender.com/auth/getAlluser')
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => console.error('Error fetching users:', error));
    }
  }, [searchQuery]);

  useEffect(() => {
    setFilteredUsers(
      users.filter(user =>
        user.userName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsOpen(true);
  };

  const handleUserClick = (userId) => {
    navigate(`/Profile/${userId}`);
    setSearchQuery('');
    setIsOpen(false);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearchChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Delay to handle click inside the dropdown
      />
      {isOpen && filteredUsers.length > 0 && (
        <div className="search-results">
          {filteredUsers.map(user => (
            <div
              key={user._id}
              className="search-result-item"
              onClick={() => handleUserClick(user._id)}
            >
              <img style={{height:'30px',width:'30px'}}src={user.profilepic} alt={user.userName} className="user-avatar" />
              <span>{user.userName}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;