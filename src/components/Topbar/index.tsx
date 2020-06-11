import React, { useState, useCallback } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Badge,
  Hidden,
  IconButton,
  makeStyles,
  Theme,
  Button,
  Tooltip
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from '../Logo';
import { ApplicationRoutes } from '../../routes';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  exitButton: {
    marginLeft: theme.spacing(1)
  }
}));

interface Props {
  onSidebarOpen: () => void;
}

const Topbar: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { onSidebarOpen } = props;
  let history = useHistory();
  const clickCallback = useCallback(() => {
    history.push(ApplicationRoutes.welcome.path);
  }, [history]);

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <Logo width={40} smallDevicesWidth={40} />
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <Tooltip title="Go back" aria-label="go-back">
            <IconButton
              className={classes.exitButton}
              onClick={clickCallback}
              color="inherit"
            >
              <InputIcon />
            </IconButton>
          </Tooltip>
        </Hidden>
        <Hidden lgUp>
          <Tooltip title="Toggle menu" aria-label="toggle-menu">
            <IconButton color="inherit" onClick={onSidebarOpen}>
              <MenuIcon />
            </IconButton>
          </Tooltip>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
