export default (state, action) => {
  switch (action.type) {
    case 'RANDOM_DATE':
      let number = Math.floor(Math.random() * state.dates.length);

      return {
        ...state,
        randomDate: state.dates[number],
      };

    case 'GET_DATES':
      return {
        ...state,
        dates: action.payload,
        loading: false,
      };
    case 'ADD_DATE':
      return {
        ...state,
        dates: [action.payload, ...state.dates],
        loading: false,
      };
    case 'CURRENT_DATE':
      return {
        ...state,
        currentDate: action.payload,
      };
    case 'CLEAR_DATE':
      return {
        ...state,
        currentDate: null,
      };
    case 'UPDATE_DATE':
      return {
        ...state,
        dates: state.dates.map((date) =>
          date._id === action.payload._id ? action.payload : date
        ),
        loading: false,
      };
    case 'DELETE_DATE':
      return {
        ...state,
        dates: state.dates.filter((date) => date._id !== action.payload),
        loading: false,
      };

    case 'DATE_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'CLEAR_DATES':
      return {
        ...state,
        dates: null,
        error: null,
        currentDate: null,
      };
    default:
      return state;
  }
};
