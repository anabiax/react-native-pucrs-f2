import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emoji: { fontSize: 16 },
  name: { flex: 1, fontSize: 15, fontWeight: '500', color: '#222' },
  power: { fontSize: 12, color: '#888', fontWeight: '600', marginRight: 8 },
  chevron: { fontSize: 20, color: '#ccc', fontWeight: '300' },
});