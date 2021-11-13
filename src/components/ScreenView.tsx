import React from 'react';
import {View} from 'react-native';

import {Sizing} from '../theme/sizing';
import {useTheme} from '../theme/theme';
import {CircleButton, CircleColorType, CircleIconType} from './CircleButton';
import {Header, HeaderProps} from './Header';

interface ScreenViewProps {
  header?: HeaderProps;
  extra?: {
    onExtraPressed?: () => void;
    extraIcon?: CircleIconType;
    color?: CircleColorType;
  };
}

const ScreenView: React.FC<ScreenViewProps> = props => {
  const {header, children, extra} = props;
  const theme = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        {header && <Header {...header} />}
        <View style={{flex: 1, marginTop: 15}}>{children}</View>
        {extra && extra.onExtraPressed && (
          <View
            style={{
              position: 'absolute',
              bottom: Sizing.lg,
              right: Sizing.md,
            }}>
            <CircleButton
              onPress={extra.onExtraPressed}
              icon={extra.extraIcon}
              color={extra.color}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export {ScreenView};
