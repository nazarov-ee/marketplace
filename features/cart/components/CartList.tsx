import {Image, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {FC, useCallback} from 'react';
import {IProduct} from '../../../domain/IProduct';
import {Button, Icon, IconButton, Text} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import cartService from '../../../services/cartService/CartService';
import {CartOptions} from './CartOptions';

export const CartList = observer(() => {
  return (
    <View style={{flex: 1, marginTop: 12}}>
      <FlashList
        estimatedItemSize={113}
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
        paddingHorizontal: 12,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
        <Image
          style={{width: 100, height: 100, borderRadius: 12}}
          source={require('../../../assets/product.jpg')}
        />
        <View style={{gap: 4}}>
          <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
          <Text>
            {((item.price * item.quantity) / 100).toFixed()}₽,{' '}
            {item.totalWeight.toFixed(0)}г
          </Text>

          <View style={{flexDirection: 'row', gap: 2, alignItems: 'center'}}>
            <IconButton
              icon={'minus'}
              onPress={handleMinus}
              mode={'outlined'}
            />
            <Text style={{fontSize: 16}}>{item.quantity}</Text>
            <IconButton
              icon={'plus'}
              onPress={handlePlus}
              disabled={item.quantity === item.availableQuantity}
              mode={'outlined'}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
