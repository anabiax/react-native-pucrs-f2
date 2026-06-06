import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMoveDetail } from '../../hooks/useMoveDetail';
import { capitalizeName } from '../../utils/pokemonUtils';
import { styles } from './MoveDetailScreen.styles';

const TYPE_META = {
  fire:     { color: '#FF9741', emoji: '🔥' },
  water:    { color: '#3692DC', emoji: '💧' },
  grass:    { color: '#38BF4B', emoji: '🍃' },
  electric: { color: '#FBD100', emoji: '⚡' },
  ice:      { color: '#39C6C0', emoji: '❄️' },
  fighting: { color: '#E0306A', emoji: '🥊' },
  poison:   { color: '#B567CE', emoji: '☠️' },
  ground:   { color: '#E87236', emoji: '🌍' },
  flying:   { color: '#89AAE3', emoji: '🌬️' },
  psychic:  { color: '#FF6675', emoji: '🔮' },
  bug:      { color: '#83C300', emoji: '🐛' },
  rock:     { color: '#C9BB8A', emoji: '🪨' },
  ghost:    { color: '#4C6AB2', emoji: '👻' },
  dragon:   { color: '#006FC9', emoji: '🐉' },
  dark:     { color: '#5B5466', emoji: '🌑' },
  steel:    { color: '#60A1B8', emoji: '⚙️' },
  fairy:    { color: '#FB89EB', emoji: '✨' },
  normal:   { color: '#9FA19F', emoji: '⭐' },
};

const CLASS_META = {
  physical: { label: 'Físico',   emoji: '⚔️',  color: '#E0306A' },
  special:  { label: 'Especial', emoji: '✨',  color: '#FF9741' },
  status:   { label: 'Status',   emoji: '🔄',  color: '#9FA19F' },
};

const POKEMON_PAGE_SIZE = 5;

function InfoRow({ label, value, valueColor, isLast }) {
  if (value == null) return null;
  return (
    <View style={[styles.infoRow, isLast && styles.infoRowLast]}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, valueColor ? { color: valueColor } : null]}>
        {value}
      </Text>
    </View>
  );
}

export default function MoveDetailScreen() {
  const { move } = useLocalSearchParams();
  const router = useRouter();
  const { data, loading, error } = useMoveDetail(move);
  const [page, setPage] = useState(1);

  const typeMeta  = data ? (TYPE_META[data.type]         ?? { color: '#9FA19F', emoji: '⭐' }) : null;
  const classMeta = data ? (CLASS_META[data.damageClass] ?? { label: data?.damageClass, emoji: '❓', color: '#888' }) : null;

  const visiblePokemons = data?.learnedBy.slice(0, page * POKEMON_PAGE_SIZE) ?? [];
  const hasMore = data ? visiblePokemons.length < data.learnedBy.length : false;

  const infoRows = data ? [
    { label: 'Tipo',              value: `${typeMeta.emoji} ${capitalizeName(data.type)}`,      color: typeMeta.color },
    { label: 'Categoria',         value: `${classMeta.emoji} ${classMeta.label}`,               color: classMeta.color },
    data.ailment
      ? { label: 'Efeito secundário', value: `${typeMeta.emoji} ${data.ailment}`,               color: typeMeta.color }
      : null,
    data.effectChance != null
      ? { label: 'Chance do efeito',  value: `${data.effectChance}%`,                           color: null }
      : null,
    { label: 'Alvo',              value: 'Pokemon selecionado',                                  color: null },
    data.generation
      ? { label: 'Geração',       value: data.generation,                                        color: null }
      : null,
  ].filter(Boolean) : [];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#E3000F" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DETALHE</Text>
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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero */}
          <View style={[styles.heroCard, { backgroundColor: typeMeta.color + '28' }]}>
            <Text style={styles.heroEmoji}>{typeMeta.emoji}</Text>
            <Text style={styles.heroName}>{capitalizeName(data.name)}</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{data.power ?? '—'}</Text>
              <Text style={styles.statSubLabel}>Poder</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {data.accuracy != null ? `${data.accuracy}%` : '—'}
              </Text>
              <Text style={styles.statSubLabel}>Precisão</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{data.pp ?? '—'}</Text>
              <Text style={styles.statSubLabel}>PP</Text>
            </View>
          </View>

          {/* Info table */}
          <View style={styles.infoCard}>
            {infoRows.map((row, i) => (
              <InfoRow
                key={row.label}
                label={row.label}
                value={row.value}
                valueColor={row.color}
                isLast={i === infoRows.length - 1}
              />
            ))}
          </View>

          {/* Descricao */}
          {data.flavorText && (
            <View style={styles.descCard}>
              <Text style={styles.descTitle}>Descrição</Text>
              <Text style={styles.descText}>{data.flavorText}</Text>
            </View>
          )}

          {/* Aprendido por */}
          {data.learnedBy.length > 0 && (
            <View style={styles.learnedCard}>
              <View style={styles.learnedHeaderRow}>
                <Text style={styles.learnedTitle}>Pokémons que aprendem</Text>
                <Text style={styles.learnedCount}>
                  {data.learnedBy.length} pokémons
                </Text>
              </View>

              {visiblePokemons.map((p) => (
                <View key={p.id} style={styles.pokemonRow}>
                  <Text style={styles.pokemonName}>{capitalizeName(p.name)}</Text>
                  <Text style={styles.pokemonId}>{p.id}</Text>
                </View>
              ))}

              {hasMore && (
                <TouchableOpacity
                  style={styles.loadMoreBtn}
                  onPress={() => setPage((prev) => prev + 1)}
                >
                  <Text style={styles.loadMoreText}>Ver mais pokemons</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}