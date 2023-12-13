// ProducerList.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import apiService from '../../services/apiService';
import ProducerForm from './ProducerForm';

const ListContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
`;

const ProducerItem = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
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
`;

const Icon = styled.span`
  margin-left: 10px;
  cursor: pointer;
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
        <Link to={`/producer/${producer.id}`} key={producer.id}>
          <ProducerItem producer={producer}>
            <ProducerInfo>
              <ProducerName>{producer.producerName}</ProducerName>
              <FarmName>{producer.farmName}</FarmName>
            </ProducerInfo>
            <ButtonContainer>
              <Icon onClick={() => handleUpdate(producer)}>✏️</Icon>
              <Icon onClick={() => handleDelete(producer.id)}>❌</Icon>
            </ButtonContainer>
          </ProducerItem>
        </Link>
      ))}
      {selectedProducer && <ProducerForm producerData={selectedProducer} />}
    </ListContainer>
  );
};

export default ProducerList;
