import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getBills } from "../components/Storage";

const MyBillsTab = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [storedBills, setStoredBills] = useState([]);

  useEffect(() => {
    const loadBills = async () => {
      const data = await getBills();
      setStoredBills(data);
    };
    loadBills();
  }, []);

  const staticBills = [
    {
      id: "1",
      name: "K-Electric",
      type: "Utility",
      billAmount: "Rs.1200",
      status: "Paid",
    },
    {
      id: "2",
      name: "SNGPL Gas",
      type: "Utility",
      billAmount: "Rs.1500",
      status: "Unpaid",
    },
  ];

  const allBills = [...staticBills, ...storedBills];

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.id;

    return (
      <Pressable
        onPress={() => setExpandedId(isExpanded ? null : item.id)}
        style={styles.cardWrapper}
      >
        <View style={styles.utilityContainer}>
          <View>
            <Text style={styles.paymentText}>{item.name}</Text>
            <Text style={styles.subText}>{item.type}</Text>
          </View>

          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={18}
            color="#555"
          />
        </View>

        {isExpanded && (
          <View style={{ marginTop: 10 }}>
            {item.photo ? (
              <Image
                source={{ uri: item.photo }}
                style={{ width: "100%", height: 200, borderRadius: 10 }}
              />
            ) : (
              <>
                <Text>Amount: {item.billAmount}</Text>
                <Text>Status: {item.status}</Text>
              </>
            )}
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <FlatList
      data={allBills.slice(0, 2)}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 10 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default MyBillsTab;

const styles = StyleSheet.create({
  cardWrapper: {
    marginVertical: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 2,
  },
  utilityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentText: {
    fontWeight: "600",
  },
  subText: {
    fontSize: 12,
    color: "#777",
  },
});
