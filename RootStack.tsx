import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ShowcaseView} from './features';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {CartView} from './features';
import {CheckoutView} from './features/checkout/Checkout.view';

type RootStackParamList = {
  showcase: undefined;
  cart: undefined;
  checkout: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const useAppNavigation = () =>
  useNavigation<NavigationProp<RootStackParamList>>();

export const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="showcase" component={ShowcaseView} />
      <Stack.Screen name="cart" component={CartView} />
      <Stack.Screen name="checkout" component={CheckoutView} />
    </Stack.Navigator>
  );
};
