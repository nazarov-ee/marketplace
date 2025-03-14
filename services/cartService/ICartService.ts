import {IProduct} from '../../domain/IProduct';

export interface ICartService {
  addProduct: (product: IProduct) => void;
  deleteProduct: (id: string) => void;
}
