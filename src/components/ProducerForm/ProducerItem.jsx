import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';

const ItemContainer = styled.div`
  background-color: #b3b5c6;
  color: #eeeef2;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  margin-bottom: 20px;
`;

const ChartContainer = styled.div`
  background-color: #b3b5c6;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const ProducerName = styled.h3`
  font-size: 24px;
  margin: 0;
`;

const FarmName = styled.p`
  color: #eeeef2;
  margin-bottom: 10px;
`;

const CityState = styled.p`
  color: #eeeef2;
  margin: 5px 0;
`;

const ProducerItem = () => {
  const [producer, setProducer] = useState(null);
  const { id } = useParams();
  const singleProducer = useSelector((state) => state?.producer?.producers);
  const chartRef = useRef(null);

  useEffect(() => {
    if (singleProducer) {
      const foundProducer = singleProducer.find(
        (producer) => producer.id === parseInt(id)
      );
      setProducer(foundProducer);
    }
  }, [singleProducer, id]);

  useEffect(() => {
    if (producer) {
      renderChart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [producer]);

  const renderChart = () => {
    const data = [producer.agriculturableArea, producer.vegetationArea];
    const labels = ['Area agricula', 'Area de vegetação'];

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().domain(labels).range([0, width]).padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([height, 0]);

    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));
    svg.append('g').call(d3.axisLeft(y));

    const bars = svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => x(labels[i]))
      .attr('y', height) // Initial y position for animation
      .attr('width', x.bandwidth())
      .attr('height', 0) // Initial height for animation
      .attr('fill', (d, i) => (i === 0 ? 'yellow' : 'green')); // Set colors for each bar

    // Animation using transitions
    bars
      .transition()
      .duration(1000)
      .attr('y', (d) => y(d))
      .attr('height', (d) => height - y(d));
  };

  return (
    <>
      <ItemContainer>
        <InfoContainer>
          <ProducerName>{producer?.producerName}</ProducerName>
          <FarmName>{producer?.farmName}</FarmName>
          <CityState>
            {producer?.city}, {producer?.state}
          </CityState>
        </InfoContainer>
      </ItemContainer>
      <ChartContainer>
        <h3>Culture and Area Information</h3>
        <svg ref={chartRef}></svg>
      </ChartContainer>
    </>
  );
};

export default ProducerItem;
