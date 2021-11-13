import React from 'react';
import {FlatList, StyleProp, Text, View, ViewStyle} from 'react-native';
import {useTheme} from '../theme/theme';

interface ListProps<T> {
  data: T[];
  render: (item: T) => JSX.Element;
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  ListHeaderComponent?: JSX.Element;
  style?: StyleProp<ViewStyle>;
}

function List<T>(props: ListProps<T>) {
  const {data, render, title, containerStyle, style, ListHeaderComponent} =
    props;
  const theme = useTheme();
  return (
    <View style={[containerStyle, {flex: 1}]}>
      {typeof title !== 'undefined' && (
        <Text style={theme.typography.primaryTitle}>{title}</Text>
      )}
      <FlatList
        data={data}
        ListHeaderComponent={ListHeaderComponent}
        style={[{flexGrow: 1}, style]}
        renderItem={({item}) => render(item)}
        contentContainerStyle={[{flexGrow: 1}]}
      />
    </View>
  );
}

export {List};
