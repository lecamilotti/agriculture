import {
  ADD_PRODUCER,
  DELETE_PRODUCER,
  EDIT_PRODUCER,
  GET_CULTURE,
  GET_PRODUCER_LIST,
  UPDATE_LAND_USAGE_AREA,
  UPDATE_STATES_DATA,
  UPDATE_TOTAL_AREA,
  UPDATE_TOTAL_FARMS,
} from './producerActions';

const initialState = {
  producers: [],
  culture: [],
  totalFarms: 0,
  totalArea: 0,
  landUsageArea: 0,
  statesData: [],
};

const producerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCER_LIST:
      return {
        ...state,
        producers: action.payload,
      };

    case ADD_PRODUCER:
      return {
        ...state,
        producers: action.payload,
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

    case DELETE_PRODUCER:
      return {
        ...state,
        producers: state.producers.filter(
          (producer) => producer.id !== action.payload
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

    default:
      return state;
  }
};

export default producerReducer;
