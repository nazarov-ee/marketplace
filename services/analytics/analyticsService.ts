import {ICurrentOrder} from '../../domain/ICurrentOrder';
import analyticsApi from './analyticsApi';

class AnalyticsService {
  trackEvent = (event: string, order: ICurrentOrder) => {
    analyticsApi.trackEvent(event, order);
  };
}
