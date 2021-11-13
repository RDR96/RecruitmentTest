import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {AppStackRoutes} from '../../App';
import {CircleCard} from '../components/CircleCard';
import {List} from '../components/List';
import {ScreenView} from '../components/ScreenView';
import {DashboardTabRoutes} from '../DashboardTabNavigator';
import {Sizing} from '../theme/sizing';
import {useTheme, theme, Theme} from '../theme/theme';

type PaymentsScreenNavigation = CompositeScreenProps<
  BottomTabScreenProps<DashboardTabRoutes, 'Payments'>,
  StackScreenProps<AppStackRoutes>
>;

interface ClientData {
  name?: string;
  email?: string;
  amount?: string;
}

const data: ClientData[] = [
  {
    name: 'Alex Greenwood',
    email: 'alex.greenwood@gmail.com',
    amount: '250.00',
  },
];

const PaymentsScreen: React.FC<PaymentsScreenNavigation> = ({navigation}) => {
  const theme = useTheme();
  return (
    <ScreenView
      header={{title: 'Clients', onBack: () => '', onRightButton: () => ''}}
      extra={{onExtraPressed: () => '', extraIcon: 'user-plus'}}>
      <List<ClientData>
        title="Active"
        data={data}
        containerStyle={{marginHorizontal: Sizing.md}}
        render={item => {
          return (
            <ClientCard
              {...item}
              theme={theme}
              onPress={() =>
                navigation.navigate('ClientDetails', {
                  name: 'Rodrigo',
                  number: 'number',
                  email: 'email',
                })
              }
            />
          );
        }}
      />
    </ScreenView>
  );
};

export {PaymentsScreen};

interface ClientCardProps extends ClientData {
  theme: Theme;
  onPress: () => void;
}

const ClientCard = (props: ClientCardProps) => {
  const {name, email, amount, theme, onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{flexDirection: 'row', marginTop: Sizing.md}]}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <CircleCard text="RC" />
        <View style={{flex: 1, marginLeft: Sizing.sm}}>
          <Text style={theme.typography.secondaryTitle}>{name}</Text>
          <Text
            style={[
              theme.typography.secondarySubtitle,
              {marginTop: Sizing.xs},
            ]}>
            {email}
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <Text style={theme.typography.secondaryEmphasis}>{`$${amount}`}</Text>
        <Text style={theme.typography.greyTag}>Total paid</Text>
      </View>
    </TouchableOpacity>
  );
};
