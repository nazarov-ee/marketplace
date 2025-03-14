import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ShowcaseView} from './features';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type RootStackParamList = {
  showcase: undefined;
  cart: undefined;
  checkout: undefined;
  myOrders: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const useAppNavigation = () =>
  useNavigation<NavigationProp<RootStackParamList>>();

export const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="showcase"
        component={ShowcaseView}
      />
      <Stack.Screen name="cart" component={ShowcaseView} />
      <Stack.Screen name="checkout" component={ShowcaseView} />
      <Stack.Screen name="myOrders" component={ShowcaseView} />
    </Stack.Navigator>
  );
};
