import { useMediaQuery, useTheme } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  default as LogoPNG,
  default as LogoWithTitlePNG
} from '../../assets/Logo.png';
import { ApplicationRoutes } from '../../routes';

interface Props {
  smallDevicesWidth: number;
  width: number;
  withTitle?: boolean;
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<Props> = (props) => {
  const theme = useTheme();
  const smallDevice = useMediaQuery(
    theme.breakpoints.down(props.breakpoint ? props.breakpoint : 'sm')
  );
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
