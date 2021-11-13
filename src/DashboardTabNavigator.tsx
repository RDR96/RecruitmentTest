import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ScreenView} from './components/ScreenView';
import {PaymentsScreen} from './payments/PaymentsScreen';
import {useTheme} from './theme/theme';

export type DashboardTabRoutes = {
  Home: undefined;
  Transactions: undefined;
  Analytics: undefined;
  Payments: undefined;
};

const Tab = createBottomTabNavigator<DashboardTabRoutes>();

const BlankScreen: React.FC = () => {
  return (
    <ScreenView header={{title: 'Home'}}>
      <View></View>
    </ScreenView>
  );
};

const DashboardTabNavigator = () => {
  const theme = useTheme();

  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: theme.colors.inactive,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarLabelStyle: {fontSize: 12},
        }}>
        <Tab.Screen name="Home" component={BlankScreen} />
        <Tab.Screen name="Transactions" component={BlankScreen} />
        <Tab.Screen name="Analytics" component={BlankScreen} />
        <Tab.Screen name="Payments" component={PaymentsScreen} />
      </Tab.Navigator>
    </View>
  );
};

export {DashboardTabNavigator};
