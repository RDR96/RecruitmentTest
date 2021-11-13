import React from 'react';
import {SectionList, Text, View} from 'react-native';
import {Divider} from '../components/Divider';
import {Sizing} from '../theme/sizing';
import {Theme, useTheme} from '../theme/theme';

enum StatusEnum {
  Open = 'Open',
  Paid = 'Paid',
}

interface PaymentData {
  id?: number;
  userId?: string;
  status?: StatusEnum;
  created?: number;
  amount?: number;
  description?: string;
}

interface SectionData {
  title: StatusEnum;
  data: PaymentData[];
}

const data: SectionData[] = [
  {
    title: StatusEnum.Open,
    data: [
      {
        id: 4,
        userId: '609d85e52f2d7df3f48e4422',
        status: StatusEnum.Open,
        created: 1636675656904,
        amount: 200,
        description: '1 on 1',
      },
      {
        id: 1,
        userId: '609d85e52f2d7df3f48e4422',
        status: StatusEnum.Open,
        created: 1636675656904,
        amount: 200,
        description: '1 on 1',
      },
    ],
  },
  {
    title: StatusEnum.Paid,
    data: [
      {
        id: 4,
        userId: '609d85e52f2d7df3f48e4422',
        status: StatusEnum.Open,
        created: 1636675656904,
        amount: 200,
        description: '1 on 1',
      },
      {
        id: 1,
        userId: '609d85e52f2d7df3f48e4422',
        status: StatusEnum.Open,
        created: 1636675656904,
        amount: 200,
        description: '1 on 1',
      },
    ],
  },
];

const ClientDetailsPaymentsScreen: React.FC = () => {
  const theme = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SectionList
        style={{marginTop: Sizing.md}}
        SectionSeparatorComponent={() => {
          return <View style={{marginTop: Sizing.sm}} />;
        }}
        sections={data}
        contentContainerStyle={{marginHorizontal: Sizing.md}}
        keyExtractor={(item, index) => String((item.id ?? 0) + index)}
        renderItem={({item}) => {
          return (
            <View>
              <Divider style={{marginTop: Sizing.sm}} />
              <PaymentCard {...item} theme={theme} />
            </View>
          );
        }}
        renderSectionHeader={({section: {title}}) => (
          <Text style={theme.typography.darkGreyLabel}>{title}</Text>
        )}
      />
    </View>
  );
};

export {ClientDetailsPaymentsScreen};

interface PaymentCardProps extends PaymentData {
  theme: Theme;
}

const PaymentCard = (props: PaymentCardProps) => {
  const {description, created, amount, theme} = props;
  return (
    <View style={[{flexDirection: 'row', marginTop: Sizing.sm}]}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <View>
          <Text
            style={[theme.typography.secondaryTitle, {marginLeft: Sizing.sm}]}>
            {description}
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <Text
          style={theme.typography.secondaryHeaderTitle}>{`$${amount}`}</Text>
        <Text style={[theme.typography.greyTag, {marginTop: Sizing.xs}]}>
          {created}
        </Text>
      </View>
    </View>
  );
};
