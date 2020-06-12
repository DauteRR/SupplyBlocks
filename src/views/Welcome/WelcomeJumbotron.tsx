import {
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import React from 'react';
import Logo from '../../components/Logo';
import JoinButton from './WelcomeButton';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.main,
    minHeight: 600
  },
  sentence: {
    color: 'white',
    margin: theme.spacing(4, 0)
  }
}));

interface Props {}

export const WelcomeJumbotron: React.FC<Props> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.root}>
      <Logo width={400} smallDevicesWidth={300}></Logo>
      <Typography
        className={classes.sentence}
        align="center"
        variant={smallDevice ? 'h5' : 'h4'}
      >
        Blockchain applied to supply chain orchestration.
      </Typography>
      <JoinButton />
    </div>
  );
};

export default WelcomeJumbotron;
