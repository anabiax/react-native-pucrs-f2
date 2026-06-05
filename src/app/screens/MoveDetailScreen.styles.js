import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#E3000F' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E3000F',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backBtn: { width: 36, alignItems: 'center', justifyContent: 'center' },
  backArrow: { color: '#fff', fontSize: 22, fontWeight: '700' },
  headerTitle: { color: '#FFD700', fontSize: 16, fontWeight: '800', letterSpacing: 2 },
  centered: { flex: 1, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center' },
  errorText: { color: '#E3000F', fontSize: 15, textAlign: 'center', padding: 24 },
  scrollContent: { backgroundColor: '#F5F5F5', paddingBottom: 40 },

  // Hero
  heroCard: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  heroEmoji: { fontSize: 72 },
  heroName: { fontSize: 22, fontWeight: '800', color: '#222', marginTop: 12 },

  // Stats
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    paddingVertical: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '800', color: '#222' },
  statLabel: { fontSize: 10, color: '#aaa', fontWeight: '600', marginTop: 2, letterSpacing: 0.5 },
  statDivider: { width: 1, backgroundColor: '#eee', marginVertical: 4 },

  // Section
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#aaa',
    letterSpacing: 1,
    marginBottom: 10,
  },

  // Info rows
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: { fontSize: 13, color: '#888' },
  infoValue: { fontSize: 13, fontWeight: '600', color: '#222', textAlign: 'right', flex: 1, marginLeft: 16 },

  // Description
  description: { fontSize: 14, color: '#444', lineHeight: 20 },

  // Learned by
  learnedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  learnedCount: { fontSize: 13, color: '#E3000F', fontWeight: '700' },
  learnerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  learnerName: { fontSize: 14, fontWeight: '600', color: '#222' },
  learnerLevel: { fontSize: 14, color: '#888' },

  // Load more
  loadMoreBtn: {
    backgroundColor: '#E3000F',
    borderRadius: 12,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  loadMoreText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});