import {ICurrentOrder} from '../../domain/ICurrentOrder';
import analyticsApi from './analyticsApi';
import {AnalyticsEvent} from './types';
import uuid from 'react-native-uuid';

class AsyncStorage {
  setItem(key: string, item: string) {
    console.log('item set');
    console.log(item);
    console.log(key);
  }

  getItem(key: string): string | undefined {
    return '[]';
  }
}

const asyncStorage = new AsyncStorage();

class AnalyticsService {
  private failedEvents: Array<AnalyticsEvent> = [];

  constructor() {
    const str = asyncStorage.getItem('failed_events');
    if (!str) {
      return;
    }
    this.failedEvents = JSON.parse(str);
    for (const event of this.failedEvents) {
      this.trackEvent(event.eventName, event.eventData.order, event.timestamp);
      this.failedEvents = this.failedEvents.filter(e => e.id === event.id);
    }
  }

  trackEvent = (
    event: string,
    order: ICurrentOrder,
    timestamp?: string,
    id?: string,
  ) => {
    if (!timestamp) {
      timestamp = Date.now().toString();
    }

    if (!id) {
      id = uuid.v4();
    }

    try {
      analyticsApi.trackEvent(event, order, timestamp);
    } catch (e) {
      const key = 'failed_events';
      if (!this.failedEvents.find(e => e.id === id)) {
        this.failedEvents.push({
          id,
          eventName: event,
          eventData: {order},
          timestamp,
        });
      }

      asyncStorage.setItem(key, JSON.stringify(this.failedEvents));
    }
  };
}

export default new AnalyticsService();
