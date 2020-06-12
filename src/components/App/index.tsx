import {
  Button,
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  EntityContractContext,
  EntityContractContextProvider
} from '../../contexts/EntityContract';
import { GlobalContext, GlobalContextProvider } from '../../contexts/Global';
import { useInterval } from '../../hooks/useInterval';
import ErrorView from '../../views/Error';
import AppBody from '../AppBody';

declare global {
  interface Window {
    ethereum: any;
  }
}

window.ethereum = window.ethereum || undefined;

const useStyles = makeStyles({
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  button: {
    maxWidth: 200,
    color: 'white'
  }
});

const theme = createMuiTheme({
  palette: {
    primary: { main: '#558bc4ff' },
    secondary: { main: '#00ae9aff' },
    error: { main: '#f44336' }
  }
});

const SetOnAccountChange = (callback: (accounts: string[]) => void) => {
  window.ethereum.on('accountsChanged', callback);
};

interface Props {}

export const App: React.FC<Props> = (props) => {
  const { globalState, dispatch } = useContext(GlobalContext);
  const classes = useStyles();
  const [connectionError, setConnectionError] = useState(false);
  const [web3ProviderError, setWeb3ProviderError] = useState(false);
  const [isMetamaskEnabled, setIsMetamaskEnabled] = useState(true);
  const { web3 } = globalState;
  const entityContractContext = useContext(EntityContractContext);

  const UpdateAccount = useCallback(
    (address: string) =>
      dispatch({
        type: 'SET_ACCOUNT',
        account: address
      }),
    []
  );

  const CheckMetamask = useCallback(() => {
    if (!window.ethereum) {
      setWeb3ProviderError(true);
    }
    setIsMetamaskEnabled(window.ethereum.selectedAddress);
  }, []);

  const enableMetamaskCallback = useCallback(() => {
    window.ethereum
      .enable()
      .then(() => setIsMetamaskEnabled(true))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (isMetamaskEnabled) {
      UpdateAccount(window.ethereum.selectedAddress);
    }
  }, [isMetamaskEnabled]);

  const CheckConnection = useCallback(() => {
    web3.eth.net.isListening().catch(() => {
      setConnectionError(true);
    });
  }, []);

  useInterval(CheckConnection, 5000);
  useInterval(CheckMetamask, 5000);

  useEffect(() => {
    SetOnAccountChange((accounts: string[]) => {
      UpdateAccount(accounts[0]);
      if (accounts.length === 0) {
        setIsMetamaskEnabled(false);
      }
    });
    entityContractContext.dispatch({ type: 'INITIALIZE', web3: web3 });
  }, []);

  useEffect(() => {
    entityContractContext.getEntity(globalState.account).then((entity) => {
      if (entity) {
        dispatch({ type: 'SET_ENTITY', entity: entity });
      }
    });
  }, [entityContractContext.state, globalState.account]);

  let appBody: JSX.Element = <AppBody />;

  if (!isMetamaskEnabled) {
    appBody = (
      <ErrorView
        errorName="Metamask"
        errorMessage="In order to use the dapp Metamask should have account authorization"
      >
        <Button
          color="secondary"
          className={classes.button}
          variant="contained"
          onClick={enableMetamaskCallback}
        >
          Enable Metamask
        </Button>
      </ErrorView>
    );
  }

  if (web3ProviderError) {
    appBody = (
      <ErrorView
        errorName="Web3 provider"
        errorMessage="Metamask not found"
      ></ErrorView>
    );
  }

  if (connectionError) {
    appBody = (
      <ErrorView
        errorName="Connection"
        errorMessage="Start Ganache and configure Metamask network"
      ></ErrorView>
    );
  }

  return <div className={classes.appContainer}>{appBody}</div>;
};

const WrappedApp: React.FC = () => (
  <GlobalContextProvider>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        preventDuplicate
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={3000}
      >
        <EntityContractContextProvider>
          <App />
        </EntityContractContextProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </GlobalContextProvider>
);

export default WrappedApp;
