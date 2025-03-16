import {faker} from '@faker-js/faker';
import {IShowcaseProduct} from '../../domain/IShowcaseProduct';
import uuid from 'react-native-uuid';
import {AppConfig} from '../../Config';
class ShowcaseService {
  async get(): Promise<Array<IShowcaseProduct>> {
    await wait(1000);

    const isError =
      Math.random() < AppConfig.errorProbabilities['showcase get items error'];

    if (isError) {
      throw new Error('Showcase service broken');
    }

    return generateProducts(AppConfig.showcaseItemsCount);
  }
}

const generateProducts = (count: number): IShowcaseProduct[] => {
  return Array.from({length: count}, () => ({
    id: uuid.v4(),
    weight: Math.random() * 100 + 20,
    name: faker.commerce.productName(),
    price: parseFloat(
      faker.commerce.price({min: AppConfig.minPrice, max: AppConfig.maxPrice}),
    ),
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
