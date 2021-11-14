import React, {useEffect, useMemo} from 'react';
import {Text, View} from 'react-native';
import {AppStackRoutes} from '../../App';
import {StackScreenProps} from '@react-navigation/stack';
import {Divider} from '../components/Divider';
import {ScreenView} from '../components/ScreenView';
import {Sizing} from '../theme/sizing';
import {Theme, useTheme} from '../theme/theme';
import {ClientDetailsNavigator} from './ClientDetailsNavigator';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import {getClientPayments} from '../clients-service/clientService';
import {removeClientDetails} from '../store/reducers/clientReducer';

type ClientDetailsScreenNavigation = StackScreenProps<
  AppStackRoutes,
  'ClientDetails'
>;

const ClientDetailsScreen: React.FC<ClientDetailsScreenNavigation> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const {name, phone, email, revenues, userId} = route.params;
  const numberFormatted = useMemo(() => {
    let USNumber = phone.match(/(\d{3})(\d{3})(\d{4})/);
    if (USNumber) return `+1 ${USNumber[1]} ${USNumber[2]} ${USNumber[3]}`;
  }, [phone]);

  useEffect(() => {
    requestAnimationFrame(() => {
      dispatch(getClientPayments(userId));
    });
  }, [userId]);

  useEffect(() => {
    return () => {
      dispatch(removeClientDetails());
    };
  }, []);

  return (
    <ScreenView
      header={{
        onBack: navigation.goBack,
        title: (
          <HeaderTitle
            title={name}
            subTitle={numberFormatted}
            thirdTitle={email}
            theme={theme}
          />
        ),

        onRightButton: () => console.log('onRightButton'),
      }}
      extra={{onExtraPressed: () => console.log('onExtraPressed')}}>
      <View style={{alignItems: 'center'}}>
        <Text style={theme.typography.secondaryBanner}>{`$${String(
          revenues,
        ).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}`}</Text>
        <Text style={[theme.typography.secondaryLabel, {marginTop: Sizing.xs}]}>
          Total Earned
        </Text>
      </View>
      <Divider style={{marginTop: Sizing.sm}} />
      <ClientDetailsNavigator />
    </ScreenView>
  );
};

export {ClientDetailsScreen};

interface HeaderTitleProps {
  title?: string;
  subTitle?: string;
  thirdTitle?: string;
  theme: Theme;
}

const HeaderTitle = (props: HeaderTitleProps) => {
  const {title, subTitle, thirdTitle, theme} = props;
  return (
    <View>
      <Text style={theme.typography.secondaryHeaderTitle}>{title}</Text>
      <Text style={theme.typography.secondarySubtitle}>{subTitle}</Text>
      <Text style={theme.typography.greyTag}>{thirdTitle}</Text>
    </View>
  );
};
