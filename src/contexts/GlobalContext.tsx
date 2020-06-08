import React, { useReducer } from 'react';
import Web3 from 'web3';

type SetWeb3Action = {
  type: 'SET_WEB3';
  web3: Web3;
};

type SetAccountAction = {
  type: 'SET_ACCOUNT';
  account: string;
};

type Action = SetWeb3Action | SetAccountAction;

type State = {
  web3: Web3;
  account: string;
};

const initialState: State = {
  web3: new Web3(Web3.givenProvider),
  account: ''
};

const GlobalContext = React.createContext<{
  globalState: State;
  dispatch: React.Dispatch<any>;
}>({ globalState: initialState, dispatch: () => null });

const { Provider } = GlobalContext;

const Reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_WEB3':
      return { ...state, web3: action.web3 };
    case 'SET_ACCOUNT':
      return { ...state, account: action.account };
    default:
      throw Error('Unknown GlobalContext reducer action');
  }
};

const GlobalContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Provider value={{ globalState: state, dispatch }}>{children}</Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
