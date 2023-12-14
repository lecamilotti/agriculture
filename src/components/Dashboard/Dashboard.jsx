import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StateChart from './StateChart';
import CultureChart from './CultureChart';
import LandUsageChart from './LandUsageChart';
import apiService from '../../services/apiService';
import { useDispatch } from 'react-redux';
import {
  getCulture,
  updateLandUsageArea,
  updateStatesData,
  updateTotalArea,
  updateTotalFarms,
} from '../../redux/producerActions';

const DashboardContainer = styled.div`
  background-color: #181b23;

  color: #eeeef2;
  border: 1px solid #4b4d63;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: #181b23;
  color: #eeeef2;
`;

const StatBox = styled.div`
  flex: 1;
  background-color: #181b23;

  color: #eeeef2;
  border: 1px solid #4b4d63;
  padding: 15px;
  text-align: center;
`;

const ChartContainer = styled.div`
  background-color: #181b23;

  color: #eeeef2;
  border: 1px solid #4b4d63;
  padding: 20px;
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



const Dashboard = () => {
  const [totalFarms, setTotalFarms] = useState(0);
  const [totalArea, setTotalArea] = useState(0);
  const dispatch = useDispatch(); // Initialize dispatch

  useEffect(() => {
    const fetchData = async () => {
      try {
        const producers = await apiService.getAllProducers();

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
        const formattedCultureData = Object.entries(cultures).map(
          ([culture, count], index) => ({
            name: culture,
            value: count,
            fill: COLORS[culture]
              ? COLORS[culture]
              : COLORS[index % COLORS.length],
          })
        );

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

        const formattedStatesData = Object.entries(states).map(
          ([state, count], index) => ({
            name: state,
            value: count,
            fill: STATECOLORS[state]
              ? STATECOLORS[state]
              : STATECOLORS[index % STATECOLORS.length],
          })
        );

        dispatch(updateStatesData(formattedStatesData));
        dispatch(getCulture(formattedCultureData));
        dispatch(
          updateLandUsageArea([
            { name: 'Agriculturable', value: landUsage.agriculturableArea },
            { name: 'Vegetation', value: landUsage.vegetationArea },
          ])
        );

        setTotalFarms(producers.length);
        setTotalArea(totalAreaCalculation);

        // Dispatch actions to update Redux store with fetched data
        dispatch(updateTotalFarms(producers.length));
        dispatch(updateTotalArea(totalAreaCalculation));
      } catch (error) {
        console.error('Error fetching data for Dashboard:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <DashboardContainer>
      <Title>Dashboard</Title>
      <StatsContainer>
        <StatBox>
          <p>Total Fazendas</p>
          <p>{totalFarms}</p>
        </StatBox>
        <StatBox>
          <p>Total Área (Hectares)</p>
          <p>{totalArea}</p>
        </StatBox>
      </StatsContainer>
      <ChartContainer>
        <StateChart />
      </ChartContainer>
      <ChartContainer>
        <CultureChart />
      </ChartContainer>
      <ChartContainer>
        <LandUsageChart />
      </ChartContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
