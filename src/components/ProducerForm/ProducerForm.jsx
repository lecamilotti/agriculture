import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
`;

const FormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
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
    cultures: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission (e.g., API call or state update)
    console.log(formData);
    // Reset form data after submission (if needed)
    setFormData({
      cpfCnpj: '',
      producerName: '',
      farmName: '',
      city: '',
      state: '',
      totalArea: '',
      agriculturableArea: '',
      vegetationArea: '',
      cultures: '',
    });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <InputField
          type='text'
          name='cpfCnpj'
          value={formData.cpfCnpj}
          placeholder='CPF or CNPJ'
          onChange={handleChange}
          required
        />
        {/* Add other input fields similarly */}
        <SubmitButton type='submit'>Submit</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ProducerForm;
