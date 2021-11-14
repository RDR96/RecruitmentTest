import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {View} from 'react-native';
import {DashboardTabNavigator} from './src/DashboardTabNavigator';
import {theme, ThemeProvider} from './src/theme/theme';
import {ClientDetailsScreen} from './src/client-details/ClientDetailsScreen';
import {Provider} from 'react-redux';
import {store} from './src/store/store';

interface ClientDetailsScreenParams {
  name: string;
  phone: string;
  email: string;
  userId: string;
  revenues: number;
}

export type AppStackRoutes = {
  Dashboard: undefined;
  ClientDetails: ClientDetailsScreenParams;
};

const Stack = createStackNavigator<AppStackRoutes>();

const App: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <Provider store={store}>
        <ThemeProvider value={{theme: theme}}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen
                name="Dashboard"
                component={DashboardTabNavigator}
              />
              <Stack.Screen
                name="ClientDetails"
                component={ClientDetailsScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </Provider>
    </View>
  );
};

export {App};
