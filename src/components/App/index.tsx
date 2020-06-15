import {
  Button,
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from '@material-ui/core';
import { OptionsObject, SnackbarProvider, useSnackbar } from 'notistack';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { GlobalContext, GlobalContextProvider } from '../../contexts';
import { useInterval } from '../../hooks/useInterval';
import ErrorView from '../../views/Error';
import { AppBody } from '../AppBody';

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

type useStateBooleanSetter = React.Dispatch<React.SetStateAction<boolean>>;

const OnAccountChange = (
  updateAccount: (account: string) => void,
  enqueueSnackbar: (
    message: React.ReactNode,
    options?: OptionsObject | undefined
  ) => string | number,
  metamaskEnabledSetter: useStateBooleanSetter,
  web3: Web3
) => {
  window.ethereum.on('accountsChanged', () => {
    web3.eth.getAccounts((error, accounts) => {
      updateAccount(accounts[0]);
      if (accounts.length === 0) {
        metamaskEnabledSetter(false);
        enqueueSnackbar('Metamask disconnected', { variant: 'error' });
      } else {
        enqueueSnackbar('Account change', { variant: 'info' });
      }
    });
  });
};

const CheckMetamask = (
  valueSetter: useStateBooleanSetter,
  errorSetter: useStateBooleanSetter
) => () => {
  if (!window.ethereum) {
    errorSetter(true);
  }
  valueSetter(window.ethereum.selectedAddress);
};

const CheckConnection = (
  web3: Web3,
  errorSetter: useStateBooleanSetter
) => () => {
  web3.eth.net.isListening().catch(() => {
    errorSetter(true);
  });
};

const EnableMetamask = (
  metamaskEnabledSetter: useStateBooleanSetter,
  enqueueSnackbar: (
    message: React.ReactNode,
    options?: OptionsObject | undefined
  ) => string | number
) => () => {
  window.ethereum
    .enable()
    .then(() => {
      metamaskEnabledSetter(true);
      enqueueSnackbar('Metamask enabled', { variant: 'success' });
    })
    .catch(() => {
      metamaskEnabledSetter(false);
      enqueueSnackbar('Error enabling Metamask', { variant: 'error' });
    });
};

interface Props {}

export const App: React.FC<Props> = (props) => {
  const { globalState, updateAccount } = useContext(GlobalContext);
  const classes = useStyles();
  const [connectionError, setConnectionError] = useState(false);
  const [web3ProviderError, setWeb3ProviderError] = useState(false);
  const { web3 } = globalState;
  const { enqueueSnackbar } = useSnackbar();
  const [isMetamaskEnabled, setIsMetamaskEnabled] = useState(true);

  // On component mount
  useEffect(() => {
    CheckMetamask(setIsMetamaskEnabled, setWeb3ProviderError);
  }, []);

  const checkMetamask = useCallback(
    CheckMetamask(setIsMetamaskEnabled, setWeb3ProviderError),
    []
  );

  const checkConnection = useCallback(
    CheckConnection(web3, setConnectionError),
    [web3]
  );
  useInterval(checkConnection, 3000);
  useInterval(checkMetamask, 3000);

  useEffect(() => {
    OnAccountChange(updateAccount, enqueueSnackbar, setIsMetamaskEnabled, web3);
  }, [updateAccount, enqueueSnackbar, web3]);

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
          onClick={EnableMetamask(setIsMetamaskEnabled, enqueueSnackbar)}
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
  <ThemeProvider theme={theme}>
    <SnackbarProvider
      maxSnack={3}
      preventDuplicate
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      autoHideDuration={3000}
    >
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </SnackbarProvider>
  </ThemeProvider>
);

export default WrappedApp;
