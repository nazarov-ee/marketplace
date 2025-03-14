import cartService from '../../../services/cartService/CartService';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {useAppNavigation} from '../../../RootStack';
import {observer} from 'mobx-react-lite';

export const CartButton = observer(() => {
  const navigation = useAppNavigation();

  const handleNavigateToCart = () => navigation.navigate('cart');

  console.log(cartService.order);
  if (!cartService.order || cartService.order.totalSum <= 0) {
    return null;
  }

  return (
    <View style={{position: 'absolute', zIndex: 100, bottom: 50, right: 50}}>
      <Button
        textColor={'#fff'}
        buttonColor={'#e82b2b'}
        mode={'elevated'}
        onPress={handleNavigateToCart}>
        {(cartService.order.totalSum / 100).toFixed(0)} ₽
      </Button>
    </View>
  );
});
