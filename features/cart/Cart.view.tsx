import {observer} from 'mobx-react-lite';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Surface, Text} from 'react-native-paper';
import {Pressable, StyleSheet, View} from 'react-native';
import {useAppNavigation} from '../../RootStack';
import {CartList} from './components/CartList';
import {useEffect} from 'react';
import cartService from '../../services/cartService/CartService';
import {when} from 'mobx';

export const CartView = observer(() => {
  const navigation = useAppNavigation();

  useEffect(() => {
    if (!navigation.canGoBack()) {
      return;
    }
    when(
      () => cartService.productsToList.length === 0,
      () => {
        navigation.goBack();
      },
    );
  }, [navigation]);

  return (
    <SafeAreaView style={{flex: 1, paddingVertical: 12}}>
      <View style={styles.container}>
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
            padding: 12,
          }}>
          <Text style={{fontWeight: 'bold'}}>
            Сумма заказа: {cartService.totalSumInRoubles.toFixed(2)}₽
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});
