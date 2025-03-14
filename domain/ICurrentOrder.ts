import {IProduct} from './IProduct';
import {IOrderOption} from './IOrderOption';

export interface ICurrentOrder {
  id: string;
  products: Record<string, IProduct>;
  totalWeight: number;
  totalSum: number;
  options: Array<IOrderOption>;
}
