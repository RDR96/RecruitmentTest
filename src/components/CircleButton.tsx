import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Svgs} from '../helpers/Svgs';
import {Theme, useTheme} from '../theme/theme';

export type CircleColorType = 'primary' | 'secondary' | 'black';
export type CircleIconType = 'user-plus' | 'plus';

interface CircleButtonProps {
  onPress: () => void;
  color?: CircleColorType;
  icon?: CircleIconType;
}

const CircleButton: React.FC<CircleButtonProps> = props => {
  const {onPress, color, icon = 'plus'} = props;

  const theme = useTheme();
  const backgroundColor = getBackgroundColor(color ?? 'black', theme);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {icon === 'plus' ? <Svgs.plus /> : <Svgs.user_plus />}
    </TouchableOpacity>
  );
};

export {CircleButton};

function getBackgroundColor(color: CircleColorType, theme: Theme) {
  switch (color) {
    case 'primary':
      return theme.colors.primary;
    case 'secondary':
      return theme.colors.secondary;
    case 'black':
      return theme.colors.black;
    default:
      return theme.colors.primary;
  }
}
