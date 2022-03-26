import React from 'react';
import ComponentRouter from './ComponentRouter';
import { DataProvider } from './ContextData';

const ContextComponentHolder = () => {
  return (
    <DataProvider>
      <ComponentRouter />
    </DataProvider>
  )
}

export default ContextComponentHolder