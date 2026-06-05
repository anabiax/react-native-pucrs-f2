import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './PokedexHeader.styles';

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