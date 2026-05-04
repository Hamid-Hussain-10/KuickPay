import { StyleSheet, Text, View, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { useNavigation } from '@react-navigation/native';

const Tabs = () => {
   const navigation = useNavigation();
  const handlePress = (label) => {
    console.log(`${label} pressed`);
  };

  return (
    <View style={styles.amountContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && styles.pressed,
        ]}
        onPress={() => navigation.navigate('payments')}
      >
        <Ionicons
          name="document-text-outline"
          size={40}
          color="#ffffff"
        />
        <Text style={styles.cardText}>Bill Payments</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && styles.pressed,
        ]}
        onPress={() => handlePress("Mini App")}
      >
        <Ionicons
          name="grid-outline"
          size={40}
          color="#ffffff"
        />
        <Text style={styles.cardText}>Mini App</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && styles.pressed,
        ]}
        onPress={() => handlePress("Mobile Topup")}
      >
        <Ionicons
          name="phone-portrait-outline"
          size={40}
          color="#ffffff"
        />
        <Text style={styles.cardText}>Mobile Topup</Text>
      </Pressable>
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 10,
    marginBottom: 10,
  },

  card: {
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#20ceab",
    borderRadius: 20,
    elevation: 5,
    width: 100,
    height: 100,
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },

  cardText: {
    marginTop: 5,
    fontSize: 12,
    color: "#ffffff",
  },
});