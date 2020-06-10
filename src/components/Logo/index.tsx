import React from 'react';
import { useTheme } from '@material-ui/core';
import LogoPNG from '../../assets/logo.png';

interface Props {
  smallDevicesWidth?: number;
  width?: number;
}

export const Logo: React.FC<Props> = (props) => {
  const width = useTheme().breakpoints.up('sm')
    ? props.width
    : props.smallDevicesWidth;

  return <img width={width} src={LogoPNG} alt="Supplyblocks Logo" />;
};

Logo.defaultProps = {
  smallDevicesWidth: 200,
  width: 240
};

export default Logo;
