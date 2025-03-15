import {observer} from 'mobx-react-lite';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Surface, Text} from 'react-native-paper';
import {Pressable, View} from 'react-native';
import {useAppNavigation} from '../../RootStack';
import {CartList} from './components/CartList';
import {useEffect} from 'react';
import cartService from '../../services/cartService/CartService';
import {reaction} from 'mobx';

export const CartView = observer(() => {
  const navigation = useAppNavigation();

  useEffect(() => {
    reaction(
      () => cartService.productsToList.length,
      () => {
        if (!cartService.productsToList.length) {
          navigation.goBack();
        }
      },
      {fireImmediately: true},
    );
  }, [navigation]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          gap: 16,
          alignItems: 'center',
          paddingHorizontal: 16,
        }}>
        <Pressable onPress={navigation.goBack}>
          <Text style={{fontSize: 32}}>{'<'}</Text>
        </Pressable>
        <Text style={{fontSize: 32, fontWeight: 'bold'}}>Корзина</Text>
      </View>
      <View style={{flex: 1}}>
        <CartList />
        <Surface
          style={{
            gap: 6,
            marginTop: 6,
          }}>
          <Text style={{fontWeight: 'bold'}}>
            Сумма заказа:{' '}
            {((cartService.order?.totalSum ?? 0) / 100).toFixed(2)}₽
          </Text>
          <Text style={{fontWeight: 'bold'}}>
            Итоговый вес: {(cartService.order?.totalWeight ?? 0).toFixed(2)}г
          </Text>
        </Surface>
        <Button
          disabled={!cartService.isValidMinCheck}
          onPress={() => navigation.navigate('checkout')}
          mode={'contained-tonal'}>
          {cartService.isValidMinCheck
            ? 'Оформить'
            : 'Минимальная сумма заказа 1000₽!'}
        </Button>
      </View>
    </SafeAreaView>
  );
});
