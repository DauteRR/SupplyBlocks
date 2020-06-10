import React, { useContext } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { GlobalContext } from '../../contexts/GlobalContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApplicationRoutes } from '../../routes';

const useStyles = makeStyles<Theme>((theme: Theme) => ({}));

interface Props {}

export const AppBody: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { globalState } = useContext(GlobalContext);
  const { account } = globalState;

  return (
    <Router>
      <Switch>
        {ApplicationRoutes.map((route, index) => (
          <Route path={route.path} key={index} exact={route.exact}>
            {route.component}
          </Route>
        ))}
      </Switch>
    </Router>
  );
};

export default AppBody;
