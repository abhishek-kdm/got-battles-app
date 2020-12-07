import React from 'react';
import Layout from './src/Layout/layout.component';

export const wrapRootElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
}

