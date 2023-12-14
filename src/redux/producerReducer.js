import {
  ADD_PRODUCER,
  EDIT_PRODUCER,
  DELETE_PRODUCER,
  GET_CULTURE,
  UPDATE_TOTAL_FARMS,
  UPDATE_TOTAL_AREA,
  UPDATE_LAND_USAGE_AREA,
  UPDATE_STATES_DATA,
} from './producerActions';

const initialState = {
  producers: [], // Initial state for producers
  culture: [], // Initial state for culture data
  totalFarms: 0, // Initial state for total farms
  totalArea: 0, // Initial state for total area
  landUsageArea: 0, // Initial state for land usage area
  statesData: [], // Initial state for states data
};

const producerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCER:
      return {
        ...state,
        producers: [...state.producers, action.payload],
      };

    case EDIT_PRODUCER:
      return {
        ...state,
        producers: state.producers.map((producer) =>
          producer.id === action.payload.producerId
            ? { ...producer, ...action.payload.updatedData }
            : producer
        ),
      };

    case GET_CULTURE:
      return {
        ...state,
        culture: action.payload,
      };

    case UPDATE_TOTAL_FARMS:
      return {
        ...state,
        totalFarms: action.payload,
      };

    case UPDATE_TOTAL_AREA:
      return {
        ...state,
        totalArea: action.payload,
      };

    case UPDATE_LAND_USAGE_AREA:
      return {
        ...state,
        landUsageArea: action.payload,
      };

    case UPDATE_STATES_DATA:
      return {
        ...state,
        statesData: action.payload,
      };

    case DELETE_PRODUCER:
      return {
        ...state,
        producers: state.producers.filter(
          (producer) => producer.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default producerReducer;
