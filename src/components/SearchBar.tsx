import React, {useCallback, useState} from 'react';
import {
  View,
  TextInput,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';

import {Svgs} from '../helpers/Svgs';
import {Colors} from '../theme/colors';
import {Sizing} from '../theme/sizing';
import {debounce} from 'lodash';

interface SearchBarProps {
  style?: StyleProp<ViewStyle>;
  onChange?: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = props => {
  const {style, onChange} = props;
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const onChangeHandler = (text: string) => {
    if (onChange) onChange(text);
  };

  const handleChange = (text: string) => {
    setValue(text);
    debounceFn(text);
  };

  const debounceFn = useCallback(debounce(onChangeHandler, 500), []);

  return (
    <View style={[styles.container, style]}>
      {!isFocused && value === '' && (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            justifyContent: 'center',
            height: 40,
            alignItems: 'center',
            marginLeft: Sizing.md,
          }}>
          <Svgs.search_icon />
          <Text style={{marginLeft: Sizing.xs}}>Search Client</Text>
        </View>
      )}

      <TextInput
        style={{
          height: 40,
          ...Platform.select({ios: {paddingTop: 0, marginTop: 0}}),

          justifyContent: 'center',
          alignItems: 'center',
        }}
        value={value}
        onChangeText={text => handleChange(text)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export {SearchBar};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.lightGrey,

    borderRadius: 5,
    height: 40,
    paddingHorizontal: Sizing.xs,
    position: 'relative',
  },
});
