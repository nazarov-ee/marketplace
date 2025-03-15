import {IProduct} from '../../domain/IProduct';
import {IOrderOption} from '../../domain/IOrderOption';

export interface ICartService {
  addProduct: (product: IProduct) => void;
  deleteProduct: (id: string) => void;
  toggleOption: (option: IOrderOption) => void;
}
