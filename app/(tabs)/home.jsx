import Ionicons from "@expo/vector-icons/Ionicons";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Image,
  FlatList,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

import Tabs from "../components/Tabs";
import Carousels from "../components/Carousels";
import MyBills from "../components/MyBills";
import RecentTransactions from "../components/RecentTransactions";

export default function Home() {
  const [profileImage, setProfileImage] = useState(null);

  const sendTestNotification = () => {
    Alert.alert("Notification", "No new notifications");
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Allow access to gallery to set profile picture"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <FlatList
      data={[{ id: "main" }]}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      renderItem={() => (
        <>
          {/* HEADER */}
          <View style={styles.header}>
            <Pressable onPress={pickImage}>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profile}
                />
              ) : (
                <Ionicons name="person-circle" size={65} color="#605e5e" />
              )}
            </Pressable>

            <View style={styles.headerText}>
              <Text style={styles.greeting}>Hello Hamid</Text>
              <Text style={styles.subText}>Welcome back</Text>
            </View>

            <Pressable onPress={sendTestNotification}>
              <Ionicons
                name="notifications-outline"
                size={26}
                color="#605e5e"
              />
            </Pressable>
          </View>

          {/* AMOUNT SECTION */}
          <View style={styles.amountSection}>
            <Pressable style={styles.amountBox}>
              <View style={styles.amountRow}>
                <Ionicons
                  name="receipt-outline"
                  size={20}
                  color="#6483f1"
                />
                <Text style={styles.label}>Amount Paid</Text>
              </View>

              <Text style={styles.amount}>Rs 0.00</Text>
            </Pressable>

            <View style={styles.amountContainer}>
              <Pressable style={styles.card}>
                <Ionicons name="wallet-outline" size={28} color="#fff" />
                <Text style={styles.cardText}>Wallet</Text>
              </Pressable>

              <Pressable style={styles.card}>
                <Ionicons name="bag-outline" size={28} color="#fff" />
                <Text style={styles.cardText}>Business</Text>
              </Pressable>
            </View>
          </View>

          <Tabs />

          <View style={styles.carouselWrapper}>
            <Carousels />
          </View>

          <Text style={styles.sectionTitle}>My Bills</Text>
          <MyBills />

          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <RecentTransactions />
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 30,
    backgroundColor: "#f9fafc",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  profile: {
    width: 65,
    height: 65,
    borderRadius: 50,
  },

  headerText: {
    flex: 1,
    marginLeft: 12,
  },

  greeting: {
    fontSize: 18,
    fontWeight: "600",
  },

  subText: {
    fontSize: 14,
    color: "#777",
  },

  amountSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  amountBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    elevation: 3,
    width: "55%",
  },

  amountRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    marginLeft: 10,
    color: "#666",
  },

  amount: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
  },

  amountContainer: {
    flexDirection: "row",
    gap: 10,
  },

  card: {
    backgroundColor: "#20ceab",
    width: 70,
    height: 70,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    // elevation: 4,
  },

  cardText: {
    color: "#fff",
    fontSize: 11,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 8,
  },

  carouselWrapper: {
    height: 100,
    marginTop: 5,
    marginBottom: 5,
  },
});