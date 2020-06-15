import { Grid, makeStyles, Theme } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import CompanyCard from '../../../components/CompanyCard';
import Title from '../../../components/Title';
import { GlobalContext } from '../../../contexts';
import { Entity } from '../../../types/Entity';

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
}> = ({ companies }) => {
  const classes = useStyles();
  const { approveEntity } = useContext(GlobalContext);
  const [current, setCurrent] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const clickCallback = useCallback(
    (address: string) => {
      return () => {
        setCurrent(address);
        approveEntity(address)
          .then(() => {
            enqueueSnackbar('Approved', { variant: 'success' });
          })
          .catch(() => {
            enqueueSnackbar('Error', { variant: 'error' });
          })
          .finally(() => setCurrent(''));
      };
    },
    [approveEntity, enqueueSnackbar]
  );

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
          />
        </Grid>
      ))}
    </Grid>
  );
};

const splitCompanies = (entities: Entity[]) => {
  const pending = entities.filter((entity) => !entity.approved);
  const approved = entities.filter((entity) => entity.approved);

  return { pending, approved };
};

interface Props {}

const CompaniesView: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { globalState } = useContext(GlobalContext);
  const [companies, setCompanies] = useState<Entity[]>([]);
  const [pendingCompanies, setPendingCompanies] = useState<Entity[]>([]);
  const isAdmin = globalState.entity.type === 'Admin';

  useEffect(() => {
    const { pending, approved } = splitCompanies(globalState.entities);
    setCompanies(approved);
    setPendingCompanies(pending);
  }, [globalState.entities]);

  if (!globalState.entity.approved) {
    return <></>;
  }

  return (
    <div className={classes.root}>
      {isAdmin && pendingCompanies.length > 0 && (
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
