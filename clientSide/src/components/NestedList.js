import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import MySnackbar from './MySnackbar';
import { useState ,useContext } from 'react';
import { SnackbarContext } from './context/snackBarContext';
import UserContext from './context/userContext';

export default function NestedList() {


  const Navigate=useNavigate();

  const [open, setOpen] = React.useState(true);
  const {  showSnackbar }=useContext(SnackbarContext);
  const { user }=useContext(UserContext);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Menu :
        </ListSubheader>
      }
    >
      <ListItemButton onClick={()=>{
        showSnackbar(` by by ${user.userName}  ,hope see you soon ! `);
        localStorage.clear();
        Navigate('/')}
        }>
            <ListItemIcon>
               <LogoutIcon />
            </ListItemIcon>
          <ListItemText primary="Logout" />
      </ListItemButton>

      <ListItemButton>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton>

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
