import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useReducer } from 'react';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import EntityCompiledContract from '../contracts/Entity.json';
import ManagerCompiledContract from '../contracts/Manager.json';
import ProductCompiledContract from '../contracts/Product.json';
import {
  Address,
  defaultAddress,
  EmptyEntity,
  Entity,
  EntityCreationArgs,
  entityTypeConversion
} from '../types';
import { Product, ProductCreationArgs } from '../types/Product';
import { convertEntity, convertProduct, getRoute } from '../utils';

type UpdateAccount = {
  type: 'UPDATE_ACCOUNT';
  account: string;
};

type UpdateEntity = {
  type: 'UPDATE_ENTITY';
  entity: Entity;
};

type UpdateProducts = {
  type: 'UPDATE_PRODUCTS';
  products: Product[];
};

type UpdateEntities = {
  type: 'UPDATE_ENTITIES';
  entities: Entity[];
};

type Action = UpdateAccount | UpdateEntity | UpdateProducts | UpdateEntities;

export type GlobalContextState = {
  web3: Web3;
  account: Address;
  managerContract: Contract;
  entity: Entity;
  entities: Entity[];
  products: Product[];
};

const initialState: GlobalContextState = {
  web3: new Web3(Web3.givenProvider),
  account: '',
  managerContract: {} as Contract,
  entity: EmptyEntity,
  entities: [],
  products: []
};

initialState.managerContract = new initialState.web3.eth.Contract(
  ManagerCompiledContract.abi as AbiItem[],
  ManagerCompiledContract.networks[5777].address
);

const EmptyPromise = new Promise<any>(() => {});

type Context = {
  globalState: GlobalContextState;
  updateAccount: (address: Address) => void;
  updateProducts: () => Promise<any>;
  updateEntities: () => Promise<any>;
  createEntity: (params: EntityCreationArgs) => Promise<any>;
  createProduct: (params: ProductCreationArgs) => Promise<any>;
  approveEntity: (address: Address | string) => Promise<any>;
  purchaseProduct: (address: Address) => Promise<any>;
  prepareProduct: (address: Address) => Promise<any>;
  timestampDeliveryStep: (address: Address) => Promise<any>;
};

const DefaultContext: Context = {
  globalState: initialState,
  updateAccount: () => null,
  updateProducts: () => EmptyPromise,
  updateEntities: () => EmptyPromise,
  createEntity: () => EmptyPromise,
  createProduct: () => EmptyPromise,
  approveEntity: () => EmptyPromise,
  purchaseProduct: () => EmptyPromise,
  prepareProduct: () => EmptyPromise,
  timestampDeliveryStep: () => EmptyPromise
};

const GlobalContext = React.createContext<Context>(DefaultContext);

const { Provider } = GlobalContext;

const Reducer = (
  state: GlobalContextState,
  action: Action
): GlobalContextState => {
  switch (action.type) {
    case 'UPDATE_ACCOUNT':
      return { ...state, account: action.account };
    case 'UPDATE_ENTITY':
      return { ...state, entity: action.entity };
    case 'UPDATE_PRODUCTS':
      return { ...state, products: action.products };
    case 'UPDATE_ENTITIES':
      return { ...state, entities: action.entities };
    default:
      throw Error('Unknown GlobalContext reducer action');
  }
};

const GlobalContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const { enqueueSnackbar } = useSnackbar();

  const getEntity = useCallback(
    (account: Address) => {
      if (account === defaultAddress || account === '' || !account) {
        return;
      }
      return state.managerContract.methods
        .entitiesMapping(account)
        .call({ from: account })
        .then((address: Address) => {
          if (address === defaultAddress) {
            dispatch({
              type: 'UPDATE_ENTITY',
              entity: convertEntity(EmptyEntity)
            });
          }
          const entityContract = new state.web3.eth.Contract(
            EntityCompiledContract.abi as AbiItem[],
            address
          );
          entityContract.methods
            .data()
            .call()
            .then((result: Entity) => {
              dispatch({
                type: 'UPDATE_ENTITY',
                entity: convertEntity(result)
              });
            });
        });
    },
    [state.managerContract]
  );

  // =================================get methods======================================
  const getEntities = useCallback(() => {
    return state.managerContract.methods
      .getEntities()
      .call({ from: state.account })
      .catch(() => {
        return EmptyPromise;
      });
  }, [state.account]);
  const getProducts = useCallback(() => {
    return state.managerContract.methods
      .getProducts()
      .call({ from: state.account })
      .catch(() => {
        return EmptyPromise;
      });
  }, [state.account]);
  // ==========================================================================

  // =================================update methods======================================
  const updateAccount = useCallback((address: Address) => {
    dispatch({ type: 'UPDATE_ACCOUNT', account: address });
  }, []);

  useEffect(() => {
    updateEntities();
    updateProducts();
    getEntity(state.account);
  }, [state.account]);

  // On component mount
  useEffect(() => {
    state.web3.eth.getAccounts((error, accounts) => {
      if (accounts) updateAccount(accounts[0]);
    });
  }, []);

  const updateEntities = useCallback(() => {
    const result: Promise<any> = getEntities();
    if (result) {
      return result.then((entities: any[]) => {
        dispatch({
          type: 'UPDATE_ENTITIES',
          entities: entities ? entities.map(convertEntity) : []
        });
      });
    }
    return result;
  }, [getEntities]);
  const updateProducts = useCallback(() => {
    const result: Promise<any> = getProducts();
    if (result) {
      return result.then((products: any[]) => {
        dispatch({
          type: 'UPDATE_PRODUCTS',
          products: products.map(convertProduct)
        });
      });
    }
    return result;
  }, [getProducts, state.entity]);
  // ==========================================================================

  // =================================create methods======================================
  const createEntity = useCallback(
    (params: EntityCreationArgs) => {
      return state.managerContract.methods
        .createEntity(
          params.name,
          params.email,
          params.phoneNumber,
          entityTypeConversion[params.type]
        )
        .send({ from: state.account })
        .then(() => {
          updateEntities();
          getEntity(state.account);
        });
    },
    [state]
  );
  const createProduct = useCallback(
    (params: ProductCreationArgs) => {
      if (!state.entity.approved) {
        return EmptyPromise;
      }
      return state.managerContract.methods
        .createProduct(params.name)
        .send({ from: state.account });
    },
    [state]
  );
  // ==========================================================================

  // =================================special actions======================================
  const approveEntity = useCallback(
    (entityAddress: Address) => {
      if (!state.entity.approved) {
        return EmptyPromise;
      }
      return state.managerContract.methods
        .approveEntity(entityAddress)
        .send({ from: state.account })
        .then(() => updateEntities());
    },
    [state]
  );
  const purchaseProduct = useCallback(
    async (productAddress: string) => {
      if (!state.entity.approved) {
        return EmptyPromise;
      }
      const entities = state.entities.filter(
        (entity: Entity) =>
          entity.type === 'Warehouse' || entity.type === 'Transport'
      );
      const route = getRoute(entities, enqueueSnackbar);
      if (route === []) {
        return;
      }

      const productArray = state.products.filter(
        (product) => productAddress === product.id
      );

      if (productArray.length > 1) {
        throw new Error('Something is wrong');
      } else if (productArray.length === 0) {
        return EmptyPromise;
      }
      const product = productArray[0];
      route.unshift(product.creatorID);
      route.push(state.entity.id);

      const contractInstance = new state.web3.eth.Contract(
        ProductCompiledContract.abi as AbiItem[],
        productAddress
      );
      return contractInstance.methods
        .purchase(route, ManagerCompiledContract.networks[5777].address)
        .send({ from: state.account })
        .then(() => {
          updateProducts();
        });
    },
    [state]
  );

  const prepareProduct = useCallback(
    async (productAddress: string) => {
      if (!state.entity.approved) {
        return EmptyPromise;
      }
      const contractInstance = new state.web3.eth.Contract(
        ProductCompiledContract.abi as AbiItem[],
        productAddress
      );
      return contractInstance.methods
        .prepareDelivery()
        .send({ from: state.account })
        .then(() => {
          updateProducts();
        });
    },
    [state]
  );

  const timestampDeliveryStep = useCallback(
    (productAddress: string) => {
      if (!state.entity.approved) {
        return EmptyPromise;
      }
      const contractInstance = new state.web3.eth.Contract(
        ProductCompiledContract.abi as AbiItem[],
        productAddress
      );
      return contractInstance.methods
        .timestampDeliveryStep()
        .send({ from: state.account })
        .then(() => {
          updateProducts();
        });
    },
    [state]
  );

  // ==========================================================================
  return (
    <Provider
      value={{
        globalState: state,
        updateAccount,
        updateProducts,
        updateEntities,
        createEntity,
        approveEntity,
        createProduct,
        purchaseProduct,
        prepareProduct,
        timestampDeliveryStep
      }}
    >
      {children}
    </Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
