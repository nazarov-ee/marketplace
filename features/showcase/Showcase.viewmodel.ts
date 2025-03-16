import {IShowcaseProduct} from '../../domain/IShowcaseProduct';
import ShowcaseService from '../../services/showcaseService/ShowcaseService';
import cartService from '../../services/cartService/CartService';
import {IProduct} from '../../domain/IProduct';
import {makeAutoObservable, runInAction} from 'mobx';

export class ShowcaseViewmodel {
  constructor() {
    makeAutoObservable(this);
    this.fetchData();
  }
  isLoading = false;
  isError = false;
  products: Array<IShowcaseProduct> = [];

  fetchData = async () => {
    try {
      this.isLoading = true;
      this.isError = false;
      const data = await ShowcaseService.get();

      runInAction(() => {
        this.products = data;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.isError = true;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  addProduct = (product: IShowcaseProduct) => {
    const cartProduct: IProduct = {
      id: product.id,
      totalWeight: product.weight,
      availableQuantity: product.availableQuantity,
      quantity: 1,
      weight: product.weight,
      name: product.name,
      price: product.price,
    };
    cartService.addProduct(cartProduct);
  };

  deleteProduct = (id: string) => {
    cartService.deleteProduct(id);
  };
}
