import React, { useReducer } from 'react';
import Web3 from 'web3';

type SetWeb3Action = {
  type: 'SET_WEB3';
  web3: Web3 | undefined;
};

type Action = SetWeb3Action;

type State = {
  web3: Web3 | undefined;
};

const initialState: State = {
  web3: undefined
};

const GlobalContext = React.createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const { Provider } = GlobalContext;

const Reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_WEB3':
      return { ...state, web3: action.web3 };
    default:
      throw Error('Unknown GlobalContext reducer action');
  }
};

const GlobalContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { GlobalContext, GlobalContextProvider };
