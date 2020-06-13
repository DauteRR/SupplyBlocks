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

const CompaniesList: React.FC<{
  companies: Entity[];
  updateCallback: () => void;
}> = ({ companies, updateCallback }) => {
  const classes = useStyles();
  const { globalState } = useContext(GlobalContext);
  const { approveEntity } = useContext(EntityContractContext);
  const [current, setCurrent] = useState('');

  const clickCallback = useCallback((address: string) => {
    return () => {
      setCurrent(address);
      approveEntity(globalState.account, address)
        .then(updateCallback)
        .finally(() => setCurrent(''));
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
            disabled={current !== company.id && current !== ''}
            transacting={current === company.id}
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
  const { state, convertEntity } = useContext(EntityContractContext);
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState<Entity[]>([]);
  const [pendingCompanies, setPendingCompanies] = useState<Entity[]>([]);
  const isAdmin = getEntityType(globalState.entity.type) === 'Admin';

  const UpdateCompanies = () => {
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
  };

  useEffect(UpdateCompanies, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className={classes.root}>
      {isAdmin && pendingCompanies.length > 0 && (
        <>
          <Title title={'Pending'} />
          <CompaniesList
            companies={pendingCompanies}
            updateCallback={UpdateCompanies}
          />
        </>
      )}
      <Title title={'Companies'} />
      <CompaniesList companies={companies} updateCallback={UpdateCompanies} />
    </div>
  );
};

export default CompaniesView;
