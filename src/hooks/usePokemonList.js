import { useState, useEffect, useCallback } from 'react';
import { fetchPokemonListEnriched } from '../services/pokeApi';

const PAGE_SIZE = 20;

export function usePokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  const loadPokemons = useCallback(async (currentOffset = 0, append = false) => {
    try {
      if (currentOffset === 0) setLoading(true);
      else setLoadingMore(true);

      setError(null);

      const data = await fetchPokemonListEnriched(PAGE_SIZE, currentOffset);

      setPokemons((prev) => (append ? [...prev, ...data.pokemons] : data.pokemons));
      setHasNext(data.hasNext);
      setOffset(currentOffset + PAGE_SIZE);
    } catch (err) {
      setError(err.message || 'Erro ao carregar pokémons');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadPokemons(0, false);
  }, [loadPokemons]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasNext) {
      loadPokemons(offset, true);
    }
  }, [loadingMore, hasNext, offset, loadPokemons]);

  const refresh = useCallback(() => {
    setOffset(0);
    loadPokemons(0, false);
  }, [loadPokemons]);

  return {
    pokemons,
    loading,
    loadingMore,
    error,
    hasNext,
    loadMore,
    refresh,
  };
}