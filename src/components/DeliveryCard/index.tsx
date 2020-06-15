import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Collapse,
  IconButton,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
  useTheme
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import React, { useCallback, useContext, useState } from 'react';
import { GlobalContext } from '../../contexts';
import { Product } from '../../types/Product';
import { convertProduct, getTimelineElements } from '../../utils';
import ProductStateChip from '../ProductStateChip';
import Timeline from '../Timeline';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    width: '100%'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2)
  },
  deliveryState: {
    marginRight: theme.spacing(2)
  },
  grow: {
    flexGrow: 1
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  cardContent: {
    padding: 0,
    '&:last-child': {
      padding: 0
    }
  },
  wrapper: {
    marginRight: theme.spacing(2),
    position: 'relative'
  },
  button: {
    color: 'white'
  },
  buttonProgress: {
    color: theme.palette.secondary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  timelineContainer: {
    padding: theme.spacing(2)
  }
}));

interface TimestampButtonProps {
  onClickCallback: () => void;
  disabled: boolean;
  transacting: boolean;
}

const TimestampButton: React.FC<TimestampButtonProps> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Tooltip title="Timestamp" aria-label={'timestamp'}>
        <div>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={props.onClickCallback}
            disabled={props.disabled || props.transacting}
          >
            Timestamp
          </Button>
        </div>
      </Tooltip>
      {props.transacting && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

const DeliveryTimeline: React.FC<{ delivery: Product }> = ({ delivery }) => {
  const { globalState } = useContext(GlobalContext);
  const theme = useTheme();
  return (
    <Timeline
      elements={getTimelineElements(delivery, globalState.entities, theme)}
    />
  );
};

interface Props extends Product {
  onTimestampCallback: () => void;
  disabled: boolean;
  transacting: boolean;
}

const DeliveryCard: React.FC<Props> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const {
    name,
    state,
    deliveryEntities,
    deliveryStep,
    onTimestampCallback
  } = props;
  const { globalState } = useContext(GlobalContext);
  // TODO: CHANGE
  const [expanded, setExpanded] = useState(true);

  const handleExpandClick = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  const nextEntity = deliveryEntities[deliveryStep] === globalState.account;

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <div className={classes.cardHeader}>
          <div className={classes.deliveryState}>
            <ProductStateChip state={state} showIcon />
          </div>
          <Typography variant="h5" noWrap>
            {name}
          </Typography>
          <div className={classes.grow} />
          {nextEntity && (
            <TimestampButton
              onClickCallback={onTimestampCallback}
              disabled={props.disabled}
              transacting={props.transacting}
            />
          )}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <div className={classes.timelineContainer}>
            <DeliveryTimeline delivery={convertProduct(props)} />
          </div>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default DeliveryCard;
