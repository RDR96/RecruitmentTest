import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Text,
} from 'react-native';

interface SearchBarProps {
  style?: StyleProp<ViewStyle>;
}

const SearchBar: React.FC<SearchBarProps> = props => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      {!isFocused && (
        <View style={{position: 'absolute'}}>
          <Text>Seatch</Text>
        </View>
      )}

      <TextInput
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
    //borderColor: '#E5E5E5',
    borderColor: 'red',
    borderRadius: 5,
    position: 'relative',
  },
});
