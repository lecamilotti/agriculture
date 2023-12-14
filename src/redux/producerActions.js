// Define action types
export const ADD_PRODUCER = 'ADD_PRODUCER';
export const EDIT_PRODUCER = 'EDIT_PRODUCER';
export const DELETE_PRODUCER = 'DELETE_PRODUCER';
export const GET_CULTURE = 'GET_CULTURE';

export const UPDATE_TOTAL_FARMS = 'UPDATE_TOTAL_FARMS';
export const UPDATE_TOTAL_AREA = 'UPDATE_TOTAL_AREA';
export const UPDATE_LAND_USAGE_AREA = 'UPDATE_LAND_USAGE_AREA';
export const UPDATE_STATES_DATA = 'UPDATE_STATES_DATA';

// Action creators
export const addProducer = (producerData) => {
  return {
    type: ADD_PRODUCER,
    payload: producerData,
  };
};

export const getCulture = (producers) => {
  return {
    type: GET_CULTURE,
    payload: producers,
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

export const updateTotalFarms = (totalFarms) => {
  return {
    type: UPDATE_TOTAL_FARMS,
    payload: totalFarms,
  };
};

export const updateTotalArea = (totalArea) => {
  return {
    type: UPDATE_TOTAL_AREA,
    payload: totalArea,
  };
};

export const updateLandUsageArea = (landUsageArea) => {
  return {
    type: UPDATE_LAND_USAGE_AREA,
    payload: landUsageArea,
  };
};

export const updateStatesData = (statesData) => {
  return {
    type: UPDATE_STATES_DATA,
    payload: statesData,
  };
}
