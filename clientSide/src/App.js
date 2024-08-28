import './App.css';
import {BrowserRouter,Routes, Route } from 'react-router-dom';
import {Login} from './components/Login';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import UserContext from './components/context/userContext';
import {useState,useEffect} from 'react';
import Profile from './components/Profile/Profile';
import { SnackbarProvider } from './components/context/snackBarContext';
import Register from './components/Register/Register';
import JournalTraderPage from './components/JournalTraderPage';
import StockNews from './components/StockNews';
import StockWatcher from './components/Stockwatcher';
import '@fortawesome/fontawesome-free/css/all.min.css';




function App() {


  const [user,setUser]=useState({
    user_id:'',
    userName:'',
    profilepic:'',
    posts:[],
    token:'',
    trades:[]
  })

  useEffect(()=>{

    // Retrieve user from local storage
   const res = JSON.parse(localStorage.getItem('user-detaille'));

    if(!user.id&&res){
      setUser({            
        user_id:res._id,
        userName:res.userName,
        profilepic:res.profilepic,
        posts:res.posts,
        token:res.token,
        trades:res.trades
      })

    }

  },[])

  return (
    <div className="App">

      <UserContext.Provider value={{user,setUser}} >

         <SnackbarProvider>
            <BrowserRouter>

                    <Routes>
                      
                          
                          <Route  path="/" element={<Login />} />
                          <Route path="/HomePage" element={<>
                          <NavBar /> 
                          <StockWatcher />
                          <HomePage />
                          </>} />
                          <Route path="/JournalTrader/:id" element={<>
                          <NavBar /> 
                          <JournalTraderPage />
                          </>} />
                          <Route path="/Profile/:id" element={<Profile />} />
                          <Route path="/Register" element={<Register />} />
                          <Route path="/stockNews" element={<>
                            <NavBar /> 
                            <StockNews />
                            </>} />
                        

                  </Routes>

          </BrowserRouter>
        </SnackbarProvider>

     </UserContext.Provider>
     
    </div>
  );
}

export default App;
