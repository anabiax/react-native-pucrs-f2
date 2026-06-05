import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { getCardBackground, formatPokemonId, capitalizeName } from '../utils/pokemonUtils';
import { styles } from './PokemonCard.styles';

export default function PokemonCard({ pokemon, onPress }) {
  const bgColor = getCardBackground(pokemon.id);

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: bgColor }]}
      onPress={() => onPress?.(pokemon)}
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: pokemon.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.id}>{formatPokemonId(pokemon.id)}</Text>
        <Text style={styles.name}>{capitalizeName(pokemon.name)}</Text>
      </View>
    </TouchableOpacity>
  );
}