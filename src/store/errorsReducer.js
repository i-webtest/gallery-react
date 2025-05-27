const initialState = {
  errors: [],
};

const ADD_ERROR = 'ADD_ERROR';
const DELETE_ERROR = 'DELETE_ERROR';

export const addError = (error) => ({
  type: ADD_ERROR,
  error,
});

export const deleteError = () => ({
  type: DELETE_ERROR,
});

export const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return {
        ...state,
        errors: [...state.errors, action.error],
      };

    case DELETE_ERROR:
      return {
        ...state,
        errors: state.errors.slice(1),
      };

    default:
      return state;
  }
};
