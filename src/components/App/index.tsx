import React, { useEffect, useState, useContext, useCallback } from 'react';
import Web3 from 'web3';
import {
  makeStyles,
  Typography,
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core';
import LoadingSpinner from '../LoadingSpinner';
import { green, orange } from '@material-ui/core/colors';
import ErrorView from '../ErrorView';
import {
  GlobalContextProvider,
  GlobalContext
} from '../../contexts/GlobalContext';

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
    justifyContent: 'center',
    width: '100vw',
    height: '100vh'
  }
});

const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: green
  }
});

interface Props {}

export const App: React.FC<Props> = (props) => {
  const { globalState, dispatch } = useContext(GlobalContext);
  const classes = useStyles();
  const [connectionError, setConnectionError] = useState(false);
  const [metamaskError, setMetamaskError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState('');

  useEffect(() => {
    if (window.ethereum === undefined) {
      setMetamaskError(true);
      setLoading(false);
      return;
    } else {
      dispatch({
        type: 'SET_ACCOUNT',
        account: window.ethereum.selectedAddress
      });
      window.ethereum.on('accountsChanged', function (accounts: string[]) {
        dispatch({ type: 'SET_ACCOUNT', account: accounts[0] });
      });
    }
    globalState.web3.eth.net
      .isListening()
      .then((result) => {
        setLoading(false);
        setConnectionError(!result);
      })
      .catch((error) => {
        setLoading(false);
        setConnectionError(true);
      });
  }, [dispatch]);

  let appBody: JSX.Element = (
    <Typography align="center">
      Welcome {globalState.account} your balance is{' '}
      {globalState.web3.utils.fromWei(balance, 'ether')}
    </Typography>
  );

  if (globalState.account !== '') {
    globalState.web3.eth
      .getBalance(globalState.account)
      .then((accountBalance) => setBalance(accountBalance));
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
