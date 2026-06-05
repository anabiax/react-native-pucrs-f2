import { useState, useEffect } from 'react';
import { fetchMoveDetail } from '../services/moveDetail';

export function useMoveDetail(moveName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!moveName) return;
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchMoveDetail(moveName);
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Erro ao carregar detalhes');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [moveName]);

  return { data, loading, error };
}