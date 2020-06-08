import React from 'react';
import { CircularProgress } from '@material-ui/core';

interface Props {}

export const LoadingSpinner: React.FC<Props> = (props) => {
  return <CircularProgress size={120} />;
};

export default LoadingSpinner;
