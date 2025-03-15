import {ICurrentOrder} from '../../domain/ICurrentOrder';
import {IProduct} from '../../domain/IProduct';
import uuid from 'react-native-uuid';
import {IOrderOption} from '../../domain/IOrderOption';

const initialOrder: ICurrentOrder = {
  id: 'initialOrder',
  totalSum: 0,
  totalWeight: 0,
  options: [
    {id: '1', title: 'Do not call', isEnabled: false},
    {id: '2', title: 'Leave on door', isEnabled: false},
    {id: '3', title: 'Extra 1', isEnabled: false},
    {id: '4', title: 'Extra 2', isEnabled: false},
    {id: '5', title: 'Extra 3', isEnabled: false},
    {id: '6', title: 'Extra 4', isEnabled: false},
  ],
  products: {},
};

class CartApi {
  order: ICurrentOrder = {...initialOrder};

  submit = (order: ICurrentOrder) => {
    console.log('order submitted!');
    console.log(order);
    this.order = {...initialOrder};
  };

  deleteProduct(id: string) {
    const product = this.order.products[id];
    if (product && product.quantity > 1) {
      product.quantity--;
      product.totalWeight -= product.weight;
    } else {
      delete this.order.products[id];
    }

    this.order.totalSum -= product.price;
    this.order.totalWeight -= product.weight;

    return this.order;
  }
  toggleOption = (option: IOrderOption) => {
    const _option = this.order.options.find(o => o.id === option.id);
    if (!_option) {
      return;
    }
    _option.isEnabled = !_option.isEnabled;
    return _option.isEnabled;
  };

  addProduct = (product: IProduct): ICurrentOrder => {
    if (this.order.id === 'initialOrder') {
      this.order.id = uuid.v4();
    }
    const existingProduct = this.order.products[product.id];
    if (!existingProduct) {
      this.order.products[product.id] = product;
    } else {
      existingProduct.quantity += 1;
      existingProduct.totalWeight += existingProduct.weight;
    }
    this.order.totalSum += product.quantity * product.price;
    this.order.totalWeight += product.weight;
    return this.order;
  };
}

export default new CartApi();
