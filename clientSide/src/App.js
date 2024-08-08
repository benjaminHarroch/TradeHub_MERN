
import './App.css';
import {BrowserRouter,Routes, Route } from 'react-router-dom';
import {Login} from './components/Login';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import JournalTraderPage from './components/JournalTraderPage';
import UserContext from './components/context/userContext';
import {useState,useEffect} from 'react';


function App() {

  const [user,setUser]=useState({
    user_id:'',
    userName:'',
    profilepic:'',
    posts:[],
    token:'',
    trades:[]
  })


  return (
    <div className="App">

      <UserContext.Provider value={{user,setUser}} >

            <BrowserRouter>

                    <Routes>
                      
                          
                          <Route  path="/" element={<Login />} />
                          <Route path="/HomePage" element={<>
                          <NavBar /> 
                          <HomePage />
                          </>} />
                          <Route path="/JournalTrader" element={<>
                          <NavBar /> 
                          <JournalTraderPage />
                          </>} />
                        

                  </Routes>

          </BrowserRouter>

     </UserContext.Provider>
     
    </div>
  );
}

export default App;
