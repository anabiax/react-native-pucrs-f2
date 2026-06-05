import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePokemonMoves } from '../../hooks/usePokemonMoves';
import MoveItem from '../../components/MoveItem';
import { formatPokemonId, capitalizeName, getCardBackground } from '../../utils/pokemonUtils';
import { styles } from './MovesScreen.styles';

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
          {/* Card do pokemon */}
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