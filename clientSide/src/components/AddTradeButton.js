import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, Box, TextField, MenuItem } from '@mui/material';
import './css/JournalTrader.css';  // Assuming you want to keep some custom styles
import UserContext from './context/userContext';
import axios from 'axios';

const strategies = ['ABC', 'cat in the bag', 'swing 2 week open',
   'news momentum', 'sort swing', 'investment for long duration', 'SWING'];

const AddTradeButton = ({setUserTrade,id}) => {
  const [open, setOpen] = useState(false);
  const [trade, setTrade] = useState({
    sticker: '',
    entries: '',
    exit: '',
    strategy: '',
    position: 'long',
    date: '',
  });
  const [idAuthen,setIdAuthen]=useState(true);
  const {user,setUser}=useContext(UserContext);


  function chekeIdAuthentication(){
     console.log(user.user_id)
     user.user_id!==id?setIdAuthen(false):setIdAuthen(true)
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setTrade({
      ...trade,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    axios.post(`http://localhost:8000/trade/newTrade/${id}`, trade)
        .then(res => {
            console.log('Response from db add trade button', res.data);
            
            // Update local state with the new trade
            setUserTrade(prevTrades => [...prevTrades, trade]);

            // Reset the form and close the modal
            setTrade({ sticker: '', entries: '', exit: '', strategy: '', position: 'long', date: '' });
            handleClose();
        })
        .catch(err => console.log('Error trying to save a trade in db', err));
};

  useEffect(()=>{
 chekeIdAuthentication();
  },[])

  return (
    <>
      {idAuthen&&<Button 
        variant="contained" 
        color="primary" 
        onClick={handleOpen} 
        style={{ borderRadius: '20px', padding: '10px 20px', fontSize: '16px' ,marginTop:'20px'}}>
        Add New Trade
      </Button>}
      <Modal open={open} onClose={handleClose}>
        <Box 
          component="form" 
          sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: 400, 
            bgcolor: 'background.paper', 
            boxShadow: 24, 
            p: 4, 
            borderRadius: 2,
          }}
          onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
        >
          <h2>Add New Trade</h2>
          <TextField 
            fullWidth 
            label="Sticker" 
            name="sticker" 
            value={trade.sticker} 
            onChange={handleChange} 
            margin="normal"
            required
          />
          <TextField 
            fullWidth 
            label="Entries" 
            name="entries" 
            type="number"
            value={trade.entries} 
            onChange={handleChange} 
            margin="normal"
            required
          />
          <TextField 
            fullWidth 
            label="Exit" 
            name="exit" 
            type="number"
            value={trade.exit} 
            onChange={handleChange} 
            margin="normal"
            required
          />
          <TextField 
            fullWidth 
            select 
            label="Strategy" 
            name="strategy" 
            value={trade.strategy} 
            onChange={handleChange} 
            margin="normal"
            required
          >
            {strategies.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField 
            fullWidth 
            select 
            label="Position" 
            name="position" 
            value={trade.position} 
            onChange={handleChange} 
            margin="normal"
          >
            <MenuItem value="long">Long</MenuItem>
            <MenuItem value="short">Short</MenuItem>
          </TextField>
          <TextField 
            fullWidth 
            label="Date" 
            name="date" 
            type="date" 
            InputLabelProps={{ shrink: true }}
            value={trade.date} 
            onChange={handleChange} 
            margin="normal"
            required
          />
          <Button 
            variant="contained" 
            color="primary" 
            type="submit" 
            style={{ marginTop: '20px', width: '100%' }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddTradeButton;
