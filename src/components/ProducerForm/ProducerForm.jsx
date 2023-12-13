// ProducerForm.js

import React, { useState } from 'react';
import styled from 'styled-components';
import apiService from '../../services/apiService';

const FormContainer = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  width: 500px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const SelectField = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
`;

const CulturesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const SelectedCulture = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 5px 8px;
  margin-right: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const RemoveCulture = styled.span`
  margin-left: 5px;
  cursor: pointer;
`;

const ProducerForm = () => {
  const [formData, setFormData] = useState({
    cpfCnpj: '',
    producerName: '',
    farmName: '',
    city: '',
    state: '',
    totalArea: '',
    agriculturableArea: '',
    vegetationArea: '',
    cultures: [],
    selectedCulture: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCultureAdd = () => {
    if (formData.selectedCulture.trim() !== '') {
      setFormData({
        ...formData,
        cultures: [...formData.cultures, formData.selectedCulture],
        selectedCulture: '',
      });
    }
  };

  const handleCultureRemove = (index) => {
    const updatedCultures = formData.cultures.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      cultures: updatedCultures,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { selectedCulture, ...newProducerData } = formData;
    try {
      const newProducer = await apiService.addProducer(newProducerData);
      console.log('New Producer Added:', newProducer);
      setFormData({
        cpfCnpj: '',
        producerName: '',
        farmName: '',
        city: '',
        state: '',
        totalArea: '',
        agriculturableArea: '',
        vegetationArea: '',
        cultures: [],
        selectedCulture: '',
      });
    } catch (error) {
      console.error('Error adding producer:', error);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Add Producer</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>CPF or CNPJ</Label>
          <InputField
            type='text'
            name='cpfCnpj'
            value={formData.cpfCnpj}
            placeholder='Enter CPF or CNPJ'
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Producer Name</Label>
          <InputField
            type='text'
            name='producerName'
            value={formData.producerName}
            placeholder='Enter Producer Name'
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Farm Name</Label>
          <InputField
            type='text'
            name='farmName'
            value={formData.farmName}
            placeholder='Enter Farm Name'
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>City</Label>
          <InputField
            type='text'
            name='city'
            value={formData.city}
            placeholder='Enter City'
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>State</Label>
          <InputField
            type='text'
            name='state'
            value={formData.state}
            placeholder='Enter State'
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Total Area (Hectares)</Label>
          <InputField
            type='number'
            name='totalArea'
            value={formData.totalArea}
            placeholder='Enter Total Area'
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Agriculturable Area (Hectares)</Label>
          <InputField
            type='number'
            name='agriculturableArea'
            value={formData.agriculturableArea}
            placeholder='Enter Agriculturable Area'
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Vegetation Area (Hectares)</Label>
          <InputField
            type='number'
            name='vegetationArea'
            value={formData.vegetationArea}
            placeholder='Enter Vegetation Area'
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Cultures</Label>
          <CulturesContainer>
            {formData.cultures.map((culture, index) => (
              <SelectedCulture key={index}>
                {culture}
                <RemoveCulture onClick={() => handleCultureRemove(index)}>
                  x
                </RemoveCulture>
              </SelectedCulture>
            ))}
            <SelectField
              value={formData.selectedCulture}
              onChange={(e) =>
                setFormData({ ...formData, selectedCulture: e.target.value })
              }
            >
              <option value=''>Select Culture</option>
              {/* Add dropdown options for cultures */}
              <option value='Soybean'>Soybean</option>
              <option value='Corn'>Corn</option>
              {/* Add other culture options */}
            </SelectField>
            <SubmitButton onClick={handleCultureAdd}>Add Culture</SubmitButton>
          </CulturesContainer>
        </FormGroup>
        <SubmitButton type='submit'>Submit</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ProducerForm;
