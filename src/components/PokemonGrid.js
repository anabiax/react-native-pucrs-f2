import React from 'react';
import { FlatList } from 'react-native';
import PokemonCard from './PokemonCard';
import { styles } from './PokemonGrid.styles';

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