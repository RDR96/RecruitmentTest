import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useMemo} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {AppStackRoutes} from '../../App';
import {getClients, getClientsByName} from '../clients-service/clientService';
import {CircleCard} from '../components/CircleCard';
import {List} from '../components/List';
import {ScreenView} from '../components/ScreenView';
import {SearchBar} from '../components/SearchBar';
import {SectionList} from '../components/SectionList';
import {StatusEnum} from '../constants/status-enum';
import {DashboardTabRoutes} from '../DashboardTabNavigator';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import {ClientData, orderClientData} from '../store/reducers/clientReducer';
import {Sizing} from '../theme/sizing';
import {useTheme, theme, Theme} from '../theme/theme';

type PaymentsScreenNavigation = CompositeScreenProps<
  BottomTabScreenProps<DashboardTabRoutes, 'Payments'>,
  StackScreenProps<AppStackRoutes>
>;

const PaymentsScreen: React.FC<PaymentsScreenNavigation> = ({navigation}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const clients = useAppSelector(state => state.client.clients);

  const data = useMemo(() => {
    if (clients.data) {
      let activeData = clients.data?.filter(
        item => item.status === StatusEnum.Active,
      );
      let inactiveData = clients.data?.filter(
        item => item.status === StatusEnum.Inactive,
      );
      return [
        {title: StatusEnum.Active, data: activeData ?? []},
        {title: StatusEnum.Inactive, data: inactiveData ?? []},
      ];
    }
    return [];
  }, [clients]);

  useEffect(() => {
    dispatch(getClients());
  }, []);

  const onPress = (data: ClientData) => {
    dispatch(orderClientData(data));
    navigation.navigate('ClientDetails', {
      name: data.name ?? '',
      phone: data.phone ?? '',
      email: data.email ?? '',
      revenues: data.revenues ?? 0,
      userId: data.id ?? '',
    });
  };

  const onChange = (text: string) => {
    dispatch(getClientsByName(text));
  };

  return (
    <ScreenView
      header={{
        title: 'Clients',
        onBack: () => console.log('onBack'),
        onRightButton: () => console.log('onRightButton'),
      }}
      extra={{
        onExtraPressed: () => console.log('onExtraPressed'),
        extraIcon: 'user-plus',
      }}>
      <SearchBar style={{marginHorizontal: Sizing.md}} onChange={onChange} />
      <SectionList<ClientData>
        data={data}
        keyExtractor={props => props.id.toString()}
        renderItem={item => {
          return <ClientCard data={item} theme={theme} onPress={onPress} />;
        }}
      />
    </ScreenView>
  );
};

export {PaymentsScreen};

interface ClientCardProps {
  data: ClientData;
  theme: Theme;
  onPress: (item: ClientData) => void;
}

const ClientCard = (props: ClientCardProps) => {
  const {data, onPress} = props;

  return (
    <TouchableOpacity
      onPress={() => onPress(data)}
      style={[{flexDirection: 'row', marginTop: Sizing.sm}]}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <CircleCard text={data.name.match(/\b(\w)/g)?.join('') ?? ''} />
        <View style={{flex: 1, marginLeft: Sizing.sm}}>
          <Text style={theme.typography.secondaryTitle}>{data.name}</Text>
          <Text
            style={[
              theme.typography.secondarySubtitle,
              {marginTop: Sizing.xs},
            ]}>
            {data.email}
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <Text style={theme.typography.secondaryEmphasis}>{`$${String(
          data.revenues,
        ).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}`}</Text>
        <Text style={theme.typography.greyTag}>Total paid</Text>
      </View>
    </TouchableOpacity>
  );
};
