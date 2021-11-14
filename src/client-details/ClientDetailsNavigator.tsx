import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ClientDetailsPaymentsScreen} from './ClientDetailsPaymentsScreen';
import {TabBar} from '../components/TabBar';

type ClientDetailsStack = {
  Payments: undefined;
  Sessions: undefined;
};

const Tab = createMaterialTopTabNavigator<ClientDetailsStack>();

const SessionsScreen = () => {
  return <View style={{flex: 1, backgroundColor: 'white'}} />;
};

const ClientDetailsNavigator: React.FC = () => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Payments" component={ClientDetailsPaymentsScreen} />
      <Tab.Screen name="Sessions" component={SessionsScreen} />
    </Tab.Navigator>
  );
};

export {ClientDetailsNavigator};
