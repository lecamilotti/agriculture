import apiService from '../services/apiService';

export const ADD_PRODUCER = 'ADD_PRODUCER';
export const EDIT_PRODUCER = 'EDIT_PRODUCER';
export const DELETE_PRODUCER = 'DELETE_PRODUCER';
export const GET_PRODUCER_LIST = 'GET_PRODUCER_LIST';

export const GET_CULTURE = 'GET_CULTURE';
export const UPDATE_TOTAL_FARMS = 'UPDATE_TOTAL_FARMS';
export const UPDATE_TOTAL_AREA = 'UPDATE_TOTAL_AREA';
export const UPDATE_LAND_USAGE_AREA = 'UPDATE_LAND_USAGE_AREA';
export const UPDATE_STATES_DATA = 'UPDATE_STATES_DATA';

// Action creators using Redux Thunk
export const getProducerList = () => {
  return async (dispatch) => {
    try {
      const producers = await apiService.getAllProducers();
      dispatch({
        type: GET_PRODUCER_LIST,
        payload: producers,
      });
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const addProducer = (producerData) => {
  return async (dispatch) => {
    try {
      const addedProducer = await apiService.addProducer(producerData);
      dispatch({
        type: ADD_PRODUCER,
        payload: addedProducer,
      });
    } catch (error) {
      console.log('error', error);
      // Handle error
    }
  };
};

export const editProducer = (producerId, updatedData) => {
  return async (dispatch) => {
    try {
      const updatedProducer = await apiService.updateProducer(
        producerId,
        updatedData
      );
      dispatch({
        type: EDIT_PRODUCER,
        payload: { producerId, updatedData: updatedProducer },
      });
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const deleteProducer = (producerId) => {
  return async (dispatch) => {
    try {
      const deletedProducer = await apiService.deleteProducer(producerId);
      dispatch({
        type: DELETE_PRODUCER,
        payload: deletedProducer,
      });
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const getCultures = (COLORS) => {
  return async (dispatch) => {
    try {
      const producers = await apiService.getAllProducers();
      const cultures = {};
      producers.forEach((producer) => {
        producer.cultures.forEach((culture) => {
          if (cultures[culture]) {
            cultures[culture]++;
          } else {
            cultures[culture] = 1;
          }
        });
      });
      const formattedCultureData = Object.entries(cultures).map(
        ([culture, count], index) => ({
          name: culture,
          value: count,
          fill: COLORS[culture]
            ? COLORS[culture]
            : COLORS[index % COLORS.length],
        })
      );
      dispatch({
        type: GET_CULTURE,
        payload: formattedCultureData,
      });
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const updateStatesData = (STATECOLORS) => {
  return async (dispatch) => {
    try {
      const producers = await apiService.getAllProducers();
      const states = {};
      producers.forEach((producer) => {
        if (states[producer.state]) {
          states[producer.state]++;
        } else {
          states[producer.state] = 1;
        }
      });
      const formattedStatesData = Object.entries(states).map(
        ([state, count], index) => ({
          name: state,
          value: count,
          fill: STATECOLORS[state]
            ? STATECOLORS[state]
            : STATECOLORS[index % STATECOLORS.length],
        })
      );
      dispatch({
        type: UPDATE_STATES_DATA,
        payload: formattedStatesData,
      });
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const updateLandUsageArea = (landUsage) => {
  return {
    type: UPDATE_LAND_USAGE_AREA,
    payload: landUsage,
  };
};

export const updateTotalArea = (totalArea) => {
  return {
    type: UPDATE_TOTAL_AREA,
    payload: totalArea,
  };
};

export const updateTotalFarms = (totalFarms) => {
  return {
    type: UPDATE_TOTAL_FARMS,
    payload: totalFarms,
  };
};
