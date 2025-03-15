import {FC} from 'react';
import {IShowcaseProduct} from '../../../domain/IShowcaseProduct';
import {FlashList} from '@shopify/flash-list';
import {Image, View} from 'react-native';
import {Button, Icon, IconButton, Text} from 'react-native-paper';
import cartService from '../../../services/cartService/CartService';
import {observer} from 'mobx-react-lite';

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

const ProductsListItem: FC<{
  product: IShowcaseProduct;
  onDelete: () => void;
  onAdd: () => void;
}> = observer(({product, onAdd, onDelete}) => {
  const quantityInCart = cartService.order?.products[product.id]?.quantity ?? 0;
  return (
    <View
      style={{
        marginVertical: 8,
        marginHorizontal: 4,
        flex: 1,
      }}>
      <View
        style={{
          padding: 22,
          borderRadius: 16,
          backgroundColor: 'rgba(196,196,196,0.36)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {quantityInCart > 0 && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,0.59)',
              width: 150,
              height: 150,
              borderRadius: 16,
              zIndex: 2,
            }}>
            <Text style={{color: '#fff', fontSize: 32}}>{quantityInCart}</Text>
          </View>
        )}
        <Image
          source={require('../../../assets/product.jpg')}
          style={{
            width: 150,
            height: 150,
            borderRadius: 16,
          }}
        />
      </View>

      <View style={{flex: 1}}>
        <Text style={{marginTop: 4}} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={{fontSize: 12, opacity: 0.8}}>
          {product.weight.toFixed(0)}г
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 4,
            gap: 6,
          }}>
          {quantityInCart > 0 && (
            <IconButton icon={'minus'} onPress={onDelete} mode={'contained'} />
          )}
          {quantityInCart > 0 && (
            <View style={{alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>
                {(product.price / 100).toFixed(0)}₽
              </Text>
            </View>
          )}
          {quantityInCart === 0 ? (
            <Button onPress={onAdd} mode={'outlined'} icon={'plus'}>
              {(product.price / 100).toFixed(0)}₽{' '}
            </Button>
          ) : (
            <IconButton
              icon={'plus'}
              disabled={product.availableQuantity === quantityInCart}
              onPress={onAdd}
              mode={'contained'}
            />
          )}
        </View>
      </View>
    </View>
  );
});
