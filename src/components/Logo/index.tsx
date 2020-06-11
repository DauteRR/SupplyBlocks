import React, { useCallback } from 'react';
import { useTheme } from '@material-ui/core';
import LogoPNG from '../../assets/logo.png';
import { ApplicationRoutes } from '../../routes';
import { useHistory } from 'react-router-dom';

interface Props {
  smallDevicesWidth?: number;
  width?: number;
}

export const Logo: React.FC<Props> = (props) => {
  const width = useTheme().breakpoints.up('sm')
    ? props.width
    : props.smallDevicesWidth;

  let history = useHistory();

  const clickCallback = useCallback(() => {
    history.push(ApplicationRoutes.welcome.path);
  }, [history]);

  return (
    <img
      style={{ cursor: 'pointer' }}
      width={width}
      src={LogoPNG}
      onClick={clickCallback}
      alt="Supplyblocks Logo"
    />
  );
};

Logo.defaultProps = {
  smallDevicesWidth: 200,
  width: 240
};

export default Logo;
