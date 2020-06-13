import React, { useCallback, useReducer } from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import EntityContractJSON from '../contracts/Entity.json';
import { EmptyEntity, Entity } from '../types/Entity';

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
  convertEntity: (obj: any) => Entity;
};

const DefaultContext: Context = {
  state: initialState,
  dispatch: () => null,
  createEntity: (params: EntityCreationArgs) => null,
  getEntity: (address: string) => new Promise<undefined>(() => {}),
  convertEntity: (obj: any) => EmptyEntity
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

  const convertEntity = useCallback(
    (obj: any): Entity => ({
      id: obj.id,
      approved: obj.approved,
      email: obj.email,
      name: obj.name,
      phoneNumber: obj.phoneNumber,
      set: obj.set,
      type: parseInt(obj.entityType)
    }),
    []
  );

  const getEntity = useCallback(
    async (address: string) => {
      if (state.contract && address) {
        const result = await state.contract.methods.entities(address).call();
        return convertEntity(result);
      }
    },
    [state]
  );

  return (
    <Provider
      value={{ state: state, dispatch, createEntity, getEntity, convertEntity }}
    >
      {children}
    </Provider>
  );
};

export { EntityContractContext, EntityContractContextProvider };
