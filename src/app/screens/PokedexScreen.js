import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';

import PokedexHeader from '../../components/PokedexHeader';
import SearchBar from '../../components/SearchBar';
import PokemonGrid from '../../components/PokemonGrid';
import { usePokemonList } from '../../hooks/usePokemonList';
import { styles } from './PokedexScreen.styles';

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