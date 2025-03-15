import {FC} from 'react';
import {IShowcaseProduct} from '../../../domain/IShowcaseProduct';
import {FlashList} from '@shopify/flash-list';
import {ProductsListItem} from './ProductsListItem';

type Props = {
  data: Array<IShowcaseProduct>;
  onAdd: (product: IShowcaseProduct) => void;
  onDelete: (id: string) => void;
};

export const ProductsList: FC<Props> = ({data, onDelete, onAdd}) => {
  return (
    <FlashList
      showsVerticalScrollIndicator={false}
      estimatedItemSize={120}
      numColumns={2}
      renderItem={({item}) => (
        <ProductsListItem
          onDelete={() => onDelete(item.id)}
          onAdd={() => onAdd(item)}
          product={item}
        />
      )}
      data={data}
    />
  );
};
