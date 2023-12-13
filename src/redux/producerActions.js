// Define action types
export const ADD_PRODUCER = 'ADD_PRODUCER';
export const EDIT_PRODUCER = 'EDIT_PRODUCER';
export const DELETE_PRODUCER = 'DELETE_PRODUCER';

// Action creators
export const addProducer = (producerData) => {
  return {
    type: ADD_PRODUCER,
    payload: producerData,
  };
};

export const editProducer = (producerId, updatedData) => {
  return {
    type: EDIT_PRODUCER,
    payload: { producerId, updatedData },
  };
};

export const deleteProducer = (producerId) => {
  return {
    type: DELETE_PRODUCER,
    payload: producerId,
  };
};
