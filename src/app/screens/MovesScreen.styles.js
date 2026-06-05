// MovesScreen.styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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