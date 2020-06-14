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
  Typography
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import PhoneIcon from '@material-ui/icons/Phone';
import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/Global';
import { Entity, getEntityTypesData } from '../../types/Entity';
import EntityTypeChip from '../EntityTypeChip';

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
  cardActions: {
    justifyContent: 'center',
    padding: 0
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  header: {
    marginBottom: theme.spacing(3)
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
      <Tooltip title="Accept company" aria-label="accept-company">
        <div>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={props.onClickCallback}
            disabled={props.disabled || props.transacting}
          >
            Accept
          </Button>
        </div>
      </Tooltip>
      {props.transacting && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

interface Props extends Entity {
  onClickCallback: () => void;
  disabled: boolean;
  transacting: boolean;
}

const CompanyCard: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { globalState } = useContext(GlobalContext);
  const {
    email,
    name,
    phoneNumber,
    type,
    approved,
    id,
    onClickCallback
  } = props;

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Grid container className={classes.header}>
          <Grid item xs={8}>
            <Typography
              variant="h5"
              noWrap
              className={
                customStyles(getEntityTypesData('', 0)[type].color).companyName
              }
            >
              {name}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.chipContainer}>
              <EntityTypeChip type={type} showIcon />
            </div>
          </Grid>
        </Grid>
        <InfoItem
          text={id}
          textClassName={classes.address}
          icon={<FingerprintIcon className={classes.icon} color="primary" />}
        />
        <InfoItem
          text={email}
          icon={<EmailIcon className={classes.icon} color="primary" />}
        />
        <InfoItem
          text={phoneNumber}
          icon={<PhoneIcon className={classes.icon} color="primary" />}
        />
      </CardContent>
      {!approved && (
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

export default CompanyCard;
