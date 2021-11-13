import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {View} from 'react-native';
import {DashboardTabNavigator} from './src/DashboardTabNavigator';
import {theme, ThemeProvider} from './src/theme/theme';
import {ClientDetailsScreen} from './src/client-details/ClientDetailsScreen';

interface ClientDetailsScreenParams {
  name: string;
  number: string;
  email: string;
}

export type AppStackRoutes = {
  Home: undefined;
  ClientDetails: ClientDetailsScreenParams;
};

const Stack = createStackNavigator<AppStackRoutes>();

const App: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <ThemeProvider value={{theme: theme}}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={DashboardTabNavigator} />
            <Stack.Screen
              name="ClientDetails"
              component={ClientDetailsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </View>
  );
};

export {App};
