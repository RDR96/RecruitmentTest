import React from 'react';
import {StyleProp, View, ViewStyle, StyleSheet} from 'react-native';
import {Colors} from '../theme/colors';

interface DividerProps {
  style?: StyleProp<ViewStyle>;
}

const Divider: React.FC<DividerProps> = props => {
  const {style} = props;
  return <View style={[styles.container, style]} />;
};

export {Divider};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.lightGrey,
  },
});
