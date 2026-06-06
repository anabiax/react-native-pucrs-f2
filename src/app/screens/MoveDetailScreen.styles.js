import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#E3000F',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#E3000F',
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

  // Scroll
  scrollContent: {
    backgroundColor: '#F5F5F5',
    paddingBottom: 40,
  },

  // States
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

  // Hero
  heroCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 32,
    paddingBottom: 28,
    backgroundColor: '#F5D5B8',
  },
  heroEmoji: {
    fontSize: 80,
    marginBottom: 12,
  },
  heroName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#222',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 18,
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#222',
  },
  statSubLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#aaa',
    letterSpacing: 1,
    marginTop: 3,
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#eee',
    marginVertical: 4,
  },

  // Info table
  infoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ECECEC',
  },
  infoRowLast: {
    borderBottomWidth: 0,
  },
  infoLabel: {
    fontSize: 13,
    color: '#aaa',
    fontWeight: '400',
  },
  infoValue: {
    fontSize: 13,
    color: '#222',
    fontWeight: '600',
    textAlign: 'right',
    flexShrink: 1,
    marginLeft: 12,
  },

  // Descricao
  descCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  descTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#aaa',
    letterSpacing: 1.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  descText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },

  // Aprendido por
  learnedCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 0,
    marginBottom: 12,
  },
  learnedHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  learnedTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#aaa',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  learnedCount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#E3000F',
  },
  pokemonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ECECEC',
  },
  pokemonName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  pokemonId: {
    fontSize: 14,
    color: '#aaa',
    fontWeight: '500',
  },

  // Carregar +
  loadMoreBtn: {
    backgroundColor: '#E3000F',
    marginTop: 8,
    marginBottom: 16,
    marginHorizontal: 0,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  loadMoreText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});