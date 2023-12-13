// ProducerItem.js

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2'; // Import Bar from 'react-chartjs-2'
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import apiService from '../../services/apiService';

const ItemContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  margin-bottom: 20px;
`;

const ProducerName = styled.h3`
  font-size: 24px;
  margin: 0;
`;

const FarmName = styled.p`
  color: #555;
  margin-bottom: 10px;
`;

const ChartContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const ProducerItem = () => {
  const [producer, setProducer] = useState(null);
  const { id } = useParams();

  console.log('id:', id);

  useEffect(() => {
    const fetchProducerById = async (id) => {
      try {
        const producer = await apiService.getProducerById(id);
        if (producer) {
          console.log('Found producer:', producer);
          // Use the producer data here (e.g., set it to state)
        } else {
          console.log('Producer not found');
        }
      } catch (error) {
        console.error('Error fetching producer:', error);
      }
    };

    // Call fetchProducerById with an existing producer ID
    fetchProducerById(id);
  }, [id]);

  // Chart data
  const chartData = {
    labels: ['Total Area', 'Agriculturable Area', 'Vegetation Area'],
    datasets: [
      {
        label: 'Area (Hectares)',
        data: [
          producer?.totalArea,
          producer?.agriculturableArea,
          producer?.vegetationArea,
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (!producer) {
    return <p>Loading...</p>; // You might want to display a loading indicator
  }

  return (
    <>
      <ItemContainer>
        <InfoContainer>
          <ProducerName>{producer.producerName}</ProducerName>
          <FarmName>{producer.farmName}</FarmName>
          {/* Render other fields */}
          {/* <OtherDetails>{otherField}</OtherDetails> */}
        </InfoContainer>
      </ItemContainer>
      <ChartContainer>
        <h3>Farm Information</h3>
        <Bar data={chartData} options={chartOptions} />
      </ChartContainer>
    </>
  );
};

export default ProducerItem;
