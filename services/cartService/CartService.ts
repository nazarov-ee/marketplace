import {IProduct} from '../../domain/IProduct';
import {ICartService} from './ICartService';
import {ICurrentOrder} from '../../domain/ICurrentOrder';
import CartApi from './cartApi';
import {makeAutoObservable} from 'mobx';

class CartService implements ICartService {
  constructor() {
    makeAutoObservable(this);
  }

  order: ICurrentOrder | null = null;

  addProduct(product: IProduct): ICurrentOrder {
    this.order = CartApi.addProduct(product);
    return this.order;
  }

  deleteProduct(id: string) {
    this.order = CartApi.deleteProduct(id);
  }
}

export default new CartService();
