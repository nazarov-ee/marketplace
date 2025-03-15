import {ICurrentOrder} from '../../domain/ICurrentOrder';

class AnalyticsApi {
  trackEvent = (event: string, order: ICurrentOrder, timestamp: string) => {
    if (Math.random() > 0.85) {
      throw new Error('analytics server unavailable');
    }
    console.log(`TRACK ANALYTICS EVENT ${event}`);
    console.log('ORDER');
    console.log(timestamp);
    console.log(JSON.stringify(order));
  };
}

export default new AnalyticsApi();
