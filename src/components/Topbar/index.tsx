import {
  AppBar,
  Hidden,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { ApplicationRoutes } from '../../routes';
import Logo from '../Logo';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  exitButton: {
    marginLeft: theme.spacing(1)
  },
  title: {
    color: 'white',
    marginLeft: theme.spacing(2)
  }
}));

interface Props {
  onSidebarOpen: () => void;
}

const Topbar: React.FC<Props> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });
  const { onSidebarOpen } = props;
  let history = useHistory();
  const clickCallback = useCallback(() => {
    history.push(ApplicationRoutes.welcome.path);
  }, [history]);

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <Logo width={100} smallDevicesWidth={60} breakpoint="md" />
        <Typography variant={isDesktop ? 'h4' : 'h5'} className={classes.title}>
          SupplyBlocks
        </Typography>
        <div className={classes.flexGrow} />
        <Tooltip title="Go back" aria-label="go-back">
          <IconButton
            className={classes.exitButton}
            onClick={clickCallback}
            color="inherit"
          >
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
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
