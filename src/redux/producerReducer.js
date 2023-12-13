import { ADD_PRODUCER, EDIT_PRODUCER, DELETE_PRODUCER } from './producerActions';

const initialState = {
  producers: [], // Initial state for producers
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

    case DELETE_PRODUCER:
      return {
        ...state,
        producers: state.producers.filter((producer) => producer.id !== action.payload),
      };

    default:
      return state;
  }
};

export default producerReducer;
