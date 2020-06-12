import {
  colors,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Tooltip
} from '@material-ui/core';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DashboardRoutes, ExtendedRoute } from '../../routes';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    marginBottom: theme.spacing(2)
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
    color: theme.palette.secondary.main,
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

  useEffect(() => {
    setActive(history.location.pathname);
  }, [history.location]);

  return (
    <List className={classes.root}>
      {Object.keys(pages).map((key, index) => {
        const page = pages[key];
        const activePage = page.path === active;
        return (
          <Tooltip key={index} title={page.label} aria-label={page.label}>
            <ListItem
              className={classes.button}
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
          </Tooltip>
        );
      })}
    </List>
  );
};

export default SidebarNav;
