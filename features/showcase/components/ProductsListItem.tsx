import {FC} from 'react';
import {IShowcaseProduct} from '../../../domain/IShowcaseProduct';
import {observer} from 'mobx-react-lite';
import cartService from '../../../services/cartService/CartService';
import {Image, StyleSheet, View} from 'react-native';
import {Button, IconButton, Text} from 'react-native-paper';

type Props = {
  product: IShowcaseProduct;
  onDelete: () => void;
  onAdd: () => void;
};

export const ProductsListItem: FC<Props> = observer(
  ({product, onAdd, onDelete}) => {
    const quantityInCart =
      cartService.order?.products[product.id]?.quantity ?? 0;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {quantityInCart > 0 && (
            <View style={styles.quantityWrapper}>
              <Text style={styles.quantity}>{quantityInCart}</Text>
            </View>
          )}
          <Image
            source={require('../../../assets/product.jpg')}
            style={styles.image}
          />
        </View>
        <View style={styles.flex}>
          <Text style={styles.productName} numberOfLines={1}>
            {product.name}
          </Text>
          <Text style={styles.productWeight}>{product.weight.toFixed(0)}г</Text>
          <View style={styles.buttonsRow}>
            {quantityInCart > 0 && (
              <IconButton
                icon={'minus'}
                onPress={onDelete}
                mode={'contained'}
              />
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
  },
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 4,
    flex: 1,
  },
  quantityWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.59)',
    width: 150,
    height: 150,
    borderRadius: 16,
    zIndex: 2,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  productWeight: {fontSize: 12, opacity: 0.8},
  productName: {marginTop: 4},
  flex: {flex: 1},
  image: {
    width: 150,
    height: 150,
    borderRadius: 16,
  },
  quantity: {
    color: '#fff',
    fontSize: 32,
  },
  content: {
    padding: 22,
    borderRadius: 16,
    backgroundColor: 'rgba(196,196,196,0.36)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
