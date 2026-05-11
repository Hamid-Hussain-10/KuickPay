import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Switch,
  Alert,
} from "react-native";

import React, { useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

const More = () => {
  const [touchId, setTouchId] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const showComingSoon = () => {
    Alert.alert("Coming Soon");
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => router.push("/components/FirstLogin"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* PROFILE */}
      <View style={styles.profileCard}>
        <Image
          source={require("../../assets/images/icon1.png")}
          style={styles.image}
        />
      </View>

      {/* TITLE */}
      <Text style={styles.sectionTitle}>Account Settings</Text>

      {/* TOUCH ID */}
      <View style={styles.row}>
        <View style={styles.leftRow}>
          <MaterialCommunityIcons
            name="fingerprint"
            size={24}
            color="#20ceab"
          />

          <Text style={styles.rowText}>Touch ID</Text>
        </View>

        <Switch
          value={touchId}
          onValueChange={setTouchId}
          trackColor={{
            false: "#ccc",
            true: "#20ceab",
          }}
          thumbColor="#fff"
        />
      </View>

      {/* DARK MODE */}
      <View style={styles.row}>
        <View style={styles.leftRow}>
          <Ionicons name="moon-outline" size={24} color="#20ceab" />

          <Text style={styles.rowText}>Dark Mode</Text>
        </View>

        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{
            false: "#ccc",
            true: "#20ceab",
          }}
          thumbColor="#fff"
        />
      </View>

      {/* PAYMENT */}
      <Pressable style={styles.menuCard} onPress={showComingSoon}>
        <View style={styles.leftRow}>
          <Ionicons name="card-outline" size={24} color="#20ceab" />

          <Text style={styles.menuText}>Payment Methods</Text>
        </View>

        <Ionicons name="chevron-forward" size={22} color="#999" />
      </Pressable>

      {/* NOTIFICATIONS */}
      <Pressable style={styles.menuCard} onPress={showComingSoon}>
        <View style={styles.leftRow}>
          <Ionicons name="notifications-outline" size={24} color="#20ceab" />

          <Text style={styles.menuText}>Notifications</Text>
        </View>

        <Ionicons name="chevron-forward" size={22} color="#999" />
      </Pressable>

      {/* SECURITY */}
      <Pressable style={styles.menuCard} onPress={showComingSoon}>
        <View style={styles.leftRow}>
          <Ionicons name="shield-checkmark-outline" size={24} color="#20ceab" />

          <Text style={styles.menuText}>Security</Text>
        </View>

        <Ionicons name="chevron-forward" size={22} color="#999" />
      </Pressable>

      {/* HELP CENTER */}
      <Pressable style={styles.menuCard} onPress={showComingSoon}>
        <View style={styles.leftRow}>
          <Ionicons name="help-circle-outline" size={24} color="#20ceab" />

          <Text style={styles.menuText}>Help Center</Text>
        </View>

        <Ionicons name="chevron-forward" size={22} color="#999" />
      </Pressable>

      {/* LOGOUT */}
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#fff" />

        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  profileCard: {
    borderRadius: 25,
    padding: 20,
    alignItems: "center",
  },

  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
  },

  email: {
    fontSize: 15,
    color: "#777",
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    marginLeft: 5,
  },

  row: {
    padding: 5,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  rowText: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: "500",
  },

  menuCard: {
    padding: 12,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  menuText: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: "500",
  },

  logoutButton: {
    width: 150,
    marginTop: 20,
    backgroundColor: "#ff4d4d",
    borderRadius: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
  },

  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
  },
});
