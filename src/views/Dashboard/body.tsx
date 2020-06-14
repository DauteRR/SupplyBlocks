import React from 'react';
import { Route } from 'react-router-dom';
import { DashboardRoutes } from '../../routes';

interface Props {
  pages: DashboardRoutes;
}

const DashboardBody: React.FC<Props> = (props) => {
  const { pages } = props;

  return (
    <>
      {Object.keys(pages).map((key, index) => (
        <Route path={pages[key].path} key={index} exact={pages[key].exact}>
          {pages[key].view}
        </Route>
      ))}
    </>
  );
};

export default DashboardBody;
