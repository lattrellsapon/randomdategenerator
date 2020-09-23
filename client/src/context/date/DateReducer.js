export default (state, action) => {
  switch (action.type) {
    case 'RANDOM_DATE':
      return {
        ...state,
        randomDate: state.dates[action.payload],
      };
    case 'ADD_DATE':
      return {
        ...state,
        dates: [action.payload, ...state.dates],
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
          date.id === action.payload.id ? action.payload : date
        ),
      };
    case 'DELETE_DATE':
      return {
        ...state,
        dates: state.dates.filter((date) => date.id !== action.payload),
      };
    default:
      return state;
  }
};
