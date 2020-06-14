import React, { useCallback, useReducer } from 'react';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import EntityCompiledContract from '../contracts/Entity.json';
import ManagerCompiledContract from '../contracts/Manager.json';
import {
  Address,
  defaultAddress,
  EmptyEntity,
  Entity,
  EntityCreationArgs,
  entityTypeConversion,
  getEntityType
} from '../types';
import { Product, ProductCreationArgs } from '../types/Product';

type SetAccountAction = {
  type: 'SET_ACCOUNT';
  account: string;
};

type SetEntityAction = {
  type: 'SET_ENTITY';
  entity: Entity;
};

type Action = SetAccountAction | SetEntityAction;

export type State = {
  web3: Web3;
  account: Address;
  managerContract: Contract;
  entity: Entity;
};

const initialState: State = {
  web3: new Web3(Web3.givenProvider),
  account: '',
  managerContract: {} as Contract,
  entity: EmptyEntity
};

initialState.managerContract = new initialState.web3.eth.Contract(
  ManagerCompiledContract.abi as AbiItem[],
  ManagerCompiledContract.networks[5777].address
);

type Context = {
  globalState: State;
  updateAccount: (address: Address) => void;
  updateEntity: (address: Address) => void;
  createEntity: (params: EntityCreationArgs) => Promise<any>;
  approveEntity: (address: Address | string) => Promise<any>;
  convertEntity: (obj: any) => Entity;
  getEntities: () => Promise<any>;
  createProduct: (params: ProductCreationArgs) => Promise<any>;
  convertProduct: (obj: any) => Product;
  getProducts: () => Promise<any>;
};

const DefaultContext: Context = {
  globalState: initialState,
  updateAccount: () => null,
  updateEntity: () => null,
  createEntity: () => new Promise<any>(() => {}),
  approveEntity: (address: Address) => new Promise<any>(() => {}),
  convertEntity: () => ({} as Entity),
  getEntities: () => new Promise<any>(() => {}),
  createProduct: () => new Promise<any>(() => {}),
  convertProduct: () => ({} as Product),
  getProducts: () => new Promise<any>(() => {})
};

const GlobalContext = React.createContext<Context>(DefaultContext);

const { Provider } = GlobalContext;

const Reducer = (state: State, action: Action): State => {
  switch (action.type) {
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

  const updateAccount = useCallback(
    (address: Address) => dispatch({ type: 'SET_ACCOUNT', account: address }),
    []
  );

  const convertEntity = useCallback(
    (obj: any): Entity => ({
      id: obj.id,
      email: obj.email,
      name: obj.name,
      phoneNumber: obj.phoneNumber,
      set: obj.set,
      approved: obj.approved,
      type: getEntityType(parseInt(obj.entityType))
    }),
    []
  );

  const getEntityAddress = useCallback(
    (address: string) => {
      if (state.managerContract && address) {
        return state.managerContract.methods.entitiesMapping(address).call();
      }
    },
    [state]
  );

  const updateEntity = useCallback(() => {
    const result = getEntityAddress(state.account);

    if (result) {
      result.then((address: string) => {
        if (address === defaultAddress) {
          dispatch({
            type: 'SET_ENTITY',
            entity: EmptyEntity
          });
          return;
        }

        const entityContract = new state.web3.eth.Contract(
          EntityCompiledContract.abi as AbiItem[],
          address
        );
        entityContract.methods
          .data()
          .call()
          .then((result: any) =>
            dispatch({
              type: 'SET_ENTITY',
              entity: convertEntity(result)
            })
          );
      });
    }
  }, [state, getEntityAddress, convertEntity]);

  const createEntity = useCallback(
    (params: EntityCreationArgs) => {
      return state.managerContract.methods
        .createEntity(
          params.name,
          params.email,
          params.phoneNumber,
          entityTypeConversion[params.type]
        )
        .send({ from: state.account });
    },
    [state]
  );

  const approveEntity = useCallback(
    (entityAddress: Address) => {
      return state.managerContract.methods
        .approveEntity(entityAddress)
        .send({ from: state.account });
    },
    [state]
  );

  const getEntities = useCallback(() => {
    return state.managerContract.methods
      .getEntities()
      .call({ from: state.account });
  }, [state]);

  const createProduct = useCallback(
    (params: ProductCreationArgs) => {
      return state.managerContract.methods
        .createProduct(params.name)
        .send({ from: state.account });
    },
    [state]
  );

  const convertProduct = useCallback((obj: any): Product => {
    return {
      id: defaultAddress,
      name: obj.name,
      creatorID: obj.creatorID,
      creationTimestamp: new Date(parseInt(obj.creationTimestamp) * 1000),
      purchaserID:
        obj.purchaserID === defaultAddress
          ? defaultAddress
          : obj.purcharserAddress,
      deliveryTimestamp:
        obj.purchaserID === defaultAddress
          ? undefined
          : new Date(parseInt(obj.deliveryTimestamp) * 1000)
    };
  }, []);

  const getProducts = useCallback(() => {
    return state.managerContract.methods
      .getProducts()
      .call({ from: state.account });
  }, [state]);

  return (
    <Provider
      value={{
        globalState: state,
        updateAccount,
        updateEntity,
        createEntity,
        convertEntity,
        approveEntity,
        getEntities,
        getProducts,
        createProduct,
        convertProduct
      }}
    >
      {children}
    </Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
