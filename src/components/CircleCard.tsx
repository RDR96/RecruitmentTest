import React from 'react';
import {Text, View} from 'react-native';
import {Theme, useTheme} from '../theme/theme';

type BorderColorType = 'primary' | 'secondary' | 'black';

interface CircleCardProps {
  text: string;
  borderColor?: BorderColorType;
}

const CircleCard: React.FC<CircleCardProps> = props => {
  const {text, borderColor} = props;
  const theme = useTheme();
  const borderCol = getBorderColor(borderColor ?? 'primary', theme);
  return (
    <View
      style={{
        width: 55,
        height: 55,
        borderRadius: 55 / 2,
        borderWidth: 1,
        borderColor: borderCol,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{text}</Text>
    </View>
  );
};

export {CircleCard};

function getBorderColor(color: BorderColorType, theme: Theme) {
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
