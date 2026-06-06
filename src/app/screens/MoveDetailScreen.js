import React from 'react';
import {
  View, Text, ScrollView,
  TouchableOpacity, ActivityIndicator, SafeAreaView, StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMoveDetail } from '../../hooks/useMoveDetail';
import { capitalizeName } from '../../utils/pokemonUtils';
import { styles } from './MoveDetailScreen.styles';

const TYPE_COLORS = {
  fire: '#F08030',     water: '#6890F0',    grass: '#78C850',
  electric: '#F8D030', ice: '#98D8D8',      fighting: '#C03028',
  poison: '#A040A0',   ground: '#E0C068',   flying: '#A890F0',
  psychic: '#F85888',  bug: '#A8B820',      rock: '#B8A038',
  ghost: '#705898',    dragon: '#7038F8',   dark: '#705848',
  steel: '#B8B8D0',    fairy: '#EE99AC',    normal: '#A8A878',
};

const CLASS_LABEL = {
  physical: '⚔️ Físico',
  special:  '✨ Especial',
  status:   '🔄 Status',
};

function StatRow({ label, value }) {
  if (value == null) return null;
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

export default function MoveDetailScreen() {
  const { move } = useLocalSearchParams();
  const router = useRouter();
  const { data, loading, error } = useMoveDetail(move);

  const typeColor = data ? (TYPE_COLORS[data.type] ?? '#888') : '#888';

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#E3000F" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DETALHES DO MOVIMENTO</Text>
        <View style={styles.backBtn} />
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#E3000F" />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>

          <View style={[styles.heroCard, { borderLeftColor: typeColor }]}>
            <Text style={styles.moveName}>{capitalizeName(data.name)}</Text>
            <View style={styles.badgeRow}>
              <View style={[styles.typeBadge, { backgroundColor: typeColor }]}>
                <Text style={styles.badgeText}>{data.type.toUpperCase()}</Text>
              </View>
              <View style={styles.classBadge}>
                <Text style={styles.classBadgeText}>
                  {CLASS_LABEL[data.damageClass] ?? data.damageClass}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.statsCard}>
            <StatRow label="Poder"    value={data.power    ?? '—'} />
            <StatRow label="PP"       value={data.pp       ?? '—'} />
            <StatRow label="Precisão" value={data.accuracy != null ? `${data.accuracy}%` : '—'} />
            {data.effectChance != null && (
              <StatRow label="Chance de efeito" value={`${data.effectChance}%`} />
            )}
          </View>

          {data.shortEffect && (
            <View style={styles.descCard}>
              <Text style={styles.descTitle}>Efeito</Text>
              <Text style={styles.descText}>{data.shortEffect}</Text>
            </View>
          )}

          {data.flavorText && (
            <View style={styles.descCard}>
              <Text style={styles.descTitle}>Descrição</Text>
              <Text style={styles.descText}>{data.flavorText}</Text>
            </View>
          )}

        </ScrollView>
      )}
    </SafeAreaView>
  );
}