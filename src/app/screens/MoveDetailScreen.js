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
import { capitalizeName, getCardBackground } from '../../utils/pokemonUtils';
import { MOVE_TYPE_EMOJI } from '../../services/pokemonMoves';
import {
  TARGET_LABELS,
  DAMAGE_CLASS_LABELS,
  DAMAGE_CLASS_COLORS,
} from '../../services/moveDetail';
import { styles } from './MoveDetailScreen.styles';

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

          {/* Info tabela */}
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

          {/* Descricao */}
          {data.description ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>DESCRIÇÃO</Text>
              <Text style={styles.description}>{data.description}</Text>
            </View>
          ) : null}

          {/* Aprendido por */}
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