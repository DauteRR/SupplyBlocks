import React from 'react';
import {
  Typography,
  Link,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    padding: theme.spacing(0.5, 0),
    width: '100%',
    textAlign: 'center'
  }
}));

interface Props {
  background: string;
}

const Footer: React.FC<Props> = (props) => {
  const { background } = props;
  const theme = useTheme();
  const fontColor = theme.palette.getContrastText(background);

  const classes = useStyles();

  return (
    <>
      <div
        style={{
          backgroundColor: background
        }}
        className={classes.root}
      >
        <Typography style={{ color: fontColor }} variant="body1">
          &copy; Supplyblocks. 2020
        </Typography>
        <Typography style={{ color: fontColor }} variant="caption">
          Created as Cybersecurity and Data Intelligence Master's Degree final
          project by{' '}
          <Link component="a" href="https://github.com/DauteRR" target="_blank">
            Daute Rodríguez Rodríguez.
          </Link>
        </Typography>
      </div>
    </>
  );
};

export default Footer;
