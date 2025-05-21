import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© VisionHive 2025</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'green',
    paddingVertical: 10,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
});
