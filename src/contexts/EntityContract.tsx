import EntityContractJSON from '../contracts/Entity.json';
import { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import React, { useReducer } from 'react';
import { EntityType } from '../types';

type InitializeAction = {
  type: 'INITIALIZE';
  web3: Web3;
};

type Action = InitializeAction;

type State = {
  contract: any;
};

const initialState: State = {
  contract: undefined
};

const EntityContractContext = React.createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const { Provider } = EntityContractContext;

const Reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        contract: new action.web3.eth.Contract(
          EntityContractJSON.abi as AbiItem[],
          EntityContractJSON.networks[5777].address
        )
      };
    default:
      throw Error('Unknown EntityContractContext reducer action');
  }
};

const EntityContractContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return <Provider value={{ state: state, dispatch }}>{children}</Provider>;
};

export { EntityContractContext, EntityContractContextProvider };

// const callback = useCallback(() => {
//   EntityContract.methods
//     .entities(account)
//     .call()
//     .then((result: any) => console.log(result.name));
// }, [account]);
