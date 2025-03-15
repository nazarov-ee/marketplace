import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Text} from 'react-native-paper';
import {FlashList} from '@shopify/flash-list';
import {FC, useCallback} from 'react';
import {IProduct} from '../../domain/IProduct';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import cartService from '../../services/cartService/CartService';
import {observer} from 'mobx-react-lite';
import {useAppNavigation} from '../../RootStack';
import {CommonActions} from '@react-navigation/native';

export const CheckoutView = observer(() => {
  const navigation = useAppNavigation();

  const handleConfirmPress = useCallback(() => {
    Alert.alert(
      'Подтверждение заказа',
      'Вы подтверждаете состав заказа и выбранные опции?',
      [
        {
          text: 'Да!',
          isPreferred: true,
          onPress: () => {
            try {
              cartService.submit();
              Alert.alert('Заказ создан!');
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'showcase'}],
                }),
              );
            } catch (e) {
              Alert.alert('Ошибка!', `${e}`);
            }
          },
        },
        {text: 'Нет...', style: 'destructive'},
      ],
    );
  }, [navigation]);

  if (!cartService.order) {
    return null;
  }

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 16, paddingBottom: 12}}>
      <View style={styles.container}>
        <Pressable onPress={navigation.goBack}>
          <Text style={{fontSize: 32}}>{'<'}</Text>
        </Pressable>
        <Text style={{fontSize: 32, fontWeight: 'bold'}}>Чекаут</Text>
      </View>

      <View style={{flex: 1}}>
        <Text style={{fontWeight: 'bold', marginBottom: 4, fontSize: 16}}>
          Ваш заказ
        </Text>
        <FlashList
          showsVerticalScrollIndicator={false}
          data={cartService.productsToList}
          renderItem={({item}) => <CheckoutListItem product={item} />}
        />
        <Text>Итоговая сумма: {cartService.totalSumInRoubles.toFixed(2)}₽</Text>
        <Text>
          <Text>
            Итоговый вес: {(cartService.order?.totalWeight).toFixed(2)} г.
          </Text>
        </Text>
      </View>
      {cartService.order?.options.filter(opt => opt.isEnabled).length ? (
        <View style={{flex: 1}}>
          <Text style={{fontWeight: 'bold'}}>Выбранные опции</Text>
          {cartService.order?.options
            .filter(opt => opt.isEnabled)
            .map(opt => {
              return <Text key={opt.id}>{opt.title}</Text>;
            })}
        </View>
      ) : null}
      <Button onPress={handleConfirmPress} mode={'contained'}>
        Подтвердить заказ
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
});
