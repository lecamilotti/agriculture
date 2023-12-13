import React from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
`;

const ProducerName = styled.p`
  font-weight: bold;
`;

const FarmName = styled.p`
  color: #666;
`;

const OtherDetails = styled.p`
  /* Your styles for other details here */
`;

const ProducerItem = ({ producer }) => {
  const { producerName, farmName, /* other fields */ } = producer;

  return (
    <ItemContainer>
      <ProducerName>Producer: {producerName}</ProducerName>
      <FarmName>Farm: {farmName}</FarmName>
      {/* Render other fields */}
      {/* <OtherDetails>{otherField}</OtherDetails> */}
    </ItemContainer>
  );
};

export default ProducerItem;
