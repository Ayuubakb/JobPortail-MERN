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
import AddOffer from './Pages/AddOffer';
import Signup from './Pages/Signup';
import Login from './Components/Login';
import NotFound from './Pages/NotFound';
import Nav from './Components/Nav';
import Companies from './Pages/Companies';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
            <Route path='demands'>
              <Route index element={<CandidateDemands/>}/>
              <Route path=':id' element={<OneDemand/>}/>
              <Route path='*' element={<NotFound/>}/>
            </Route>
            <Route path='*' element={<NotFound/>}/>
          </Route>
          <Route path='Employer'>
            <Route index element={<EmployerDash/>}/>
            <Route path='update' element={<UpdateEmployer/>}/>
            <Route path='add' element={<AddOffer/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
