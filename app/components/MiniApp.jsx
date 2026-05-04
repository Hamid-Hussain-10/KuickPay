import { View, Text, StyleSheet } from "react-native";
import React from "react";

const MiniApp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar</Text>
      <Text style={styles.comingSoon}>Coming Soon</Text>
    </View>
  );
};

export default MiniApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },

  comingSoon: {
    fontSize: 16,
    color: "gray",
  },
});
