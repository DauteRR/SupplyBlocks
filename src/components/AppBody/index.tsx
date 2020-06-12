import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApplicationRoutes } from '../../routes';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%'
  }
}));

interface Props {}

export const AppBody: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <Switch>
          {Object.keys(ApplicationRoutes).map((key, index) => (
            <Route
              path={ApplicationRoutes[key].path}
              key={index}
              exact={ApplicationRoutes[key].exact}
            >
              {ApplicationRoutes[key].view}
            </Route>
          ))}
        </Switch>
      </Router>
    </div>
  );
};

export default AppBody;
