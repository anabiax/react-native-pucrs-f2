import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={16} color="#999" style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Buscar por nome ou número...'}
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
  },
});
