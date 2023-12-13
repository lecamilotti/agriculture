import React from 'react';
import styled from 'styled-components';

const StatsContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
`;

const StatsTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 15px;
`;

const StatItem = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Value = styled.span`
  margin-left: 5px;
`;

const FarmStats = ({ totalFarms, totalArea }) => {
  return (
    <StatsContainer>
      <StatsTitle>Farm Statistics</StatsTitle>
      <StatItem>
        <Label>Total Fazendas:</Label>
        <Value>{totalFarms}</Value>
      </StatItem>
      <StatItem>
        <Label>Total Área (Hectares):</Label>
        <Value>{totalArea}</Value>
      </StatItem>
      {/* Add more statistics items if needed */}
    </StatsContainer>
  );
};

export default FarmStats;
