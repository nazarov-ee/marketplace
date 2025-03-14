import {ICurrentOrder} from '../../domain/ICurrentOrder';
import {IProduct} from '../../domain/IProduct';
import uuid from 'react-native-uuid';

class CartApi {
  order: ICurrentOrder = {
    id: 'initialOrder',
    totalSum: 0,
    totalWeight: 0,
    options: [],
    products: {},
  };

  deleteProduct(id: string) {
    const product = this.order.products[id];
    if (product && product.quantity > 1) {
      product.quantity--;
    } else {
      delete this.order.products[id];
    }

    this.order.totalSum -= product.price;
    this.order.totalWeight -= product.weight;

    return this.order;
  }

  addProduct = (product: IProduct): ICurrentOrder => {
    if (this.order.id === 'initialOrder') {
      this.order.id = uuid.v4();
    }
    const existingProduct = this.order.products[product.id];
    if (!existingProduct) {
      this.order.products[product.id] = product;
    } else {
      existingProduct.quantity += 1;
      existingProduct.weight += existingProduct.weight;
    }
    this.order.totalSum += product.quantity * product.price;
    this.order.totalWeight += product.weight;
    return this.order;
  };
}

export default new CartApi();
