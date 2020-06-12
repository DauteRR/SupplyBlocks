import {
  Button,
  makeStyles,
  Theme,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import clsx from 'clsx';
import React, { useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import { GlobalContext } from '../../contexts/Global';
import { ApplicationRoutes, DashboardRoutes } from '../../routes';
import { ErrorView } from '../Error';
import DashboardBody from './body';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    paddingTop: 56,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    display: 'flex',
    width: '100%',
    paddingLeft: 240
  },
  content: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column'
  },
  flexGrow: {
    flex: 1
  },
  signUpButton: {
    maxWidth: 200,
    color: 'white'
  }
}));

const Dashboard: React.FC = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });
  const [openSidebar, setOpenSidebar] = useState(false);
  const { globalState } = useContext(GlobalContext);
  let history = useHistory();
  const clickCallback = useCallback(() => {
    history.push(ApplicationRoutes.signUp.path);
  }, [history]);

  const handleSidebarOpen = useCallback(() => {
    setOpenSidebar(true);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setOpenSidebar(false);
  }, []);

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <div className={classes.content}>
        {globalState.entity.approved ? (
          <>
            <DashboardBody pages={DashboardRoutes} />
            <div className={classes.flexGrow} />
            <Footer background={'#FFFFFF'} />
          </>
        ) : (
          <ErrorView
            errorName="Unauthorized"
            errorMessage="Create an account and wait for SupplyBlocks admin approval before using dashboard"
          >
            <Tooltip title="Sign up" aria-label="sign-up">
              <Button
                className={classes.signUpButton}
                fullWidth
                variant="contained"
                onClick={clickCallback}
                color="secondary"
              >
                Sign up
              </Button>
            </Tooltip>
          </ErrorView>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
