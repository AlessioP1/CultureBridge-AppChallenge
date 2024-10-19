import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

const Hub1 = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.hubTitle}>Welcome to Hub 4</Text>
      {/* Add content specific to Hub 1 here */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hubTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Hub1;
