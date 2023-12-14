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

const CultureChart = () => {
  const [cultureData, setCultureData] = useState([]);

  const cultures = useSelector((state) => state.producer.culture);

  useEffect(() => {
    if (cultures !== undefined) {
      setCultureData(cultures);
    }
  }, [cultures]);

  return (
    <ChartContainer>
      <ChartTitle>Distribuição por cultivo</ChartTitle>
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
