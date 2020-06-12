import {
  Button,
  Container,
  makeStyles,
  Theme,
  Tooltip
} from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext, isEmptyEntity } from '../../contexts/Global';
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
  const [redirectTarget, setRedirectTarget] = useState(
    ApplicationRoutes.signUp.path
  );
  const { globalState } = useContext(GlobalContext);
  let history = useHistory();

  useEffect(() => {
    const emptyEntity = isEmptyEntity(globalState.entity);
    setText(emptyEntity ? 'Join SupplyBlocks' : 'Enter dashboard');
    setRedirectTarget(
      emptyEntity
        ? ApplicationRoutes.signUp.path
        : ApplicationRoutes.dashboard.path
    );
  }, [globalState.entity]);

  const clickCallback = useCallback(() => {
    history.push(redirectTarget);
  }, [history, redirectTarget]);

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
