import React, { createContext, useReducer } from 'react';


export const LectureContext = createContext();

const initialState = {
  user: false,
};

export const ACTIONS = {
  USER: 'USER',

};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.USER:
      return { ...state, user: action.user };
  
    default:
      return state;
  }
}

function LectureProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LectureContext.Provider value={[state, dispatch]}>
      {props.children}
    </LectureContext.Provider>
  );
}

export default LectureProvider;