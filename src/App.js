import React, { useState } from 'react';
import { Provider } from 'react-redux';
import './styles.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import styled from 'styled-components';
import ProducerForm from './components/ProducerForm/ProducerForm';
import ProducerList from './components/ProducerForm/ProducerFormList';
import ProducerItem from './components/ProducerForm/ProducerItem';
import Dashboard from './components/Dashboard/Dashboard';
import store from './redux/rootReducer';

const AppContainer = styled.div`
  display: flex;
  font-family: Arial, sans-serif;
  background-color: #181b23;
  color: #eeeef2;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #181b23;
  color: #eeeef2;
  padding: 20px;
  transition: width 0.3s ease-in-out;

  ul {
    list-style-type: none;
    padding: 0;

    li {
      margin-bottom: 10px;

      a {
        text-decoration: none;
        color: #eeeef2;
        display: block;
        padding: 8px;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #9699b0;
        }
      }
    }
  }
`;

const HamburgerMenu = styled.div`
  display: none; /* Hide hamburger menu by default */
  @media (max-width: 768px) {
    display: block; /* Show hamburger menu on smaller screens */
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const DashboardContainer = styled.div`
  opacity: 0;
  transition: opacity 0.5s ease;
  &.show {
    opacity: 1;
  }
`;

const App = () => {
  const [showSidebar, setShowSidebar] = useState(true); // State to toggle sidebar

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Provider store={store}>
      <Router>
        <AppContainer>
          <Sidebar style={{ width: showSidebar ? '250px' : '0' }}>
            <h2>Menu</h2>
            <ul>
              <li>
                <Link to='/'>Dashboard</Link>
              </li>
              <li>
                <Link to='/producerform'>Add Producer</Link>
              </li>
              <li>
                <Link to='/producers'>Producer List</Link>
              </li>
            </ul>
          </Sidebar>

          <HamburgerMenu onClick={toggleSidebar}>
            {/* Hamburger menu icon */}
            <svg>...</svg>
          </HamburgerMenu>

          <Content>
            <h1>Producer Manager</h1>
            <Routes>
              <Route
                path='/'
                exact
                element={
                  <DashboardContainer className={showSidebar ? 'show' : ''}>
                    <Dashboard />
                  </DashboardContainer>
                }
              />
              <Route path='/producerform' exact element={<ProducerForm />} />
              <Route path='/producers' exact element={<ProducerList />} />
              <Route path='/producer/:id' element={<ProducerItem />} />
            </Routes>
          </Content>
        </AppContainer>
      </Router>
    </Provider>
  );
};

export default App;
