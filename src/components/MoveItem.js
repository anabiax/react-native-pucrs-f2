import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { capitalizeName } from '../utils/pokemonUtils';
import { styles } from './MoveItem.styles';

const METHOD_LABEL = {
  'level-up': '⬆ Nível',
  machine:    '💿 MT/MO',
  egg:        '🥚 Ovo',
  tutor:      '📖 Tutor',
};

const METHOD_COLOR = {
  'level-up': '#4CAF50',
  machine:    '#2196F3',
  egg:        '#FF9800',
  tutor:      '#9C27B0',
};

export default function MoveItem({ move }) {
  const router = useRouter();
  const label  = METHOD_LABEL[move.learnMethod] ?? move.learnMethod;
  const color  = METHOD_COLOR[move.learnMethod] ?? '#888';

  return (
    <View style={styles.container}>
      <View style={styles.nameRow}>
        <Text style={styles.name}>{capitalizeName(move.name)}</Text>
        {move.learnMethod === 'level-up' && move.level > 0 && (
          <Text style={styles.level}>Nv. {move.level}</Text>
        )}
      </View>
      <View style={[styles.badge, { backgroundColor: color }]}>
        <Text style={styles.badgeText}>{label}</Text>
      </View>
    </View>
  );
}