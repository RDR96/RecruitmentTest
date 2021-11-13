import React from 'react';

import {Typography} from './typography';
import {Colors} from './colors';
import {Views} from './view';

export interface Theme {
  typography: typeof Typography;
  colors: typeof Colors;
  views: typeof Views;
}

export const theme: Theme = {
  typography: Typography,
  colors: Colors,
  views: Views,
};

const ThemeContext = React.createContext<
  | {
      theme: Theme;
    }
  | undefined
>(undefined);

const ThemeProvider = ThemeContext.Provider;

function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context.theme;
}

export {ThemeProvider, useTheme};
