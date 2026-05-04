import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GateActionProps {
  onPress: () => void;
  title?: string;
  disabled?: boolean;
}

export default function GateAction({ onPress, title = "Navigate to Gate", disabled = false }: GateActionProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, disabled && styles.buttonDisabled]} 
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
      >
        <LinearGradient
          colors={['#1E3A5F', '#0D1F35']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Text style={styles.buttonText}>{title}</Text>
          <View style={styles.arrowCircle}>
            <Text style={styles.arrowText}>→</Text>
          </View>
        </LinearGradient>
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
    borderRadius: 16,
    shadowColor: '#0D1F35',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
    minWidth: 320,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#EDE9E3',
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.5,
  },
  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 110, 0.6)', // Premium gold accent
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    color: '#C9A96E', // Gold arrow
    fontSize: 16,
    fontWeight: 'bold',
  }
});
