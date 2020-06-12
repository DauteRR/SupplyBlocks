import {
  Divider,
  Drawer,
  DrawerProps,
  makeStyles,
  Theme
} from '@material-ui/core';
import React from 'react';
import { DashboardRoutes } from '../../routes';
import Profile from '../Profile';
import SidebarNav from '../SidebarNav';

const useStyles = makeStyles<Theme>((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  }
}));

interface Props {
  onClose: () => void;
  variant: DrawerProps['variant'];
  open: boolean;
}

const Sidebar: React.FC<Props> = (props) => {
  const { open, variant, onClose } = props;

  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div className={classes.root}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav pages={DashboardRoutes} />
      </div>
    </Drawer>
  );
};

export default Sidebar;
