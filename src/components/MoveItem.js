import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MOVE_TYPE_EMOJI } from '../services/pokemonMoves';
import { capitalizeName } from '../utils/pokemonUtils';

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

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emoji: { fontSize: 16 },
  name: { flex: 1, fontSize: 15, fontWeight: '500', color: '#222' },
  power: { fontSize: 12, color: '#888', fontWeight: '600', marginRight: 8 },
  chevron: { fontSize: 20, color: '#ccc', fontWeight: '300' },
});