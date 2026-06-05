import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PokemonCard from './PokemonCard';

export default function PokemonGrid({ pokemons, onPokemonPress }) {
  const renderItem = ({ item }) => (
    <PokemonCard pokemon={item} onPress={onPokemonPress} />
  );

  return (
    <FlatList
      data={pokemons}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false} // Scroll controlado pelo pai (ScrollView)
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
});
