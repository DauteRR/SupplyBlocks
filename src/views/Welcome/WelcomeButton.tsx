import {
  Button,
  Container,
  makeStyles,
  Theme,
  Tooltip
} from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../contexts/Global';
import { ApplicationRoutes } from '../../routes';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    margin: theme.spacing(6, 0, 2)
  },
  button: {
    minHeight: theme.spacing(8),
    color: 'white'
  }
}));

interface Props {}

export const JoinButton: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [text, setText] = useState('Join SupplyBlocks');
  const { globalState } = useContext(GlobalContext);
  let history = useHistory();

  const clickCallback = useCallback(() => {
    history.push(
      globalState.entity.approved
        ? ApplicationRoutes.dashboard.path
        : ApplicationRoutes.signUp.path
    );
  }, [history, globalState.entity]);

  useEffect(() => {
    setText(
      globalState.entity.approved ? 'Enter dashboard' : 'Join SupplyBlocks'
    );
  }, [globalState.entity]);

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Tooltip title={text} aria-label={text}>
        <Button
          className={classes.button}
          fullWidth
          variant="contained"
          color="secondary"
          onClick={clickCallback}
        >
          {text}
        </Button>
      </Tooltip>
    </Container>
  );
};

export default JoinButton;
