import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './Pages/Home';
import Offers from './Pages/Offers';
import CandidateDash from './Pages/CandidateDash';
import UpdateCandidate from './Pages/UpdateCandidate';
import CandidateDemands from './Pages/CandidateDemands';
import OneDemand  from './Pages/OneDemand';
import OneOffer from './Pages/OneOffer';
import EmployerDash from './Pages/EmployerDash';
import UpdateEmployer from './Pages/UpdateEmployer';
import Signup from './Pages/Signup';
import Login from './Components/Login';
import NotFound from './Pages/NotFound';
import Nav from './Components/Nav';
import Companies from './Pages/Companies';
import Demands from './Pages/Demands';
import Footer from './Components/Footer';
import { useEffect, useState } from 'react';
import userContext from './Controllers/userContext';
import { check } from './Controllers/authControllers';
import Waiting from './Components/Waiting';

function App() {
  const [userType,setUserType]=useState(null);
  const [id,setId]=useState(null);
  useEffect(()=>{
    check(setUserType,setId)
  },[])
  return (
    <div className="App">
      {
        userType!==null?
      <BrowserRouter>
      <userContext.Provider value={{userType,id,setUserType}}>
        <Login/>
        <Nav/>
          <Routes>
            <Route index element={<Home/>}/>
            <Route path='signup' element={<Signup/>}/>
            <Route path='offers'>
              <Route index element={<Offers/>}/>
              <Route path=':id' element={<OneOffer/>}/>
              <Route path='*' element={<NotFound/>}/>
            </Route>
            <Route path='companies' element={<Companies/>}/>
            <Route path='Candidate'>
              <Route index element={<CandidateDash/>}/>
              <Route path='update' element={<UpdateCandidate/>}/>
              <Route path='demands' element={<CandidateDemands/>}/>
              <Route path='*' element={<NotFound/>}/>
            </Route>
            <Route path='Employer'>
              <Route index element={<EmployerDash/>}/>
              <Route path='update' element={<UpdateEmployer/>}/>
              <Route path='demands'>
                <Route index element={<Demands/>}/>
                <Route path=':id' element={<OneDemand/>}/>
                <Route path='*' element={<NotFound/>}/>
              </Route>
              <Route path='*' element={<NotFound/>}/>
            </Route>
          </Routes>
          <Footer/>
        </userContext.Provider>
      </BrowserRouter>:<Waiting/>
      } 
    </div>
  );
}

export default App;
