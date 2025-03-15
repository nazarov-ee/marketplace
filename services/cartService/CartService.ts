import {IProduct} from '../../domain/IProduct';
import {ICartService} from './ICartService';
import {ICurrentOrder} from '../../domain/ICurrentOrder';
import CartApi from './cartApi';
import {makeAutoObservable} from 'mobx';
// @ts-ignore
import _ from 'lodash';
import {IOrderOption} from '../../domain/IOrderOption';
import cartApi from './cartApi';

class CartService implements ICartService {
  constructor() {
    makeAutoObservable(this);
  }

  order: ICurrentOrder | null = null;

  submit() {
    if (!this.order) {
      return;
    }
    cartApi.submit(this.order);
    this.order = null;
  }

  toggleOption(option: IOrderOption) {
    option.isEnabled = cartApi.toggleOption(option) ?? false;
  }

  get productsToList(): Array<IProduct> {
    return !this.order ? [] : _.values(this.order?.products);
  }

  addProduct(product: IProduct): ICurrentOrder {
    this.order = CartApi.addProduct(product);
    return this.order;
  }

  deleteProduct(id: string) {
    this.order = CartApi.deleteProduct(id);
  }
}

export default new CartService();
