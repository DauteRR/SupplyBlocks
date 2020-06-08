import React, { useEffect, useState, useContext } from 'react';
import Web3 from 'web3';
import {
  makeStyles,
  Typography,
  createMuiTheme,
  ThemeProvider,
  useMediaQuery
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
  const { dispatch } = useContext(GlobalContext);
  const classes = useStyles();
  const [connectionError, setConnectionError] = useState(false);
  const [metamaskError, setMetamaskError] = useState(false);
  const [loading, setLoading] = useState(true);

  const smallDevice = useMediaQuery(theme.breakpoints.down('sm'));
  console.log(smallDevice);

  useEffect(() => {
    if (window.ethereum === undefined) {
      setMetamaskError(true);
      return;
    }
    const web3 = new Web3(Web3.givenProvider);
    dispatch({ type: 'SET_WEB3', web3: web3 });

    // TODO: Check connection with Ganache
    // setLoading(false);
    setConnectionError(true);
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

const WrappedApp: React.FC = () => (
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>
);

export default WrappedApp;
