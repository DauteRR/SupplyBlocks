import React, { useEffect, useState } from 'react';
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
    web3.eth.net
      .isListening()
      .then(console.log)
      .catch((err) => setConnectionError(true));
  }, []);

  let appBody: JSX.Element = <Typography>Success!!</Typography>;

  if (loading) {
    appBody = <LoadingSpinner />;
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

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.appContainer}>{appBody}</div>
    </ThemeProvider>
  );
};

export default App;
