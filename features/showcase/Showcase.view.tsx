import {View} from 'react-native';
import {CartButton} from './components/CartButton';
import {ProductsList} from './components/ProductsList';
import {useMemo} from 'react';
import {ShowcaseViewmodel} from './Showcase.viewmodel';
import {ActivityIndicator, Text} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {SafeAreaView} from 'react-native-safe-area-context';

export const ShowcaseView = observer(() => {
  const viewModel = useMemo(() => new ShowcaseViewmodel(), []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <CartButton />
      {viewModel.isLoading ? (
        <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={{flex: 1, paddingHorizontal: 16, paddingTop: 12}}>
          <Text style={{fontSize: 32, marginBottom: 16, fontWeight: 'bold'}}>
            Showcase
          </Text>
          <ProductsList
            onAdd={viewModel.addProduct}
            onDelete={viewModel.deleteProduct}
            data={viewModel.products}
          />
        </View>
      )}
    </SafeAreaView>
  );
});
