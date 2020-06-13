import { Grid, makeStyles, Theme } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import CompanyCard from '../../../components/CompanyCard';
import Title from '../../../components/Title';
import { EntityContractContext } from '../../../contexts/EntityContract';
import { GlobalContext } from '../../../contexts/Global';
import { Entity, getEntityType } from '../../../types/Entity';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  grid: {
    margin: theme.spacing(2, 0)
  },
  gridItem: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  }
}));

const CompaniesList: React.FC<{ companies: Entity[] }> = ({ companies }) => {
  const classes = useStyles();

  const clickCallback = useCallback((address: string) => {
    return () => {
      console.log(address);
    };
  }, []);

  return (
    <Grid className={classes.grid} container>
      {companies.map((company, index) => (
        <Grid
          key={index}
          className={classes.gridItem}
          item
          xs={12}
          sm={6}
          md={4}
        >
          <CompanyCard
            onClickCallback={clickCallback(company.id)}
            {...company}
          ></CompanyCard>
        </Grid>
      ))}
    </Grid>
  );
};

const filterCompanies = (entities: Entity[]) => {
  const pending = entities.filter((entity) => !entity.approved);
  const approved = entities.filter((entity) => entity.approved);

  return { pending, approved };
};

interface Props {}

const CompaniesView: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { globalState } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const { state, convertEntity } = useContext(EntityContractContext);
  const [companies, setCompanies] = useState<Entity[]>([]);
  const [pendingCompanies, setPendingCompanies] = useState<Entity[]>([]);
  const isAdmin = getEntityType(globalState.entity.type) === 'Admin';

  useEffect(() => {
    state.contract.methods
      .getEntities()
      .call()
      .then((result: any[]) => {
        const { pending, approved } = filterCompanies(
          result.map(convertEntity)
        );
        setCompanies(approved);
        isAdmin && setPendingCompanies(pending);
        setIsLoading(false);
      });
  }, [state, isAdmin]);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className={classes.root}>
      {isAdmin && (
        <>
          <Title title={'Pending'} />
          <CompaniesList companies={pendingCompanies} />
        </>
      )}
      <Title title={'Companies'} />
      <CompaniesList companies={companies} />
    </div>
  );
};

export default CompaniesView;
