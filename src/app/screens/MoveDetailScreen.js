import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMoveDetail } from '../../hooks/useMoveDetail';
import { capitalizeName, getCardBackground } from '../../utils/pokemonUtils';
import {
  MOVE_TYPE_EMOJI,
} from '../../services/pokemonMoves';
import {
  TARGET_LABELS,
  DAMAGE_CLASS_LABELS,
  DAMAGE_CLASS_COLORS,
} from '../../services/moveDetail';

const PAGE_SIZE = 5;

export default function MoveDetailScreen() {
  const { move } = useLocalSearchParams();
  const router = useRouter();
  const { data, loading, error } = useMoveDetail(move);
  const [showAll, setShowAll] = useState(false);

  const bgColor = data ? getCardBackground(data.id) : '#F5D5B8';
  const emoji = data ? (MOVE_TYPE_EMOJI[data.type] || '⭐') : '⭐';
  const visibleLearners = showAll ? data?.learnedBy : data?.learnedBy?.slice(0, PAGE_SIZE);

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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Hero card */}
          <View style={[styles.heroCard, { backgroundColor: bgColor }]}>
            <Text style={styles.heroEmoji}>{emoji}</Text>
            <Text style={styles.heroName}>{capitalizeName(data.displayName)}</Text>
          </View>

          {/* Stats row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{data.power ?? '—'}</Text>
              <Text style={styles.statLabel}>PODER</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {data.accuracy != null ? `${data.accuracy}%` : '—'}
              </Text>
              <Text style={styles.statLabel}>PRECISÃO</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{data.pp ?? '—'}</Text>
              <Text style={styles.statLabel}>PP</Text>
            </View>
          </View>

          {/* Info table */}
          <View style={styles.section}>
            <InfoRow
              label="Tipo"
              value={`${MOVE_TYPE_EMOJI[data.type] || '⭐'} ${capitalizeName(data.type)}`}
              valueColor="#E3000F"
            />
            <InfoRow
              label="Categoria"
              value={`${data.damageClass === 'special' ? '✦' : data.damageClass === 'physical' ? '⚔️' : '○'} ${DAMAGE_CLASS_LABELS[data.damageClass] || data.damageClass}`}
              valueColor={DAMAGE_CLASS_COLORS[data.damageClass]}
            />
            {data.secondaryEffect && (
              <InfoRow
                label="Efeito secundário"
                value={`${emoji} ${data.secondaryEffect}`}
                valueColor="#E3000F"
              />
            )}
            {data.effectChance && (
              <InfoRow label="Chance do efeito" value={`${data.effectChance}%`} />
            )}
            <InfoRow
              label="Alvo"
              value={TARGET_LABELS[data.target] || capitalizeName(data.target)}
            />
            <InfoRow label="Geração" value={data.generation} />
          </View>

          {/* Description */}
          {data.description ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>DESCRIÇÃO</Text>
              <Text style={styles.description}>{data.description}</Text>
            </View>
          ) : null}

          {/* Learned by */}
          <View style={styles.section}>
            <View style={styles.learnedHeader}>
              <Text style={styles.sectionTitle}>POKÉMONS QUE APRENDEM</Text>
              <Text style={styles.learnedCount}>{data.totalLearners} pokémons</Text>
            </View>

            {visibleLearners?.map((p) => (
              <View key={p.id} style={styles.learnerRow}>
                <Text style={styles.learnerName}>{capitalizeName(p.name)}</Text>
                <Text style={styles.learnerLevel}>{p.id}</Text>
              </View>
            ))}

            {!showAll && data.learnedBy.length > PAGE_SIZE && (
              <TouchableOpacity style={styles.loadMoreBtn} onPress={() => setShowAll(true)}>
                <Text style={styles.loadMoreText}>Ver mais pokémons</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

function InfoRow({ label, value, valueColor }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, valueColor ? { color: valueColor } : null]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#E3000F' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E3000F',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backBtn: { width: 36, alignItems: 'center', justifyContent: 'center' },
  backArrow: { color: '#fff', fontSize: 22, fontWeight: '700' },
  headerTitle: { color: '#FFD700', fontSize: 16, fontWeight: '800', letterSpacing: 2 },
  centered: { flex: 1, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center' },
  errorText: { color: '#E3000F', fontSize: 15, textAlign: 'center', padding: 24 },
  scrollContent: { backgroundColor: '#F5F5F5', paddingBottom: 40 },

  // Hero
  heroCard: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  heroEmoji: { fontSize: 72 },
  heroName: { fontSize: 22, fontWeight: '800', color: '#222', marginTop: 12 },

  // Stats
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    paddingVertical: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '800', color: '#222' },
  statLabel: { fontSize: 10, color: '#aaa', fontWeight: '600', marginTop: 2, letterSpacing: 0.5 },
  statDivider: { width: 1, backgroundColor: '#eee', marginVertical: 4 },

  // Section
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#aaa',
    letterSpacing: 1,
    marginBottom: 10,
  },

  // Info rows
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: { fontSize: 13, color: '#888' },
  infoValue: { fontSize: 13, fontWeight: '600', color: '#222', textAlign: 'right', flex: 1, marginLeft: 16 },

  // Description
  description: { fontSize: 14, color: '#444', lineHeight: 20 },

  // Learned by
  learnedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  learnedCount: { fontSize: 13, color: '#E3000F', fontWeight: '700' },
  learnerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  learnerName: { fontSize: 14, fontWeight: '600', color: '#222' },
  learnerLevel: { fontSize: 14, color: '#888' },

  // Load more
  loadMoreBtn: {
    backgroundColor: '#E3000F',
    borderRadius: 12,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  loadMoreText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});