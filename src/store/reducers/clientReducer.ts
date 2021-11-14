import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clientAsyncReducers} from '../../clients-service/clientService';
import {StatusEnum} from '../../constants/status-enum';

export type RequestState = 'pending' | 'fulfilled' | 'rejected' | 'idle';
enum PaymentStatusEnum {
  Open = 'open',
  Paid = 'paid',
}

export interface ClientData {
  status: StatusEnum;
  revenues: number;
  id: string;
  sessionBalance: number;
  name: string;
  email: string;
  phone: string;
  stripeId: string;
  userId: string;
  __v: number;
}

export interface PaymentsData {
  id: number;
  userId: string;
  status: PaymentStatusEnum;
  created: number;
  amount: number;
  description: string;
}

export interface ClientState {
  clients: {
    data?: ClientData[];
    state: RequestState;
  };
  clientPayments: {
    data?: PaymentsData[];
    state: RequestState;
  };
}

const initialState = {
  clients: {state: 'idle'},
  clientPayments: {state: 'idle'},
} as ClientState;

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    orderClientData: (state, action: PayloadAction<ClientData>) => {
      const data = state.clients.data?.filter(
        item => item.id !== action.payload.id,
      );
      if (data) {
        state.clients.data = [action.payload, ...(data as ClientData[])];
      }
    },
    removeClientDetails: state => {
      state.clientPayments.data = undefined;
    },
  },
  extraReducers: builder => {
    clientAsyncReducers(builder);
  },
});

export const {orderClientData, removeClientDetails} = clientSlice.actions;
const clientReducer = clientSlice.reducer;
export const ClientReducer = clientReducer;
