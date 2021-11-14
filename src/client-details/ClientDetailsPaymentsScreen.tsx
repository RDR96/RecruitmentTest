import moment from 'moment';
import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import {Divider} from '../components/Divider';
import {SectionList} from '../components/SectionList';
import {useAppSelector} from '../hooks/useAppSelector';
import {PaymentsData} from '../store/reducers/clientReducer';
import {Sizing} from '../theme/sizing';
import {Theme, useTheme} from '../theme/theme';

enum PaymentStatusEnum {
  Open = 'open',
  Paid = 'paid',
}

interface PaymentData {
  id?: number;
  userId?: string;
  status?: PaymentStatusEnum;
  created?: number;
  amount?: number;
  description?: string;
}

interface SectionData {
  title: PaymentStatusEnum;
  data: PaymentData[];
}

const ClientDetailsPaymentsScreen: React.FC = () => {
  const theme = useTheme();
  const payments = useAppSelector(state => state.client.clientPayments);
  const data = useMemo(() => {
    let openData = payments.data?.filter(
      item => item.status === PaymentStatusEnum.Open,
    );
    let paidData = payments.data?.filter(
      item => item.status === PaymentStatusEnum.Paid,
    );
    return [
      {title: 'OPEN', data: openData ?? []},
      {title: 'PAID', data: paidData ?? []},
    ];
  }, [payments]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SectionList<PaymentsData>
        data={data}
        titleColor="grey"
        keyExtractor={props => props.id.toString()}
        renderItem={item => {
          return (
            <View>
              <Divider style={{marginTop: Sizing.sm}} />
              <PaymentCard {...item} theme={theme} />
            </View>
          );
        }}
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
          {moment(created).format('MMM DD/YYYY')}
        </Text>
      </View>
    </View>
  );
};
