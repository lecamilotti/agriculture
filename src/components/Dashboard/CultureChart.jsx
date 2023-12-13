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

const CultureChart = () => {
  const [cultureData, setCultureData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const producers = await apiService.getAllProducers();
        const cultures = producers.reduce((acc, producer) => {
          producer.cultures.forEach((culture) => {
            if (acc[culture]) {
              acc[culture]++;
            } else {
              acc[culture] = 1;
            }
          });
          return acc;
        }, {});

        const formattedData = Object.entries(cultures).map(([culture, count], index) => ({
          name: culture,
          value: count,
          fill: COLORS[index % COLORS.length],
        }));

        setCultureData(formattedData);
      } catch (error) {
        console.error('Error fetching data for Culture Chart:', error);
      }
    };

    fetchData();
  }, []);

  const COLORS = ['#ff9999', '#99ff99', '#9999ff', '#ffff99', '#ff99ff']; // Custom colors for cultures

  return (
    <ChartContainer>
      <ChartTitle>Culture Distribution</ChartTitle>
      <ResponsiveContainer width='100%' height={300}>
        <PieChart>
          <Pie
            dataKey='value'
            data={cultureData}
            cx='50%'
            cy='50%'
            outerRadius={100}
            fill='#8884d8'
            label
          >
            {cultureData.map((entry, index) => (
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

export default CultureChart;
