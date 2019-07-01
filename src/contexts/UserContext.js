import React, { useState } from 'react';

const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  const [user, serUser] = useState('David')
  return (
    <UserContext.Provider value={{ user, serUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;