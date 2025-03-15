import {Image, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {FC, useCallback} from 'react';
import {IProduct} from '../../../domain/IProduct';
import {Button, Text} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import cartService from '../../../services/cartService/CartService';
import {CartOptions} from './CartOptions';

export const CartList = observer(() => {
  return (
    <View style={{flex: 1, marginTop: 12}}>
      <FlashList
        ListFooterComponent={() => (
          <CartOptions options={cartService.order?.options ?? []} />
        )}
        showsVerticalScrollIndicator={false}
        data={cartService.productsToList}
        renderItem={({item}) => <CartListItem item={item} />}
      />
    </View>
  );
});

const CartListItem: FC<{item: IProduct}> = ({item}) => {
  const handlePlus = useCallback(() => {
    cartService.addProduct(item);
  }, [item]);

  const handleMinus = useCallback(() => {
    cartService.deleteProduct(item.id);
  }, [item]);

  return (
    <View
      style={{
        marginBottom: 16,
        gap: 4,
        paddingBottom: 4,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
        <Image
          style={{width: 50, height: 50, borderRadius: 12}}
          source={require('../../../assets/product.jpg')}
        />
        <View style={{gap: 4}}>
          <Text>{item.name}</Text>
          <Text>{item.totalWeight.toFixed(0)}г</Text>

          <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
            <Button onPress={handleMinus} mode={'outlined'}>
              -
            </Button>
            <Text>{item.quantity}</Text>
            <Button
              onPress={handlePlus}
              disabled={item.quantity === item.availableQuantity}
              mode={'outlined'}>
              +
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};
