import {observer} from 'mobx-react-lite';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Text} from 'react-native-paper';
import {Pressable, View} from 'react-native';
import {useAppNavigation} from '../../RootStack';
import {CartList} from './components/CartList';
import {useEffect} from 'react';
import cartService from '../../services/cartService/CartService';
import {reaction} from 'mobx';
import {CartOptions} from './components/CartOptions';

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
          paddingHorizontal: 16,
          gap: 16,
          alignItems: 'center',
        }}>
        <Pressable onPress={navigation.goBack}>
          <Text style={{fontSize: 32}}>{'<'}</Text>
        </Pressable>
        <Text style={{fontSize: 32, fontWeight: 'bold'}}>Cart</Text>
      </View>
      <View style={{paddingHorizontal: 16, flex: 1}}>
        <CartList />
        <Text>
          Total sum: {((cartService.order?.totalSum ?? 0) / 100).toFixed(2)}₽
        </Text>
        <Text>
          Total weight: {(cartService.order?.totalWeight ?? 0).toFixed(2)}г
        </Text>
        <Button
          onPress={() => navigation.navigate('checkout')}
          style={{marginTop: 12}}
          mode={'contained-tonal'}>
          Checkout
        </Button>
      </View>
    </SafeAreaView>
  );
});
