import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D7BFA7', // Rich Sandstone background
  },
  text: {
    fontSize: 24,
    fontFamily: 'Playfair',
    color: '#3C2A4D', // Midnight Plum text
  },
});

export default ProfileScreen;