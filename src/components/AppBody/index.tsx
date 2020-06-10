import React, { useContext } from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import { GlobalContext } from '../../contexts/GlobalContext';

const useStyles = makeStyles<Theme>((theme: Theme) => ({}));

interface Props {}

export const AppBody: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { globalState } = useContext(GlobalContext);
  const { account } = globalState;

  return (
    <>
      <Typography align="center">Welcome {account}</Typography>
    </>
  );
};

export default AppBody;
