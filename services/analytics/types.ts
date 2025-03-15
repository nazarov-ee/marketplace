import {ICurrentOrder} from '../../domain/ICurrentOrder';

export type AnalyticsEvent = {
  id: string;
  eventName: string;
  eventData: {order: ICurrentOrder};
  timestamp: string;
};
