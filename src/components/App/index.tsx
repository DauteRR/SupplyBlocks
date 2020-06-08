import React, { useEffect, useState, useContext } from 'react';
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

// FIXME: Only if ethereum property is defined
window.ethereum.on('accountsChanged', function (accounts: any) {
  // Time to reload your interface with accounts[0]!
  console.log('Metamask account changed');
});

export const App: React.FC<Props> = (props) => {
  const { dispatch } = useContext(GlobalContext);
  const classes = useStyles();
  const [connectionError, setConnectionError] = useState(false);
  const [metamaskError, setMetamaskError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.ethereum === undefined) {
      setMetamaskError(true);
      return;
    }
    const web3 = new Web3(Web3.givenProvider);
    dispatch({ type: 'SET_WEB3', web3: web3 });
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
  }, [dispatch]);

  let appBody: JSX.Element = <Typography>Success!!</Typography>;

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
