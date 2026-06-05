import { useState, useEffect } from 'react';
import { fetchPokemonMoves } from '../services/pokemonMoves';

export function usePokemonMoves(nameOrId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!nameOrId) return;

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchPokemonMoves(nameOrId);
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Erro ao carregar movimentos');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [nameOrId]);

  return { data, loading, error };
}