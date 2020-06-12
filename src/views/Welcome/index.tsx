import React from 'react';
import {
  makeStyles,
  Theme,
  useTheme,
  useMediaQuery,
  AppBar
} from '@material-ui/core';
import WelcomeTopbar from './WelcomeTopbar';
import WelcomeJumbotron from './WelcomeJumbotron';
import Footer from '../../components/Footer/Footer';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  }
}));

interface Props {}

export const WelcomeView: React.FC<Props> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.root}>
      <WelcomeTopbar />
      <WelcomeJumbotron />
      {/* <Footer background={'#352f2f'} /> */}
      <Footer background={'#FFFFFF'} />
    </div>
  );
};

export default WelcomeView;
