import {View} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import {observer} from 'mobx-react-lite';
import cartService from '../../../services/cartService/CartService';
import {CartOptions} from './CartOptions';
import {CartListItem} from './CartListItem';

export const CartList = observer(() => {
  return (
    <View style={{flex: 1, marginTop: 12}}>
      <FlashList
        estimatedItemSize={113}
        ListFooterComponent={() => (
          <CartOptions options={cartService.order?.options ?? []} />
        )}
        showsVerticalScrollIndicator={false}
        data={cartService.productsToList}
        renderItem={({item}) => <CartListItem item={item} />}
      />
    </View>
  );
});
