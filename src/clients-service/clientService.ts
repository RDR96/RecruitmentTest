import {ActionReducerMapBuilder, createAsyncThunk} from '@reduxjs/toolkit';
import {NoInfer} from '@reduxjs/toolkit/dist/tsHelpers';
import axios, {AxiosResponse} from 'axios';
import {Platform} from 'react-native';
import {
  ClientState,
  ClientData,
  PaymentsData,
} from '../store/reducers/clientReducer';

// Change IP for android device
const domain = Platform.OS === 'android' ? 'localhost' : 'localhost';

export const getClients = createAsyncThunk(
  'clients/getClients',
  async thunkApi => {
    try {
      const data = (await axios.get(
        `http://${domain}:3000/customers?_sort=revenues&_order=desc`,
      )) as AxiosResponse<ClientData[]>;
      return data.data;
    } catch (error) {}
  },
);

export const getClientPayments = createAsyncThunk(
  'clients/getClientPayment',
  async (userId: string, thunkApi) => {
    const data = (await axios.get(
      `http://${domain}:3000/payments?userId=${userId}`,
    )) as AxiosResponse<PaymentsData[]>;

    return data.data;
  },
);

export const getClientsByName = createAsyncThunk(
  'clients/getClientsByName',
  async (name: string, thunkApi) => {
    const data = (await axios.get(
      `http://${domain}:3000/customers?name_like=${name}&_sort=revenues&_order=desc`,
    )) as AxiosResponse<ClientData[]>;

    return data.data;
  },
);

export const clientAsyncReducers = (
  builder: ActionReducerMapBuilder<NoInfer<ClientState>>,
) => {
  return {
    ...builder
      .addCase(getClients.pending, state => {
        state.clients.state = 'pending';
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.clients.state = 'fulfilled';
        state.clients.data = action.payload;
      })
      .addCase(getClients.rejected, state => {
        state.clients.state = 'rejected';
        state.clients.data = [];
      }),
    ...builder
      .addCase(getClientPayments.pending, state => {
        state.clientPayments.state = 'pending';
      })
      .addCase(getClientPayments.fulfilled, (state, action) => {
        state.clientPayments.state = 'fulfilled';
        state.clientPayments.data = action.payload;
      })
      .addCase(getClientPayments.rejected, state => {
        state.clientPayments.state = 'rejected';
        state.clientPayments.data = [];
      }),
    ...builder
      .addCase(getClientsByName.pending, state => {
        state.clients.state = 'pending';
      })
      .addCase(getClientsByName.fulfilled, (state, action) => {
        state.clients.state = 'fulfilled';
        state.clients.data = action.payload;
      })
      .addCase(getClientsByName.rejected, state => {
        state.clients.state = 'rejected';
        state.clients.data = [];
      }),
  };
};
