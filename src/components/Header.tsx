import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Svgs} from '../helpers/Svgs';
import {Sizing} from '../theme/sizing';
import {useTheme} from '../theme/theme';

export interface HeaderProps {
  title: string | JSX.Element;
  onBack?: () => void;
  onRightButton?: () => void;
}

const Header: React.FC<HeaderProps> = props => {
  const {onBack, onRightButton, title} = props;
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  console.log('theme', theme);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: insets.top,
        marginHorizontal: Sizing.sm,
      }}>
      {onBack && (
        <TouchableOpacity onPress={onBack}>
          <Svgs.close_icon />
        </TouchableOpacity>
      )}
      <View style={{alignItems: 'flex-start', flexGrow: 1, marginLeft: 15}}>
        {typeof title === 'string' ? (
          <Text
            style={[
              {textAlign: 'left'},
              theme.typography.secondaryHeaderTitle,
            ]}>
            {title}
          </Text>
        ) : (
          title
        )}
      </View>
      <TouchableOpacity
        onPress={onRightButton}
        style={{opacity: onRightButton ? 1 : 0, alignItems: 'center'}}>
        <Svgs.archive_icon />
        <Text style={theme.typography.secondaryLabel}>Archive</Text>
      </TouchableOpacity>
    </View>
  );
};

export {Header};
