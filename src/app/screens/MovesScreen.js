import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePokemonMoves } from '../../hooks/usePokemonMoves';
import MoveItem from '../../components/MoveItem';
import { formatPokemonId, capitalizeName, getCardBackground } from '../../utils/pokemonUtils';

export default function MovesScreen() {
  const { name, id } = useLocalSearchParams();
  const router = useRouter();
  const { data, loading, error } = usePokemonMoves(name || id);

  const bgColor = data ? getCardBackground(data.pokemon.id) : '#F5D5B8';

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#E3000F" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MOVIMENTOS</Text>
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
          {/* Card do pokémon */}
          <View style={[styles.pokemonCard, { backgroundColor: bgColor }]}>
            <Image
              source={{ uri: data.pokemon.image }}
              style={styles.pokemonImage}
              resizeMode="contain"
            />
            <Text style={styles.pokemonId}>{formatPokemonId(data.pokemon.id)}</Text>
            <Text style={styles.pokemonName}>{capitalizeName(data.pokemon.name)}</Text>
          </View>

          {/* Lista de movimentos */}
          <View style={styles.movesSection}>
            <Text style={styles.movesCount}>
              {data.pokemon.totalMoves} movimentos
            </Text>
            {data.moves.map((move) => (
              <MoveItem key={move.id} move={move} />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#E3000F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E3000F',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backBtn: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  headerTitle: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
  },
  centered: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#E3000F',
    fontSize: 15,
    textAlign: 'center',
    padding: 24,
  },
  scrollContent: {
    backgroundColor: '#F5F5F5',
    paddingBottom: 32,
  },
  pokemonCard: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  pokemonImage: {
    width: 130,
    height: 130,
  },
  pokemonId: {
    fontSize: 13,
    color: '#c0392b',
    fontWeight: '600',
    marginTop: 8,
  },
  pokemonName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#222',
    marginTop: 2,
  },
  movesSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  movesCount: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
    marginBottom: 12,
  },
});