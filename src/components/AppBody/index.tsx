import React, { useContext } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { GlobalContext } from '../../contexts/Global';
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
  );
};

export default AppBody;
