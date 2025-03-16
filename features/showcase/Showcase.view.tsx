import {StyleSheet, View} from 'react-native';
import {CartButton} from './components/CartButton';
import {ProductsList} from './components/ProductsList';
import {useMemo} from 'react';
import {ShowcaseViewmodel} from './Showcase.viewmodel';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {SafeAreaView} from 'react-native-safe-area-context';

export const ShowcaseView = observer(() => {
  const viewModel = useMemo(() => new ShowcaseViewmodel(), []);

  if (viewModel.isError) {
    return (
      <SafeAreaView style={styles.flex}>
        <View style={styles.container}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Что-то пошло не так...</Text>
            <Button onPress={viewModel.fetchData}>Попробовать ещё раз</Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.flex}>
      <CartButton />
      {viewModel.isLoading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>Каталог</Text>
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

const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    fontSize: 32,
    marginBottom: 16,
    fontWeight: 'bold',
  },
});

const Loader = () => {
  return (
    <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
      <ActivityIndicator />
    </View>
  );
};
