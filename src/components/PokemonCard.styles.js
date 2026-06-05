import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 colunas com padding lateral

export const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    paddingTop: 12,
    paddingBottom: 0,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '75%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  info: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginTop: 4,
  },
  id: {
    fontSize: 11,
    color: '#888',
    fontWeight: '500',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222',
    marginTop: 1,
  },
});