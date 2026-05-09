import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

import { BlurView } from "expo-blur";
import Ionicons from "@expo/vector-icons/Ionicons";

const Calender = () => {
  const [date, setDate] = useState(new Date());

  //clock
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = date.toDateString();

  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      }}
      style={styles.background}
      blurRadius={3}
    >
      <View style={styles.overlay}>
        <BlurView intensity={80} tint="light" style={styles.glassCard}>
          <Ionicons name="calendar-outline" size={65} color="#ffffff" />

          <Text style={styles.title}>Date & Time</Text>

          <Text style={styles.date}>{formattedDate}</Text>

          <Text style={styles.time}>{formattedTime}</Text>
        </BlurView>
      </View>
    </ImageBackground>
  );
};

export default Calender;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  glassCard: {
    width: "100%",
    paddingVertical: 45,
    paddingHorizontal: 25,
    borderRadius: 35,
    overflow: "hidden",
    alignItems: "center",

    backgroundColor: "rgba(0, 0, 0, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#ffffff",
    marginTop: 15,
    letterSpacing: 2,
  },

  date: {
    fontSize: 22,
    color: "#ffffff",
    marginTop: 30,
    fontWeight: "600",
  },

  time: {
    fontSize: 40,
    color: "#2f7107",
    fontWeight: "bold",
    marginTop: 15,
    letterSpacing: 2,
  },
});
