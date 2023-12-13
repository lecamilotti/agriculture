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

const StateChart = () => {
  const [stateData, setStateData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const producers = await apiService.getAllProducers();
        const states = {};
        producers.forEach((producer) => {
          if (states[producer.state]) {
            states[producer.state]++;
          } else {
            states[producer.state] = 1;
          }
        });

        const formattedData = Object.entries(states).map(([state, count], index) => ({
          name: state,
          value: count,
          fill: COLORS[index % COLORS.length],
        }));

        setStateData(formattedData);
      } catch (error) {
        console.error('Error fetching data for State Chart:', error);
      }
    };

    fetchData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']; // Add more colors if needed

  return (
    <ChartContainer>
      <ChartTitle>State-wise Distribution of Farms</ChartTitle>
      <ResponsiveContainer width='100%' height={300}>
        <PieChart>
          <Pie
            dataKey='value'
            data={stateData}
            cx='50%'
            cy='50%'
            outerRadius={100}
            fill='#8884d8'
            label
          >
            {stateData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default StateChart;
