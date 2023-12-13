import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StateChart from './StateChart';
import CultureChart from './CultureChart';
import LandUsageChart from './LandUsageChart';
import apiService from '../../services/apiService';

const DashboardContainer = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
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
`;

const StatBox = styled.div`
  flex: 1;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 15px;
  text-align: center;
`;

const ChartContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
`;

const Dashboard = () => {
  const [totalFarms, setTotalFarms] = useState(0);
  const [totalArea, setTotalArea] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const producers = await apiService.getAllProducers();
        setTotalFarms(producers.length);

        const totalAreaCalculation = producers.reduce(
          (total, producer) => total + producer.totalArea,
          0
        );
        setTotalArea(totalAreaCalculation);
      } catch (error) {
        console.error('Error fetching data for Dashboard:', error);
      }
    };

    fetchData();
  }, []);

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
