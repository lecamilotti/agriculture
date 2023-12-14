const formatCPF = (value) => {
  const formattedValue = value.replace(/[^\d]/g, ''); // Remove non-numeric characters

  // Format CPF: 123.456.789-00
  return formattedValue.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
    '$1.$2.$3-$4'
  );
};

const formatCNPJ = (value) => {
  const formattedValue = value.replace(/[^\d]/g, ''); // Remove non-numeric characters

  // Format CNPJ: 12.345.678/0001-00
  return formattedValue.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
};

const validateCPF = (cpf) => {
  // Remove non-numeric characters
  cpf = cpf.replace(/[^\d]/g, '');

  if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) return false; // Invalid length or repeating digits

  const cpfNumbers = cpf.substring(0, 9).split('').map(Number);
  const verifier1 =
    (cpfNumbers.reduce((acc, val, idx) => acc + val * (10 - idx), 0) * 10) % 11;
  const verifier2 =
    (cpfNumbers.reduce((acc, val, idx) => acc + val * (11 - idx), 0) * 10) % 11;

  return (
    verifier1 === parseInt(cpf.charAt(9)) &&
    verifier2 === parseInt(cpf.charAt(10))
  );
};

const validateCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/[^\d]/g, '');

  if (cnpj.length !== 14 || /^(.)\1+$/.test(cnpj)) return false;

  const cnpjNumbers = cnpj.substring(0, 12).split('').map(Number);

  const verifier1 =
    cnpjNumbers.reduce(
      (acc, val, idx) => acc + val * (5 + ((idx + 1) % 8)),
      0
    ) % 11;
  const verifier2 =
    cnpjNumbers.reduce(
      (acc, val, idx) => acc + val * (6 + ((idx + 1) % 8)),
      0
    ) % 11;

  return (
    verifier1 === (cnpj.charAt(12) === 0 ? 0 : 11 - verifier1) &&
    verifier2 === (cnpj.charAt(13) === 0 ? 0 : 11 - verifier2)
  );
};

const validateAreas = (totalArea, agriculturableArea, vegetationArea) => {
  // Validate total area against agriculturable and vegetation areas
  // Return true if the sum is valid, false otherwise
  return totalArea >= agriculturableArea + vegetationArea;
};

export { formatCPF, formatCNPJ, validateAreas, validateCPF, validateCNPJ };
