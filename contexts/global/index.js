import React, {useReducer} from 'react';

const Context = React.createContext({});

// be agnostic to user info, respect user privacy
const userInfoInitialState = {
  uuid: null,
};

const reducer = (state, action) => {
  return {
    ...state,
    [action.key]: action.value,
  };
};

const Provider = ({children}) => {
  const [userInfoState, dispatchUserInfoState] = useReducer(
    reducer,
    userInfoInitialState,
  );

  const providerValues = {
    value: [userInfoState, dispatchUserInfoState],
  };

  return <Context.Provider {...providerValues}>{children}</Context.Provider>;
};

export {Context, Provider};
