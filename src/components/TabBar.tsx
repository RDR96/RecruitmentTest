import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import React from 'react';
import {Animated, View, TouchableOpacity} from 'react-native';
import {Sizing} from '../theme/sizing';
import {useTheme} from '../theme/theme';

const TabBar = ({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',

        height: 55,
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate(route.name, {merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
        });

        const opacityBar = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return (
          <View key={index}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}>
              <Animated.Text
                style={[{opacity}, theme.typography.secondaryRegularLabel]}>
                {label}
              </Animated.Text>
              <Animated.View
                style={[
                  {opacity: opacityBar},
                  {
                    marginTop: Sizing.xs,
                    height: 3,
                    backgroundColor: theme.colors.primary,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export {TabBar};
