import React, { useReducer } from 'react';
import Web3 from 'web3';
import { EmptyEntity, Entity } from '../types/Entity';

type SetWeb3Action = {
  type: 'SET_WEB3';
  web3: Web3;
};

type SetAccountAction = {
  type: 'SET_ACCOUNT';
  account: string;
};

type SetEntityAction = {
  type: 'SET_ENTITY';
  entity: Entity;
};

type Action = SetWeb3Action | SetAccountAction | SetEntityAction;

type State = {
  web3: Web3;
  account: string;
  entity: Entity;
};

export const isEmptyEntity = (entity: Entity) => {
  return Object.keys(entity)
    .map((key) => key as keyof Entity)
    .every((value) => entity[value] === EmptyEntity[value]);
};

const initialState: State = {
  web3: new Web3(Web3.givenProvider),
  account: '',
  entity: EmptyEntity
};

type Context = {
  globalState: State;
  dispatch: React.Dispatch<any>;
};

const DefaultContext: Context = {
  globalState: initialState,
  dispatch: () => null
};

const GlobalContext = React.createContext<Context>(DefaultContext);

const { Provider } = GlobalContext;

const Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_WEB3':
      return { ...state, web3: action.web3 };
    case 'SET_ACCOUNT':
      return { ...state, account: action.account };
    case 'SET_ENTITY':
      return { ...state, entity: action.entity };
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
