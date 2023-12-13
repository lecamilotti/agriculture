import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/rootReducer';

import styled from 'styled-components';
import ProducerForm from './components/ProducerForm/ProducerForm';
import ProducerList from './components/ProducerForm/ProducerFormList';
import Dashboard from './components/Dashboard/Dashboard';

const store = createStore(rootReducer);

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const AppHeader = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer>
        <AppHeader>Producer Management System</AppHeader>
        <ProducerForm />
        <hr />
        <ProducerList />
        <hr />
        <Dashboard />
      </AppContainer>
    </Provider>
  );
};

export default App;
