import React, { useState, useCallback, useContext } from 'react';
import clsx from 'clsx';
import { useMediaQuery, makeStyles, Theme, useTheme } from '@material-ui/core';
import Topbar from '../../components/Topbar';
import Sidebar from '../../components/Sidebar';
import { GlobalContext } from '../../contexts/Global';
import { DashboardRoutes } from '../../routes';
import Footer from '../../components/Footer/Footer';
import DashboardBody from './body';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    display: 'flex',
    width: '100%',
    height: '100%',
    paddingLeft: 240
  },
  content: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    padding: theme.spacing(2)
  },
  flexGrow: {
    flex: 1
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

  if (!globalState.entity.set) {
    //TODO: Redirect "smoothly" to /sign-up
  }

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
      <main className={classes.content}>
        <DashboardBody pages={DashboardRoutes} />
        <div className={classes.flexGrow} />
        <Footer background={'#FFFFFF'} />
      </main>
    </div>
  );
};

export default Dashboard;
