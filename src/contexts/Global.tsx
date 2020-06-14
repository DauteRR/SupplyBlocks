import { OptionsObject, useSnackbar } from 'notistack';
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
import {
  getProductState,
  Product,
  ProductCreationArgs
} from '../types/Product';

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
  purchaseProduct: (address: Address) => Promise<any>;
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
  getProducts: () => new Promise<any>(() => {}),
  purchaseProduct: () => new Promise<any>(() => {})
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

const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getNRandom = (collection: any[], n: number) => {
  if (n < collection.length) {
    throw new Error(
      `Collection size too small, n = ${n} size = ${collection.length}`
    );
  }
  let selected = 0;
  const selection = [];
  while (selected < n) {
    const index = getRandomIntInclusive(0, collection.length);
    selection.push(collection[index]);
    collection.splice(index, 1);
    selected += 1;
  }

  return selection;
};

interface Route {
  transport: Entity[];
  warehouse: Entity[];
}

// Route estimation mock
const getRoute = (
  entities: Entity[],
  enqueueSnackbar: (
    message: React.ReactNode,
    options?: OptionsObject | undefined
  ) => React.ReactText
): Route => {
  const warehouseCount = entities.filter(
    (entity) => entity.type === 'Warehouse'
  ).length;
  const transportCount = entities.length - warehouseCount;
  const max = warehouseCount < transportCount ? warehouseCount : transportCount;

  if (max === 0) {
    enqueueSnackbar('Not enough transport/warehouse companies', {
      variant: 'error'
    });
    return { transport: [], warehouse: [] };
  }

  const transportSteps = max > 1 ? getRandomIntInclusive(1, max) : 1;
  console.log(transportSteps);
  const selectedTransportEntities: Entity[] = getNRandom(
    entities.filter((entity) => entity.type === 'Transport'),
    transportSteps
  );
  const selectedWarehousingEntities: Entity[] =
    transportSteps > 1
      ? getNRandom(
          entities.filter((entity) => entity.type === 'Warehouse'),
          transportSteps - 1
        )
      : [];

  return {
    transport: selectedTransportEntities,
    warehouse: selectedWarehousingEntities
  };
};

const GlobalContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const { enqueueSnackbar } = useSnackbar();

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
      id: obj.id,
      name: obj.name,
      state: getProductState(parseInt(obj.state)),
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

  const calculateRoute = useCallback(async (): Promise<Route> => {
    const route: Route = await getEntities().then((result: any) => {
      const entities: Entity[] = result
        .map(convertEntity)
        .filter(
          (entity: Entity) =>
            entity.type === 'Warehouse' || entity.type === 'Transport'
        );

      return getRoute(entities, enqueueSnackbar);
    });

    return route;
  }, []);

  const purchaseProduct = useCallback(
    async (productAddress: string) => {
      const route = await calculateRoute();
      // TODO: CHECK
      return state.managerContract.methods
        .purchaseProduct(productAddress, route.transport, route.warehouse)
        .call({ from: state.account });
    },
    [state]
  );

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
        convertProduct,
        purchaseProduct
      }}
    >
      {children}
    </Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
