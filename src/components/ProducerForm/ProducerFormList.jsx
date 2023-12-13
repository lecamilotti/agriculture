import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Example data (replace this with your actual data or API call)
const producersData = [
  {
    id: 1,
    producerName: 'John Doe',
    farmName: 'Doe Farms',
    // Add other fields as per your data structure
  },
  {
    id: 2,
    producerName: 'Jane Smith',
    farmName: 'Smith Farms',
    // Add other fields as per your data structure
  },
  // Add more mock data as needed
];

const ListContainer = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 20px;
`;

const ProducerItem = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

const ProducerName = styled.p`
  font-weight: bold;
`;

const FarmName = styled.p`
  color: #666;
`;

const ProducerList = () => {
  const [producers, setProducers] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API or database
    setProducers(producersData); // Replace this with your API call
  }, []);

  return (
    <ListContainer>
      {producers.map((producer) => (
        <ProducerItem key={producer.id}>
          <p>Producer: {producer.producerName}</p>
          <p>Farm: {producer.farmName}</p>
          {/* Display other fields as per your data structure */}
        </ProducerItem>
      ))}
    </ListContainer>
  );
};

export default ProducerList;
