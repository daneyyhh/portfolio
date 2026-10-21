import { useState, useEffect, useCallback } from 'react';
import { fetchResearchTopics, getResearchStats } from '../data/researchData';

/**
 * useResearchData
 * Custom data-fetching hook with full lifecycle management:
 * 1. LOADING: Asynchronous retrieval with skeleton indicators
 * 2. SUCCESS: Populated genuine research updates & statistics
 * 3. EMPTY: Handled when zero entries are returned ("No research published yet.")
 * 4. ERROR: Catches failures with diagnostic logging and retry capability
 */
export function useResearchData() {
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'empty' | 'error'
  const [topics, setTopics] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);

  const retry = useCallback(() => {
    setStatus('loading');
    setError(null);
    setReloadCount((c) => c + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;
    setStatus('loading');
    setError(null);

    const loadData = async () => {
      try {
        const data = await fetchResearchTopics();
        if (!isMounted) return;

        if (!data || !Array.isArray(data) || data.length === 0) {
          setTopics([]);
          setStats(getResearchStats());
          setStatus('empty');
        } else {
          setTopics(data);
          setStats(getResearchStats());
          setStatus('success');
        }
      } catch (err) {
        console.error('[RESEARCH_DATA_FETCH_ERROR]: Unable to retrieve research archive records:', err);
        if (!isMounted) return;
        setError(err);
        setStatus('error');
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [reloadCount]);

  return {
    status,
    topics,
    stats,
    error,
    retry,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isEmpty: status === 'empty',
    isError: status === 'error'
  };
}

export default useResearchData;
