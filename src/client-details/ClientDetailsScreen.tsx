import React from 'react';
import {Text, View} from 'react-native';
import {AppStackRoutes} from '../../App';
import {StackScreenProps} from '@react-navigation/stack';
import {Divider} from '../components/Divider';
import {ScreenView} from '../components/ScreenView';
import {Sizing} from '../theme/sizing';
import {Theme, useTheme} from '../theme/theme';
import {ClientDetailsNavigator} from './ClientDetailsNavigator';

type ClientDetailsScreenNavigation = StackScreenProps<AppStackRoutes, 'Home'>;

const ClientDetailsScreen: React.FC<ClientDetailsScreenNavigation> = ({
  navigation,
}) => {
  const theme = useTheme();

  return (
    <ScreenView
      header={{
        onBack: navigation.goBack,
        title: (
          <HeaderTitle
            title={'Alex Greenwood'}
            subTitle={'+1 548 545 8947'}
            thirdTitle={'alex@greenwood.com'}
            theme={theme}
          />
        ),

        onRightButton: () => '',
      }}
      extra={{onExtraPressed: () => ''}}>
      <View style={{alignItems: 'center'}}>
        <Text style={theme.typography.secondaryBanner}>$1400.00</Text>
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
