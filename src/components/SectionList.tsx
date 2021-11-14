import React from 'react';
import {View, SectionList as SectionListComponent, Text} from 'react-native';
import {Sizing} from '../theme/sizing';
import {Theme, useTheme} from '../theme/theme';

type TitleColorType = 'primary' | 'grey' | 'secondary';

interface SectionListProps<T> {
  data: {title: string; data: T[]}[];
  renderItem: (item: T) => JSX.Element;
  titleColor?: TitleColorType;
  keyExtractor: (item: T, index: number) => string;
}

function SectionList<T>(props: SectionListProps<T>) {
  const {data, renderItem, keyExtractor, titleColor} = props;
  const theme = useTheme();

  const textColor = getTitleColor(titleColor ?? 'primary', theme);

  return (
    <SectionListComponent
      style={{marginTop: Sizing.md}}
      SectionSeparatorComponent={() => {
        return <View style={{marginTop: Sizing.sm}} />;
      }}
      sections={data}
      contentContainerStyle={{marginHorizontal: Sizing.md}}
      keyExtractor={keyExtractor}
      renderItem={({item}) => renderItem(item)}
      renderSectionHeader={({section}) => {
        if (section.data.length === 0) {
          return (
            <>
              <Text
                style={[theme.typography.darkGreyLabel, {color: textColor}]}>
                {section.title}
              </Text>
              <Text
                style={[
                  theme.typography.darkGreyLabel,
                  {textAlign: 'center', marginVertical: Sizing.sm},
                ]}>
                No data
              </Text>
            </>
          );
        }
        return (
          <View style={{backgroundColor: 'white', paddingBottom: Sizing.xs}}>
            <Text style={[theme.typography.darkGreyLabel, {color: textColor}]}>
              {section.title}
            </Text>
          </View>
        );
      }}
    />
  );
}

export {SectionList};

function getTitleColor(color: TitleColorType, theme: Theme) {
  switch (color) {
    case 'primary':
      return theme.colors.primary;
    case 'secondary':
      return theme.colors.secondary;
    case 'grey':
      return theme.colors.darkGrey;
    default:
      return theme.colors.primary;
  }
}
