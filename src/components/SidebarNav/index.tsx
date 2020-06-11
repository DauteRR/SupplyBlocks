import React, { forwardRef, useState, useCallback, useEffect } from 'react';
import {
  List,
  ListItem,
  colors,
  makeStyles,
  Theme,
  ListItemIcon,
  ListItemText,
  ListItemProps
} from '@material-ui/core';
import { DashboardRoutes, ExtendedRoute } from '../../routes';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '6px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    width: 24,
    minWidth: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  label: {
    '& span': {
      fontSize: 16
    }
  },
  active: {
    color: theme.palette.primary.main,
    '& span': {
      fontSize: 18
    }
  }
}));

interface Props {
  pages: DashboardRoutes;
}

const SidebarNav: React.FC<Props> = (props) => {
  const { pages } = props;
  const classes = useStyles();
  let history = useHistory();
  const [active, setActive] = useState(history.location.pathname);

  const clickCallback = useCallback(
    (page: ExtendedRoute) => (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      setActive(page.path);
      history.push(page.path);
    },
    [history]
  );

  return (
    <List className={classes.root}>
      {Object.keys(pages).map((key, index) => {
        const page = pages[key];
        const activePage = page.path == active;
        return (
          <ListItem
            className={classes.button}
            key={index}
            button
            onClick={clickCallback(page)}
          >
            <ListItemIcon
              className={clsx({
                [classes.icon]: true,
                [classes.active]: activePage
              })}
            >
              {page.icon}
            </ListItemIcon>
            <ListItemText
              className={clsx({
                [classes.label]: true,
                [classes.active]: activePage
              })}
              primary={page.label}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default SidebarNav;
