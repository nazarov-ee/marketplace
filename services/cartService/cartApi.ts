import {ICurrentOrder} from '../../domain/ICurrentOrder';
import {IProduct} from '../../domain/IProduct';
import uuid from 'react-native-uuid';
import {IOrderOption} from '../../domain/IOrderOption';
import {AppConfig} from '../../Config';

const createInitialOrder = (): ICurrentOrder => {
  return {
    id: 'initialOrder',
    totalSum: 0,
    totalWeight: 0,
    options: [
      {id: '1', title: 'Позвонить по доставке', isEnabled: false},
      {id: '2', title: 'Оставить у двери', isEnabled: false},
      {id: '3', title: 'Опция 1', isEnabled: false},
      {id: '4', title: 'Опция 2', isEnabled: false},
      {id: '5', title: 'Опция 3', isEnabled: false},
      {id: '6', title: 'Опция 4', isEnabled: false},
    ],
    products: {},
  };
};

class CartApi {
  order: ICurrentOrder = createInitialOrder();

  submit = (order: ICurrentOrder, trys = AppConfig.retryCounts): void => {
    console.log('submit');
    console.log(`trys left ${trys}`);
    const isCriticalError =
      Math.random() < AppConfig.errorProbabilities['service unavailable'];

    if (isCriticalError) {
      console.log('critical error!');
      if (trys === 0) {
        throw new Error('Сервис недоступен');
      }
      console.log('retry!');
      return this.submit(order, trys - 1);
    }

    console.log('order submitted!');
    console.log(order);
    this.order = createInitialOrder();
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
      this.order.products[product.id] = {...product};
    } else {
      existingProduct.quantity += 1;
      existingProduct.totalWeight += existingProduct.weight;
    }
    this.order.totalSum += product.price;
    this.order.totalWeight += product.weight;
    return this.order;
  };
}

export default new CartApi();
