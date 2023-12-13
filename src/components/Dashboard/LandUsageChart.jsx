import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import styled from 'styled-components';
import apiService from '../../services/apiService';

const ChartContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
`;

const ChartTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 15px;
  text-align: center;
`;

const LandUsageChart = () => {
  const [landUsageData, setLandUsageData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const producers = await apiService.getAllProducers();
        const landUsage = producers.reduce(
          (acc, producer) => {
            acc.agriculturableArea += producer.agriculturableArea;
            acc.vegetationArea += producer.vegetationArea;
            return acc;
          },
          { agriculturableArea: 0, vegetationArea: 0 }
        );

        setLandUsageData([
          { name: 'Agriculturable', value: landUsage.agriculturableArea },
          { name: 'Vegetation', value: landUsage.vegetationArea },
        ]);
      } catch (error) {
        console.error('Error fetching data for Land Usage Chart:', error);
      }
    };

    fetchData();
  }, []);

  const COLORS = ['#82ca9d', '#8884d8']; // Colors for Agriculturable and Vegetation areas

  return (
    <ChartContainer>
      <ChartTitle>Land Usage Distribution</ChartTitle>
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
            {landUsageData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
