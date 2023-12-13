// Simulated database or API

const producers = [
  {
    id: 1,
    cpfCnpj: '12345678900',
    producerName: 'João Silva',
    farmName: 'Fazenda Esperança',
    city: 'São Paulo',
    state: 'SP',
    totalArea: 1500,
    agriculturableArea: 900,
    vegetationArea: 600,
    cultures: ['Soja', 'Milho'],
  },
  {
    id: 2,
    cpfCnpj: '98765432100',
    producerName: 'Maria Oliveira',
    farmName: 'Fazenda Feliz',
    city: 'Rio de Janeiro',
    state: 'RJ',
    totalArea: 1200,
    agriculturableArea: 700,
    vegetationArea: 500,
    cultures: ['Café', 'Cana de Açúcar'],
  },
  {
    id: 3,
    cpfCnpj: '55555555555',
    producerName: 'Pedro Santos',
    farmName: 'Fazenda Progresso',
    city: 'Belo Horizonte',
    state: 'MG',
    totalArea: 1800,
    agriculturableArea: 1000,
    vegetationArea: 800,
    cultures: ['Milho', 'Algodão'],
  },
  {
    id: 4,
    cpfCnpj: '11111111111',
    producerName: 'Ana Costa',
    farmName: 'Fazenda São João',
    city: 'Curitiba',
    state: 'PR',
    totalArea: 2000,
    agriculturableArea: 1300,
    vegetationArea: 700,
    cultures: ['Café', 'Cana de Açúcar'],
  },
  {
    id: 5,
    cpfCnpj: '22222222222',
    producerName: 'José Lima',
    farmName: 'Fazenda Boa Vista',
    city: 'Brasília',
    state: 'DF',
    totalArea: 2200,
    agriculturableArea: 1500,
    vegetationArea: 700,
    cultures: ['Soja', 'Café'],
  },
  {
    id: 6,
    cpfCnpj: '33333333333',
    producerName: 'Carla Gomes',
    farmName: 'Fazenda União',
    city: 'Salvador',
    state: 'BA',
    totalArea: 1900,
    agriculturableArea: 1000,
    vegetationArea: 900,
    cultures: ['Algodão', 'Milho'],
  },
  {
    id: 7,
    cpfCnpj: '44444444444',
    producerName: 'Fernando Pereira',
    farmName: 'Fazenda Boa Esperança',
    city: 'Recife',
    state: 'PE',
    totalArea: 2500,
    agriculturableArea: 1800,
    vegetationArea: 700,
    cultures: ['Cana de Açúcar', 'Algodão'],
  },
  {
    id: 8,
    cpfCnpj: '55555555555',
    producerName: 'Gabriela Fernandes',
    farmName: 'Fazenda Santa Rosa',
    city: 'Fortaleza',
    state: 'CE',
    totalArea: 1700,
    agriculturableArea: 1100,
    vegetationArea: 600,
    cultures: ['Café', 'Soja'],
  },
  {
    id: 9,
    cpfCnpj: '66666666666',
    producerName: 'Ricardo Barbosa',
    farmName: 'Fazenda Vale Verde',
    city: 'Manaus',
    state: 'AM',
    totalArea: 2100,
    agriculturableArea: 1400,
    vegetationArea: 700,
    cultures: ['Milho', 'Soja'],
  },
  {
    id: 10,
    cpfCnpj: '77777777777',
    producerName: 'Mariana Almeida',
    farmName: 'Fazenda Flores',
    city: 'Porto Alegre',
    state: 'RS',
    totalArea: 2300,
    agriculturableArea: 1600,
    vegetationArea: 700,
    cultures: ['Cana de Açúcar', 'Algodão'],
  },
];

// Simulated delay for API calls (replace with actual API calls)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const apiService = {
  getAllProducers: async () => {
    // Simulate fetching all producers from the database/API
    await delay(500); // Simulated delay
    return producers;
  },

  addProducer: async (newProducerData) => {
    // Simulate adding a new producer to the database/API
    await delay(500); // Simulated delay
    const newProducer = { id: Date.now(), ...newProducerData };
    producers.push(newProducer);
    return newProducer;
  },

  updateProducer: async (producerId, updatedData) => {
    // Simulate updating an existing producer in the database/API
    await delay(500); // Simulated delay
    const producerToUpdate = producers.find(
      (producer) => producer.id === producerId
    );
    if (producerToUpdate) {
      Object.assign(producerToUpdate, updatedData);
      return producerToUpdate;
    }
    return null; // Return null if producer is not found
  },

  deleteProducer: async (producerId) => {
    // Simulate deleting a producer from the database/API
    await delay(500); // Simulated delay
    const index = producers.findIndex((producer) => producer.id === producerId);
    if (index !== -1) {
      const deletedProducer = producers.splice(index, 1)[0];
      return deletedProducer;
    }
    return null; // Return null if producer is not found
  },
};

export default apiService;