import {
  Container,
  Grid,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core';
import React from 'react';
import Timeline from '../../components/Timeline';
import { advantages, agents, getTimelineElements, ItemData } from './data';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  advantages: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  agents: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.secondary.light
  },
  howDoesItWork: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  agentsTitle: {
    color: 'white',
    margin: theme.spacing(4, 0)
  },
  advantagesTitle: {
    color: theme.palette.primary.main,
    margin: theme.spacing(4, 0)
  },
  howDoesItWorkTitle: {
    color: theme.palette.secondary.main,
    margin: theme.spacing(4, 0)
  },
  agentsSentence: {
    color: 'white',
    marginBottom: theme.spacing(4)
  },
  howDoesItWorkSentence: {
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(4)
  },
  itemsGrid: {
    margin: theme.spacing(2, 0)
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: theme.spacing(0, 6, 6)
  },
  itemImage: {
    width: 126,
    height: 126,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: theme.spacing(2)
  },
  agentLabel: {
    color: 'white'
  },
  advantageLabel: {
    color: theme.palette.primary.main
  }
}));

interface ItemProps extends ItemData {
  typographyClassname: string;
}

const Item: React.FC<ItemProps> = (props) => {
  const classes = useStyles();
  const { label, typographyClassname, src, text } = props;
  return (
    <div className={classes.item}>
      <div className={classes.itemImage}>
        <img alt={text} src={src}></img>
      </div>
      <Typography className={typographyClassname} variant="h5" align="center">
        {label}
      </Typography>
      {props.text && <Typography align="center">{props.text}</Typography>}
    </div>
  );
};

export const Agents: React.FC = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.agents}>
      <Typography className={classes.agentsTitle} align="center" variant="h4">
        Supply chain agents
      </Typography>
      <Container maxWidth="md">
        <Typography
          className={classes.agentsSentence}
          align="center"
          variant="h5"
        >
          SuppyBlocks usage is intended to aid supply chain management for
          different kind of companies:
        </Typography>
      </Container>
      <Grid className={classes.itemsGrid} container>
        {agents.map((agent, index) => (
          <Grid key={index} item xs={12} sm={6} lg={3}>
            <Item typographyClassname={classes.agentLabel} {...agent} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export const Advantages: React.FC = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.advantages}>
      <Typography
        className={classes.advantagesTitle}
        align="center"
        variant="h4"
      >
        Advantages
      </Typography>
      <Grid className={classes.itemsGrid} container>
        {advantages.map((agent, index) => (
          <Grid key={index} item xs={12} sm={6} lg={4}>
            <Item typographyClassname={classes.advantageLabel} {...agent} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export const HowDoesItWork: React.FC = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.howDoesItWork}>
      <Typography
        className={classes.howDoesItWorkTitle}
        align="center"
        variant="h4"
      >
        How does it work?
      </Typography>
      <Container maxWidth="md">
        <Typography
          className={classes.howDoesItWorkSentence}
          align="center"
          variant="h5"
        >
          The following timeline briefly illustrates how SupplyBlocks works.
          Every action described is timestamped and added to the blockchain:
        </Typography>
      </Container>
      <Timeline elements={getTimelineElements()} />
    </div>
  );
};
