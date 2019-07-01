import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/misc/Home';
import UserContext from './contexts/UserContext';
import UserProfile from './components/Users/UserProfile';

function App() {
  return (
    <div className="App">
      <div>HEADER
        <div>MENU Header || Register, Login</div>
        <div>MENU inferior Header || Home, Looking for an User?</div>
      </div>
      <div>BODY
        <div>switch 
          <div>Home</div>
          <Home></Home>
          <UserProfile></UserProfile>
          <div>is authenticate = to register</div>
          <div>is authenticate & is complete = to profile</div>
        
        </div>
      </div>
      <div>FOOTER</div>
      
    </div>
  );
}

export default App;
