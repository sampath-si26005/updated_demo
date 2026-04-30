import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface GateActionProps {
  onPress: () => void;
  title?: string;
  disabled?: boolean;
}

export default function GateAction({ onPress, title = "Start Navigation", disabled = false }: GateActionProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, disabled && styles.buttonDisabled]} 
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 40,
    width: '100%',
  },
  button: {
    backgroundColor: '#38A169', // Vibrant Green
    paddingVertical: 24,
    paddingHorizontal: 80,
    borderRadius: 100, // Pill shape
    shadowColor: '#38A169',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
    minWidth: 400,
  },
  buttonDisabled: {
    backgroundColor: '#A0AEC0',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  }
});
