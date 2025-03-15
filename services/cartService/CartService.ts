import {IProduct} from '../../domain/IProduct';
import {ICartService} from './ICartService';
import {ICurrentOrder} from '../../domain/ICurrentOrder';
import CartApi from './cartApi';
import {makeAutoObservable} from 'mobx';
// @ts-ignore
import _ from 'lodash';
import {IOrderOption} from '../../domain/IOrderOption';
import cartApi from './cartApi';
import analyticsService from '../analytics/analyticsService';
import {AppConfig} from '../../Config';

class CartService implements ICartService {
  constructor() {
    makeAutoObservable(this);
  }

  order: ICurrentOrder | null = null;

  submit() {
    if (!this.order) {
      return;
    }
    try {
      cartApi.submit(this.order);
      analyticsService.trackEvent('ORDER SUBMIT', this.order);
      this.order = null;
    } catch (e) {
      throw e;
    }
  }

  toggleOption(option: IOrderOption) {
    if (!this.order) {
      return;
    }
    analyticsService.trackEvent('ORDER OPTION TOGGLE', this.order);
    option.isEnabled = cartApi.toggleOption(option) ?? false;
  }

  get isValidMinCheck(): boolean {
    if (!this.order) {
      return false;
    }
    return this.order?.totalSum >= AppConfig.minCheck;
  }

  get totalSumInRoubles() {
    return (this.order?.totalSum ?? 0) / 100;
  }
  get productsToList(): Array<IProduct> {
    return !this.order ? [] : _.values(this.order?.products);
  }

  addProduct(product: IProduct) {
    this.order = CartApi.addProduct(product);
    analyticsService.trackEvent('ORDER ADD PRODUCT', this.order);
  }

  deleteProduct(id: string) {
    this.order = CartApi.deleteProduct(id);
    analyticsService.trackEvent('ORDER DELETE PRODUCT', this.order);
  }
}

export default new CartService();
