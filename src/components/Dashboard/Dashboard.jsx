import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StateChart from './StateChart';
import CultureChart from './CultureChart';
import LandUsageChart from './LandUsageChart';
import { useSelector } from 'react-redux';

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

const Dashboard = () => {
  const [totalFarms, setTotalFarms] = useState(0);
  const [totalArea, setTotalArea] = useState(0);

  const currentData = useSelector((state) => state?.producer?.producers);

  useEffect(() => {
    if (currentData) {
      // find at the current data the total of farms and the total area and set the state
      const totalFarms = currentData?.length;
      // look at each currentData the summ of totalArea and set the state
      const totalArea = currentData?.reduce((acc, curr) => {
        return acc + curr.totalArea;
      }, 0);

      if (totalArea === undefined) {
        const totalArea = currentData[0].reduce((acc, curr) => {
          return acc + curr.totalArea;
        }, 0);
        setTotalArea(totalArea);
      } else {
        setTotalArea(totalArea);
      }

      setTotalFarms(totalFarms);
    }
  }, [currentData]);

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
