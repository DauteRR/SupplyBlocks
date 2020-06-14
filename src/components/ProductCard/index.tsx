import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
  useTheme
} from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import React from 'react';
import { defaultAddress, getEntityTypesData } from '../../types';
import { Product } from '../../types/Product';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    padding: theme.spacing(2),
    maxWidth: 400,
    width: '100%'
  },
  button: {
    color: 'white'
  },
  address: {
    fontSize: 10
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1)
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  header: {
    marginBottom: theme.spacing(3)
  },
  cardActions: {
    justifyContent: 'center',
    padding: 0
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  wrapper: {
    margin: theme.spacing(3, 0, 2),
    position: 'relative'
  },
  buttonProgress: {
    color: theme.palette.secondary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  cardContent: {
    padding: 0
  }
}));

interface InfoItemProps {
  text: string;
  icon: JSX.Element | React.Component;
  textClassName?: string;
}

const customStyles = (color: string) => {
  const customUseStyles = makeStyles(() => ({
    companyName: {
      color: color
    }
  }));
  const customClasses = customUseStyles();
  return customClasses;
};

const InfoItem: React.FC<InfoItemProps> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.infoItem}>
      {props.icon}
      <Typography className={props.textClassName} noWrap>
        {props.text}
      </Typography>
    </div>
  );
};

interface CardButtonProps {
  onClickCallback: () => void;
  disabled: boolean;
  transacting: boolean;
}

const CardButton: React.FC<CardButtonProps> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Tooltip title="Purchase product" aria-label="purchase-product">
        <div>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={props.onClickCallback}
            disabled={props.disabled || props.transacting}
          >
            Purchase
          </Button>
        </div>
      </Tooltip>
      {props.transacting && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

interface Props extends Product {
  onClickCallback: () => void;
  disabled: boolean;
  transacting: boolean;
}

const ProductCard: React.FC<Props> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const {
    name,
    id,
    creatorID,
    creationTimestamp,
    purchaserID,
    deliveryTimestamp,
    onClickCallback
  } = props;

  const purchased = purchaserID !== defaultAddress;

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Grid container className={classes.header}>
          <Typography variant="h5" color="primary" noWrap>
            {name}
          </Typography>
        </Grid>
        <InfoItem
          text={id}
          textClassName={classes.address}
          icon={<FingerprintIcon className={classes.icon} color="primary" />}
        />
        <InfoItem
          text={creatorID}
          textClassName={classes.address}
          icon={
            getEntityTypesData({
              color: theme.palette.primary.main,
              fontSize: 24,
              marginRight: theme.spacing(1)
            }).Factory.icon
          }
        />
        <InfoItem
          text={creationTimestamp.toUTCString()}
          icon={<EventIcon className={classes.icon} color="primary" />}
        />
        {purchased && (
          <InfoItem
            text={purchaserID!}
            textClassName={classes.address}
            icon={
              getEntityTypesData({
                color: theme.palette.primary.main,
                fontSize: 24,
                marginRight: theme.spacing(1)
              }).Retailer.icon
            }
          />
        )}
        {purchased && (
          <InfoItem
            text={deliveryTimestamp!.toUTCString()}
            icon={<EventIcon className={classes.icon} color="primary" />}
          />
        )}
      </CardContent>
      {!purchased && (
        <CardActions className={classes.cardActions}>
          <CardButton
            onClickCallback={onClickCallback}
            transacting={props.transacting}
            disabled={props.disabled}
          />
        </CardActions>
      )}
    </Card>
  );
};

export default ProductCard;