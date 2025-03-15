import {View} from 'react-native';
import {FC, useCallback} from 'react';
import {Switch, Text} from 'react-native-paper';
import {IOrderOption} from '../../../domain/IOrderOption';
import cartService from '../../../services/cartService/CartService';
import {observer} from 'mobx-react-lite';

type Props = {
  options: Array<IOrderOption>;
};
export const CartOptions: FC<Props> = ({options}) => {
  return (
    <View style={{flex: 1, paddingHorizontal: 12, gap: 4}}>
      <Text style={{fontWeight: 'bold'}}>Опции заказа</Text>
      {options.map(option => (
        <CartOption key={option.id} option={option} />
      ))}
    </View>
  );
};

const CartOption: FC<{option: IOrderOption}> = observer(({option}) => {
  const handlePress = useCallback(() => {
    cartService.toggleOption(option);
  }, [option]);

  return (
    <View
      style={{
        flexDirection: 'row',
        opacity: option.isEnabled ? 1 : 0.5,
        alignItems: 'center',
        gap: 4,
      }}>
      <Text>{option.title}</Text>
      <Switch onChange={handlePress} value={option.isEnabled} />
    </View>
  );
});
