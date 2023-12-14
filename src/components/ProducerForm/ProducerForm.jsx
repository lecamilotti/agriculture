// ProducerForm.js

import React, { useState } from 'react';
import styled from 'styled-components';
import apiService from '../../services/apiService';
import {
  formatCNPJ,
  formatCPF,
  validateCNPJ,
  validateCPF,
} from '../../utils/validationUtils';

const FormContainer = styled.div`
  background-color: #616480;
  border: 1px solid #4b4d63;
  padding: 10px 40px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
`;

const FormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 20px;
  align-items: flex-start;
  justify-content: center;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
`;

const InputField = styled.input`
  width: 80%;
  padding: 15px;
  border: none;
  border-radius: 5px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: none;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #181b23;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #eeeef2;
    color: #181b23;
  }
`;

const SelectField = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #4b4d63;
  border-radius: 5px;
  transition: border-color 0.3s ease;
`;

const CulturesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const SelectedCulture = styled.div`
  border: 1px solid #4b4d63;
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
const ErrorLabel = styled.span`
  color: red;
  font-size: 12px;
`;

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 100%;
`;
const SwitchButton = styled.label`
  position: relative;
  display: inline-block;

  max-width: 60px;
  height: 34px;
  width: 100%;
  margin-left: 10px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + span {
      background-color: #2196f3;
    }

    &:focus + span {
      box-shadow: 0 0 1px #2196f3;
    }

    &:checked + span:before {
      transform: translateX(26px);
    }
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: '';
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  }
`;

const SwitchText = styled.span`
  font-size: 14px;
  color: white;
  margin-left: 10px;
`;

const ProducerForm = () => {
  const [error, setError] = useState('');
  const [isCpfSelected, setIsCpfSelected] = useState(true);

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

  const handleToggle = () => {
    setIsCpfSelected((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
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

  const handleCheckboxChange = () => {
    setIsCpfSelected(!isCpfSelected);
  };

  // Inside your component
  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === 'totalArea') {
      // Validate agriculturable and vegetation areas against total area
      const totalArea = parseFloat(formData.totalArea);
      const agriculturableArea = parseFloat(formData.agriculturableArea);
      const vegetationArea = parseFloat(formData.vegetationArea);

      if (agriculturableArea + vegetationArea > totalArea) {
        setError(
          'A área agricultável e de vegetação não pode ser maior que a área total da fazenda.'
        );
      } else {
        setError('');
      }
    }
    if (name === 'cpfCnpj') {
      if (isCpfSelected) {
        if (!validateCPF(value)) {
          setError('Invalid CPF');
        } else {
          setError('');
        }
      } else {
        if (!validateCNPJ(value)) {
          setError('Invalid CNPJ');
        } else {
          setError('');
        }
      }
    }
  };

  return (
    <FormContainer>
      <FormTitle>Cadastro de novos produtores</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>{isCpfSelected ? 'Digite seu CPF' : 'Digite seu CNPJ'}</Label>
          <ErrorLabel>{error}</ErrorLabel>
          <SwitchWrapper>
            <InputField
              type='text'
              name='cpfCnpj'
              value={
                isCpfSelected
                  ? formatCPF(formData.cpfCnpj)
                  : formatCNPJ(formData.cpfCnpj)
              }
              placeholder={isCpfSelected ? 'Digite CPF' : 'Digite CNPJ'}
              onChange={(e) => {
                const formattedValue = isCpfSelected
                  ? formatCPF(e.target?.value)
                  : formatCNPJ(e.target?.value);

                setFormData({
                  ...formData,
                  cpfCnpj: formattedValue,
                });
              }}
              onBlur={handleBlur}
              minLength={isCpfSelected ? 11 : 14}
              maxLength={isCpfSelected ? 11 : 14}
              autoFocus
              required
            />
            <SwitchButton>
              <input
                type='checkbox'
                onClick={handleToggle}
                checked={!isCpfSelected}
                onChange={handleCheckboxChange}
              />
              <span></span>
            </SwitchButton>
            <SwitchText>{isCpfSelected ? 'CNPJ' : 'CPF'}</SwitchText>
          </SwitchWrapper>
        </FormGroup>
        <FormGroup>
          <Label>Nome do Produtor</Label>
          <InputField
            type='text'
            name='producerName'
            value={formData.producerName}
            placeholder='Nome do productor'
            onChange={handleChange}
            autoFocus
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Nome da Fazenda</Label>
          <InputField
            type='text'
            name='farmName'
            value={formData.farmName}
            placeholder='Nome da Fazenda'
            onChange={handleChange}
            autoFocus
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Cidade</Label>
          <InputField
            type='text'
            name='city'
            value={formData.city}
            placeholder='Cidade'
            onChange={handleChange}
            autoFocus
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Estado</Label>
          <InputField
            type='text'
            name='state'
            value={formData.state}
            placeholder='Estado'
            onChange={handleChange}
            autoFocus
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Área Total (Hectares)</Label>
          <InputField
            type='number'
            name='totalArea'
            value={formData.totalArea}
            placeholder='Entre com a área total'
            onChange={handleChange}
            autoFocus
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Área Agricultável (Hectares)</Label>
          <InputField
            type='number'
            name='agriculturableArea'
            value={formData.agriculturableArea}
            placeholder='Entre com a área agricultável'
            onChange={handleChange}
            autoFocus
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Área de Vegetação (Hectares)</Label>
          <InputField
            type='number'
            name='vegetationArea'
            value={formData.vegetationArea}
            placeholder='Entre com a área de vegetação'
            onChange={handleChange}
            autoFocus
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Cultivos</Label>
          <CulturesContainer>
            {formData.cultures.map((culture, index) => (
              <SelectedCulture key={index}>
                {culture}
                <RemoveCulture onClick={() => handleCultureRemove(index)}>
                  x
                </RemoveCulture>
              </SelectedCulture>
            ))}
          </CulturesContainer>
          <CulturesContainer>
            <SelectField
              value={formData.selectedCulture}
              onChange={handleChange}
              name='selectedCulture'
            >
              <option value=''>Tipo de cultivo</option>
              {/* Add dropdown options for cultures */}
              <option value='Soja'>Soja</option>
              <option value='Milho'>Milho</option>
              <option value='Café'>Café</option>
              <option value='Algodão'>Algodão</option>
              <option value='Cana de Açucar'>Cana de Açucar</option>
              {/* Add other culture options */}
            </SelectField>
          </CulturesContainer>
        </FormGroup>
        <SubmitButton type='submit'>Cadastrar</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ProducerForm;
