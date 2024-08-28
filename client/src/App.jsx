import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Routes, Route, useLocation } from 'react-router-dom';
import UserList from './components/UserList';
import TeamDetails from './components/TeamDetails';
import Navbar from './components/Navbar';
import CreateUser from './components/CreateUser';
import Filters from './components/Filters';

function App() {
  const location = useLocation();

  return (
    <Provider store={store}>
      <Navbar />
      {location.pathname === '/' && <Filters />}
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/team" element={<TeamDetails />} />
      </Routes>
    </Provider>
  );
}

export default App;
