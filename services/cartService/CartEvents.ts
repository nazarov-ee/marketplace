import {ICurrentOrder} from '../../domain/ICurrentOrder';

type OrderUpdatedEvent = {
  name: 'ORDER_UPDATED';
  payload: ICurrentOrder;
};

type ErrorEvent = {
  name: 'ORDER_ERROR';
  payload: string;
};

export type CartEvent = OrderUpdatedEvent | ErrorEvent;
