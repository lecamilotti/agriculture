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

const StateChart = () => {
  const [stateData, setStateData] = useState([]);

  const getStaeData = useSelector((state) => state?.producer?.statesData);

  useEffect(() => {
    if (getStaeData !== undefined) {
      setStateData(getStaeData);
    }
  }, [getStaeData]);

  return (
    <ChartContainer>
      <ChartTitle>Distribuição de fazendas por estados</ChartTitle>
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
