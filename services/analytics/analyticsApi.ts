import {ICurrentOrder} from '../../domain/ICurrentOrder';

class AnalyticsApi {
  trackEvent = (event: string, order: ICurrentOrder) => {
    console.log(`TRACK ANALYTICS EVENT ${event}`);
    console.log('ORDER');
    console.log(JSON.stringify(order));
  };
}

export default new AnalyticsApi();
