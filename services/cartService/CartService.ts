import {IProduct} from '../../domain/IProduct';
import {ICartService} from './ICartService';
import {ICurrentOrder} from '../../domain/ICurrentOrder';
import CartApi from './cartApi';
import {makeAutoObservable} from 'mobx';
// @ts-ignore
import _ from 'lodash';
import {IOrderOption} from '../../domain/IOrderOption';
import cartApi from './cartApi';
import analyticsApi from '../analytics/analyticsApi';

const MIN_CHECK = 1000 * 100;

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
      analyticsApi.trackEvent('ORDER SUBMIT', this.order);
      this.order = null;
    } catch (e) {
      throw e;
    }
  }

  toggleOption(option: IOrderOption) {
    if (!this.order) {
      return;
    }
    analyticsApi.trackEvent('ORDER OPTION TOGGLE', this.order);
    option.isEnabled = cartApi.toggleOption(option) ?? false;
  }

  get isValidMinCheck(): boolean {
    if (!this.order) {
      return false;
    }
    return this.order?.totalSum >= MIN_CHECK;
  }

  get totalSumInRoubles() {
    return (this.order?.totalSum ?? 0) / 100;
  }
  get productsToList(): Array<IProduct> {
    return !this.order ? [] : _.values(this.order?.products);
  }

  addProduct(product: IProduct) {
    this.order = CartApi.addProduct(product);
    analyticsApi.trackEvent('ORDER ADD PRODUCT', this.order);
  }

  deleteProduct(id: string) {
    this.order = CartApi.deleteProduct(id);
    analyticsApi.trackEvent('ORDER DELETE PRODUCT', this.order);
  }
}

export default new CartService();
