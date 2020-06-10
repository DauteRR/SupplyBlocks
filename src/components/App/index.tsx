import React, { useEffect, useState, useContext, useCallback } from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import LoadingSpinner from '../LoadingSpinner';
import { orange } from '@material-ui/core/colors';
import ErrorView from '../ErrorView';
import {
  GlobalContextProvider,
  GlobalContext
} from '../../contexts/GlobalContext';
import EnableMetamask from '../EnableMetamask';
import { useInterval } from '../../hooks/useInterval';
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
    width: '100vw'
  }
});

const theme = createMuiTheme({
  palette: {
    primary: orange
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
  const [metamaskError, setMetamaskError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMetamaskEnabled, setIsMetamaskEnabled] = useState(false);
  const { web3 } = globalState;

  const UpdateAccount = useCallback(
    (address: string) =>
      dispatch({
        type: 'SET_ACCOUNT',
        account: address
      }),
    []
  );

  // TODO: Ensure that Metamask is enabled
  const CheckMetamask = useCallback(() => window.ethereum.selectedAddress, []);

  useEffect(() => {
    if (isMetamaskEnabled) {
      UpdateAccount(window.ethereum.selectedAddress);
    }
  }, [isMetamaskEnabled]);

  const CheckConnection = useCallback(() => {
    web3.eth.net
      .isListening()
      .then((result) => {
        setLoading(false);
        setConnectionError(!result);
      })
      .catch((error) => {
        setLoading(false);
        setConnectionError(true);
      });
  }, []);

  // TODO: Tune frequency
  useInterval(CheckConnection, 30000);

  useEffect(() => {
    if (window.ethereum === undefined) {
      setMetamaskError(true);
      setLoading(false);
      return;
    }
    CheckConnection();
    setIsMetamaskEnabled(CheckMetamask());
    SetOnAccountChange((accounts: string[]) => {
      UpdateAccount(accounts[0]);
      if (accounts.length === 0) {
        setIsMetamaskEnabled(false);
      }
    });
  }, []);

  let appBody: JSX.Element = <AppBody />;

  if (!isMetamaskEnabled) {
    appBody = <EnableMetamask flagSetter={setIsMetamaskEnabled} />;
  }

  if (metamaskError) {
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

  if (loading) {
    appBody = <LoadingSpinner />;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.appContainer}>{appBody}</div>
    </ThemeProvider>
  );
};

const WrappedApp: React.FC = () => (
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>
);

export default WrappedApp;
