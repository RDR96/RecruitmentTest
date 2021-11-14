import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ScreenView} from './components/ScreenView';
import {PaymentsScreen} from './payments/PaymentsScreen';
import {useTheme} from './theme/theme';
import {Svgs} from './helpers/Svgs';

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
          tabBarHideOnKeyboard: true,
          tabBarInactiveTintColor: theme.colors.inactive,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarLabelStyle: {fontSize: 12},
        }}>
        <Tab.Screen
          name="Home"
          component={BlankScreen}
          options={{tabBarIcon: ({color}) => <Svgs.home_icon color={color} />}}
        />
        <Tab.Screen
          name="Transactions"
          component={BlankScreen}
          options={{
            tabBarIcon: ({color}) => <Svgs.transactions_icon color={color} />,
          }}
        />
        <Tab.Screen
          name="Analytics"
          component={BlankScreen}
          options={{
            tabBarIcon: ({color}) => <Svgs.payments_icon color={color} />,
          }}
        />
        <Tab.Screen
          name="Payments"
          component={PaymentsScreen}
          options={{
            tabBarIcon: ({color}) => <Svgs.money_icon color={color} />,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export {DashboardTabNavigator};
