import {FC, useCallback} from 'react';
import {IProduct} from '../../../domain/IProduct';
import cartService from '../../../services/cartService/CartService';
import {Image, StyleSheet, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';

type Props = {
  item: IProduct;
};

export const CartListItem: FC<Props> = ({item}) => {
  const handlePlus = useCallback(() => {
    cartService.addProduct(item);
  }, [item]);

  const handleMinus = useCallback(() => {
    cartService.deleteProduct(item.id);
  }, [item]);

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    gap: 4,
    paddingBottom: 4,
    paddingHorizontal: 12,
  },
});
