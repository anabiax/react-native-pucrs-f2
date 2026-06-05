import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#E3000F' },
  body: { flex: 1, backgroundColor: '#F5F5F5' },
  searchWrapper: { backgroundColor: '#2a2a2a', paddingTop: 12, paddingBottom: 12 },
  scrollContent: { paddingTop: 16, paddingBottom: 32 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  errorText: { color: '#E3000F', fontSize: 15, textAlign: 'center', marginBottom: 16 },
  retryBtn: { backgroundColor: '#E3000F', borderRadius: 12, paddingHorizontal: 24, paddingVertical: 10 },
  retryText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  loadMoreBtn: { 
    backgroundColor: '#E3000F', 
    marginHorizontal: 16, 
    borderRadius: 14, 
    height: 50, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 8 
  },
  loadMoreText: { color: '#fff', fontWeight: '700', fontSize: 15, letterSpacing: 0.3 },
});