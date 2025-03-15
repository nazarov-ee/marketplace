import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Text} from 'react-native-paper';
import {FlashList} from '@shopify/flash-list';
import {FC, useCallback} from 'react';
import {IProduct} from '../../domain/IProduct';
import {Alert, View} from 'react-native';
import cartService from '../../services/cartService/CartService';
import {observer} from 'mobx-react-lite';
import {useAppNavigation} from '../../RootStack';
import {CommonActions} from '@react-navigation/native';

export const CheckoutView = observer(() => {
  const navigation = useAppNavigation();

  const handleConfirmPress = useCallback(() => {
    Alert.alert('Confirm', 'Do you confirm your order and options?', [
      {
        text: 'Yes!',
        isPreferred: true,
        onPress: () => {
          cartService.submit();
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'showcase'}],
            }),
          );
        },
      },
      {text: 'No...', style: 'destructive'},
    ]);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 16}}>
      <Text style={{fontSize: 32, marginBottom: 16, fontWeight: 'bold'}}>
        Checkout
      </Text>

      <View style={{flex: 1}}>
        <Text style={{fontWeight: 'bold', marginBottom: 4, fontSize: 16}}>
          Your order
        </Text>
        <FlashList
          showsVerticalScrollIndicator={false}
          data={cartService.productsToList}
          renderItem={({item}) => <CheckoutListItem product={item} />}
        />
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontWeight: 'bold'}}>Options</Text>
        {cartService.order?.options
          .filter(opt => opt.isEnabled)
          .map(opt => {
            return <Text key={opt.id}>{opt.title}</Text>;
          })}
      </View>
      <Button onPress={handleConfirmPress} mode={'contained'}>
        Confirm order
      </Button>
    </SafeAreaView>
  );
});

const CheckoutListItem: FC<{product: IProduct}> = ({product}) => {
  return (
    <View
      style={{
        marginBottom: 4,
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <Text>
        {product.name} x{product.quantity}
      </Text>
      <Text style={{fontWeight: 'bold'}}>
        {((product.price / 100) * product.quantity).toFixed(2)}₽
      </Text>
    </View>
  );
};
