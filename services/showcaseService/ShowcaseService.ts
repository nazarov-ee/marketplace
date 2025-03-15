import {faker} from '@faker-js/faker';
import {IShowcaseProduct} from '../../domain/IShowcaseProduct';
import uuid from 'react-native-uuid';
class ShowcaseService {
  async get(): Promise<Array<IShowcaseProduct>> {
    await wait(1000);
    return generateProducts(1000);
  }
}

const generateProducts = (count: number): IShowcaseProduct[] => {
  return Array.from({length: count}, () => ({
    id: uuid.v4(),
    weight: Math.random() * 100 + 20,
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price({min: 10000, max: 100000})),
    availableQuantity: Math.floor(Math.random() * 50) + 1,
  }));
};

export default new ShowcaseService();

const wait = (ms: number) =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve(1);
    }, ms),
  );
