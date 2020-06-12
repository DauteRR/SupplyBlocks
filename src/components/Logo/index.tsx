import React, { useCallback } from 'react';
import { useTheme, useMediaQuery } from '@material-ui/core';
import LogoPNG from '../../assets/Logo.png';
import LogoWithTitlePNG from '../../assets/Logo.png';
import { ApplicationRoutes } from '../../routes';
import { useHistory } from 'react-router-dom';

interface Props {
  smallDevicesWidth: number;
  width: number;
  withTitle?: boolean;
}

export const Logo: React.FC<Props> = (props) => {
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const width = smallDevice ? props.smallDevicesWidth : props.width;

  let history = useHistory();
  const clickCallback = useCallback(() => {
    history.push(ApplicationRoutes.welcome.path);
  }, [history]);

  return (
    <img
      style={{ cursor: 'pointer' }}
      width={width}
      src={props.withTitle ? LogoWithTitlePNG : LogoPNG}
      onClick={clickCallback}
      alt="SupplyBlocks Logo"
    />
  );
};

export default Logo;
