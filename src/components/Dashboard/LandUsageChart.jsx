import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const ChartContainer = styled.div`
  background-color: #181b23;
  color: #eeeef2;
  border: 1px solid #4b4d63;
  padding: 20px;
`;

const ChartTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 15px;
  text-align: center;
`;

const LandUsageChart = () => {
  const [landUsageData, setLandUsageData] = useState([]);

  const landData = useSelector((state) => state.producer.landUsageArea);

  useEffect(() => {
    if (landData !== undefined) {
      setLandUsageData(landData);
    }
  }, [landData]);

  const COLORS = ['#8884d8', '#82ca9d']; // Colors for Agriculturable and Vegetation areas

  return (
    <ChartContainer>
      <ChartTitle>Distribuição de uso das terras </ChartTitle>
      <ResponsiveContainer width='100%' height={300}>
        <PieChart>
          <Pie
            dataKey='value'
            data={landUsageData}
            cx='50%'
            cy='50%'
            outerRadius={100}
            fill='#8884d8'
            label
          >
            {landUsageData &&
              landUsageData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill ? entry.fill : COLORS[index % COLORS.length]}
                />
              ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default LandUsageChart;
