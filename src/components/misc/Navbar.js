import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

const routes = [
  {
    text: 'Home',
    route: ''
  },
  {

  }
]

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>navbar</div>
  )
}