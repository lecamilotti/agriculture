// ProducerList.js
// ProducerList.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import apiService from '../../services/apiService';
import ProducerForm from './ProducerForm';

const ListContainer = styled.div`
  background-color: #181b23;
  color: #eeeef2;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  max-width: 600px;
`;

const ProducerItem = styled.div`
  background-color: #d1d2dc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.3s ease-in-out;
`;

const ProducerInfo = styled.div`
  margin-bottom: 10px;
`;
const ProducerName = styled.h3`
  font-size: 20px;
  margin: 0;
`;

const FarmName = styled.p`
  color: #555;
  margin: 5px 0 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Icon = styled.span`
  margin-right: 10px; /* Adjust margin */
  cursor: pointer;
`;

const CityState = styled.p`
  color: #555;
  margin: 5px 0;
`;

const ProducerList = () => {
  const [producers, setProducers] = useState([]);
  const [selectedProducer, setSelectedProducer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducers = await apiService.getAllProducers();
        setProducers(allProducers);
      } catch (error) {
        console.error('Error fetching producers:', error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = (producer) => {
    setSelectedProducer(producer);
  };

  const handleDelete = async (id) => {
    try {
      await apiService.deleteProducer(id);
      const updatedProducers = producers.filter(
        (producer) => producer.id !== id
      );
      setProducers(updatedProducers);
    } catch (error) {
      console.error('Error deleting producer:', error);
    }
  };

  return (
    <ListContainer>
      {producers.map((producer) => (
        <div key={producer.id}>
          <ProducerItem>
            <Link to={`/producer/${producer.id}`}>
              <ProducerInfo>
                <ProducerName>{producer.producerName}</ProducerName>
                <FarmName>{producer.farmName}</FarmName>
                <CityState>
                  {producer.city}, {producer.state}
                </CityState>
              </ProducerInfo>
            </Link>
            <ButtonContainer>
              <Icon onClick={() => handleUpdate(producer)}>✏️</Icon>
              <Icon onClick={() => handleDelete(producer.id)}>❌</Icon>
            </ButtonContainer>
          </ProducerItem>
        </div>
      ))}
      {selectedProducer && <ProducerForm producerData={selectedProducer} />}
    </ListContainer>
  );
};

export default ProducerList;
