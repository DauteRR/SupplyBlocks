import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import WelcomeTopbar from './WelcomeTopbar';
import WelcomeJumbotron from './WelcomeJumbotron';
import Footer from '../../components/Footer/Footer';
import { Advantages, Agents, HowDoesItWork } from './WelcomeSections';
import { ScrollToTopButton } from '../../components/ScrollToTopButton';

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
  return (
    <div className={classes.root}>
      <WelcomeTopbar />
      <WelcomeJumbotron />
      <Advantages />
      <Agents />
      <HowDoesItWork />
      <ScrollToTopButton />
      <Footer background={'#FFFFFF'} />
    </div>
  );
};

export default WelcomeView;
