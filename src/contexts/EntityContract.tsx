import EntityContractJSON from '../contracts/Entity.json';
import { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import React, { useReducer, useCallback } from 'react';
import { EntityType, Entity } from '../types';

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

export interface EntityCreationArgs {
  account: string;
  name: string;
  email: string;
  phoneNumber: string;
  type: number;
}

type Context = {
  state: State;
  dispatch: React.Dispatch<any>;
  createEntity: (params: EntityCreationArgs) => any;
  getEntity: (address: string) => Promise<Entity | undefined>;
};

const DefaultContext: Context = {
  state: initialState,
  dispatch: () => null,
  createEntity: (params: EntityCreationArgs) => null,
  getEntity: (address: string) => new Promise<undefined>(() => {})
};

const EntityContractContext = React.createContext<Context>(DefaultContext);

const { Provider } = EntityContractContext;

const Reducer = (state: State, action: Action): State => {
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

  const createEntity = useCallback(
    (params: EntityCreationArgs) => {
      return state.contract.methods
        .create(
          params.account,
          params.name,
          params.email,
          params.phoneNumber,
          params.type
        )
        .send({ from: params.account });
    },
    [state]
  );

  const getEntity = useCallback(
    async (address: string) => {
      if (state.contract && address) {
        const result = await state.contract.methods.entities(address).call();

        const entity: Entity = {
          approved: result.approved,
          email: result.email,
          name: result.name,
          phoneNumber: result.phoneNumber,
          set: result.set,
          type: parseInt(result.entityType)
        };
        return entity;
      }
    },
    [state]
  );

  return (
    <Provider value={{ state: state, dispatch, createEntity, getEntity }}>
      {children}
    </Provider>
  );
};

export { EntityContractContext, EntityContractContextProvider };
