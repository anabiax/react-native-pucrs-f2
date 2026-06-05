import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MOVE_TYPE_EMOJI } from '../services/pokemonMoves';
import { capitalizeName } from '../utils/pokemonUtils';
import { styles } from './MoveItem.styles';

export default function MoveItem({ move }) {
  const router = useRouter();
  const emoji = MOVE_TYPE_EMOJI[move.type] || '⭐';

  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => router.push(`/moves/detail/${move.name}`)}
      activeOpacity={0.75}
    >
      <View style={styles.iconWrapper}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      <Text style={styles.name}>{capitalizeName(move.displayName)}</Text>
      {move.power ? (
        <Text style={styles.power}>{move.power} pw</Text>
      ) : null}
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}