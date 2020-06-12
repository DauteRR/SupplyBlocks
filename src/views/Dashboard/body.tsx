import React from 'react';
import { makeStyles, Theme, Container } from '@material-ui/core';
import { DashboardRoutes, ApplicationRoutes } from '../../routes';
import { Route, Redirect } from 'react-router-dom';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {}
}));

interface Props {
  pages: DashboardRoutes;
}

const DashboardBody: React.FC<Props> = (props) => {
  const { pages } = props;
  const classes = useStyles();

  return (
    <>
      <Redirect
        from={ApplicationRoutes.dashboard.path}
        to={pages.companies.path}
      />
      {Object.keys(pages).map((key, index) => (
        <Route path={pages[key].path} key={index} exact={pages[key].exact}>
          {pages[key].view}
        </Route>
      ))}
    </>
  );
};

export default DashboardBody;
