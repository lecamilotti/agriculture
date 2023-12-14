import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaUserPlus,
  FaListAlt,
  FaBars, // Hamburger menu icon
} from 'react-icons/fa';
import styled from 'styled-components';
import ProducerForm from './components/ProducerForm/ProducerForm';
import ProducerList from './components/ProducerForm/ProducerFormList';
import ProducerItem from './components/ProducerForm/ProducerItem';
import Dashboard from './components/Dashboard/Dashboard';

import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';

import {
  getCultures,
  getProducerList,
  updateLandUsageArea,
  updateStatesData,
  updateTotalArea,
  updateTotalFarms,
} from './redux/producerActions';

const AppContainer = styled.div`
  display: flex;
  font-family: Arial, sans-serif;
  background-color: #181b23;
  color: #eeeef2;
`;

const Sidebar = styled(animated.div)`
  max-width: 250px;
  width: 100%;
  background-color: #181b23;
  color: #eeeef2;
  padding: 20px;
  transition: width 0.3s ease-in-out;
`;

const HamburgerMenu = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
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

const AnimatedSidebar = animated(Sidebar);

const NavLink = styled(Link)`
  text-decoration: none;
  color: #eeeef2;
  display: block;
  padding: 8px;
  width: max-content;
  transition: background-color 0.3s ease;
  border-bottom: 2px solid transparent;

  &.active {
    border-bottom-color: #ec407a;
  }

  &:hover {
    background-color: #9699b0;
  }
`;

const COLORS = {
  Soja: '#665847', // Gold color for Soja
  Milho: '#FBEC5D', // Forest green for Milho
  Café: '#A67866', // Brown for Café
  'Cana de Açúcar': '#EEEFDF', // OrangeRed for Cana de Açúcar
  Algodão: '#ffc0cb', // Khaki for Algodão
  // Add more colors for other cultures if needed
};

const STATECOLORS = {
  MT: '#B0C4DE', // Mato Grosso
  MG: '#006400', // Minas Gerais
  SP: '#800000', // São Paulo
  MS: '#F4A460', // Mato Grosso do Sul
  PR: '#4682B4', // Paraná
  BA: '#FFD700', // Bahia
  GO: '#2E8B57', // Goiás
  RJ: '#FF69B4', // Rio de Janeiro
  DF: '#00008B', // Distrito Federal
  PE: '#8B0000', // Pernambuco
  RS: '#6A5ACD', // Rio Grande do Sul
  SC: '#FF8C00', // Santa Catarina
  CE: '#FF6347', // Ceará
  PA: '#8B4513', // Pará
  TO: '#808000', // Tocantins
  RO: '#9932CC', // Rondônia
  MA: '#F08080', // Maranhão
  PI: '#9370DB', // Piauí
  PB: '#FFA07A', // Paraíba
  RN: '#00FF7F', // Rio Grande do Norte
  AL: '#FF4500', // Alagoas
  SE: '#7FFF00', // Sergipe
  AM: '#8A2BE2', // Amazonas
  AP: '#20B2AA', // Amapá
  RR: '#FF00FF', // Roraima
  AC: '#00FFFF', // Acre
  ES: '#778899', // Espírito Santo
};

const App = () => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);
  const dispatch = useDispatch();
  const dataList = useSelector((state) => state.producer.producers);

  const sidebarProps = useSpring({
    width: showSidebar ? 250 : 0,
    from: { width: 0 },
    config: { mass: 1, tension: 200, friction: 20 },
  });

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getProducerList());

        const producers = dataList;

        const totalAreaCalculation = producers.reduce(
          (total, producer) => total + producer.totalArea,
          0
        );

        const cultures = {};
        producers.forEach((producer) => {
          producer.cultures.forEach((culture) => {
            if (cultures[culture]) {
              cultures[culture]++;
            } else {
              cultures[culture] = 1;
            }
          });
        });

        const landUsage = producers.reduce(
          (acc, producer) => {
            acc.agriculturableArea += producer.agriculturableArea;
            acc.vegetationArea += producer.vegetationArea;
            return acc;
          },
          { agriculturableArea: 0, vegetationArea: 0 }
        );

        const states = {};
        producers.forEach((producer) => {
          if (states[producer.state]) {
            states[producer.state]++;
          } else {
            states[producer.state] = 1;
          }
        });

        dispatch(updateStatesData(STATECOLORS));
        dispatch(getCultures(COLORS));
        dispatch(
          updateLandUsageArea([
            { name: 'Agriculturable', value: landUsage.agriculturableArea },
            { name: 'Vegetation', value: landUsage.vegetationArea },
          ])
        );

        // Dispatch actions to update Redux store with fetched data

        dispatch(updateTotalFarms(producers.length));
        dispatch(updateTotalArea(totalAreaCalculation));
      } catch (error) {
        console.error('Error fetching data for Dashboard:', error);
      }
    };

    fetchData();
  }, [dispatch, dataList]);

  return (
    <AppContainer>
      <AnimatedSidebar style={sidebarProps}>
        <h2>Menu</h2>
        <ul>
          <li>
            <NavLink
              to='/'
              className={location.pathname === '/' ? 'active' : ''}
            >
              <FaHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/producerform'
              className={location.pathname === '/producerform' ? 'active' : ''}
            >
              <FaUserPlus /> Adicionar Produtor
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/producers'
              className={location.pathname === '/producers' ? 'active' : ''}
            >
              <FaListAlt /> Lista de Produtores
            </NavLink>
          </li>
        </ul>
      </AnimatedSidebar>

      <HamburgerMenu onClick={toggleSidebar}>
        <FaBars />
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
  );
};

export default App;
