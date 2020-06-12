import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ApplicationRoutes, DashboardRoutes } from '../../routes';

interface Props {
  pages: DashboardRoutes;
}

const DashboardBody: React.FC<Props> = (props) => {
  const { pages } = props;

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
