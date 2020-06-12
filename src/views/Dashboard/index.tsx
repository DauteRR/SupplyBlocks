import React, { useState, useCallback, useContext } from 'react';
import clsx from 'clsx';
import {
  useMediaQuery,
  makeStyles,
  Theme,
  useTheme,
  Button,
  Tooltip
} from '@material-ui/core';
import Topbar from '../../components/Topbar';
import Sidebar from '../../components/Sidebar';
import { GlobalContext } from '../../contexts/Global';
import { DashboardRoutes, ApplicationRoutes } from '../../routes';
import Footer from '../../components/Footer/Footer';
import DashboardBody from './body';
import { ErrorView } from '../Error';
import { useHistory } from 'react-router-dom';

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
