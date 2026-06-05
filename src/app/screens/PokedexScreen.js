import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';

import PokedexHeader from '../../components/PokedexHeader';
import SearchBar from '../../components/SearchBar';
import PokemonGrid from '../../components/PokemonGrid';
import { usePokemonList } from '../../hooks/usePokemonList';

export default function PokedexScreen() {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
  const { pokemons, loading, loadingMore, error, hasNext, loadMore, refresh } =
    usePokemonList();

  const filteredPokemons = useMemo(() => {
    if (!searchText.trim()) return pokemons;
    const query = searchText.toLowerCase().trim();
    return pokemons.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        String(p.id).includes(query)
    );
  }, [pokemons, searchText]);

  const handlePokemonPress = (pokemon) => {
    router.push(`/moves/${pokemon.name}`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <PokedexHeader />
      <View style={styles.body}>
        <View style={styles.searchWrapper}>
          <SearchBar
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Buscar por nome ou número..."
          />
        </View>

        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#E3000F" />
          </View>
        ) : error ? (
          <View style={styles.centered}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={refresh}>
              <Text style={styles.retryText}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <PokemonGrid
              pokemons={filteredPokemons}
              onPokemonPress={handlePokemonPress}
            />

            {hasNext && !searchText && (
              <TouchableOpacity
                style={styles.loadMoreBtn}
                onPress={loadMore}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.loadMoreText}>Ver mais Pokémons</Text>
                )}
              </TouchableOpacity>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#E3000F' },
  body: { flex: 1, backgroundColor: '#F5F5F5' },
  searchWrapper: { backgroundColor: '#2a2a2a', paddingTop: 12, paddingBottom: 12 },
  scrollContent: { paddingTop: 16, paddingBottom: 32 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  errorText: { color: '#E3000F', fontSize: 15, textAlign: 'center', marginBottom: 16 },
  retryBtn: { backgroundColor: '#E3000F', borderRadius: 12, paddingHorizontal: 24, paddingVertical: 10 },
  retryText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  loadMoreBtn: { backgroundColor: '#E3000F', marginHorizontal: 16, borderRadius: 14, height: 50, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  loadMoreText: { color: '#fff', fontWeight: '700', fontSize: 15, letterSpacing: 0.3 },
});