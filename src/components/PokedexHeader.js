import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PokedexHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <View style={styles.pokeball}>
          <View style={styles.pokeballInner} />
        </View>
        <Text style={styles.title}>POKÉDEX</Text>
      </View>
      <View style={styles.dots}>
        <View style={[styles.dot, { backgroundColor: '#FF5F57' }]} />
        <View style={[styles.dot, { backgroundColor: '#FEBC2E' }]} />
        <View style={[styles.dot, { backgroundColor: '#28C840' }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E3000F',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: 50, // Safe area aproximado
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pokeball: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  pokeballInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E3000F',
    borderWidth: 1.5,
    borderColor: '#aaa',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
