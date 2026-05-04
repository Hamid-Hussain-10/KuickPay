import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getBills } from "../../assets/components/Storage";

const STORAGE_KEY = "BILLS_DATA";

const PaymentTabs = () => {
  const [activeTab, setActiveTab] = useState("MY BILLS");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [storedBills, setStoredBills] = useState([]);

  useEffect(() => {
    const loadBills = async () => {
      const data = await getBills();
      setStoredBills(data);
    };

    loadBills();
  }, []);

  const deleteStoredBill = async (id) => {
    try {
      const existing = await AsyncStorage.getItem(STORAGE_KEY);
      const bills = existing ? JSON.parse(existing) : [];

      const updated = bills.filter((item) => item.id !== id);

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      setStoredBills(updated);
    } catch (e) {
      console.log("Delete error", e);
    }
  };

  const bills = [
    {
      id: "1",
      name: "K-Electric",
      type: "Utility",
      amount: 1600,
      consumerNumber: "006902023212349221",
      consumerName: "Moiz Pasha",
      billingCompany: "K-Electric",
      billAmount: "Rs.1200",
      status: "Paid",
      paymentDate: "10 January 2024",
    },
    {
      id: "2",
      name: "SNGPL Gas",
      type: "Utility",
      amount: 1500,
      consumerNumber: "123456789",
      consumerName: "Ali Khan",
      billingCompany: "SNGPL",
      billAmount: "Rs.1500",
      status: "Unpaid",
      paymentDate: "30 April 2026",
    },
  ];

  const filteredBills = bills.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const getFilteredData = () => {
    if (activeTab === "PAID") {
      return bills.filter((item) => item.status === "Paid");
    }

    if (activeTab === "UNPAID") {
      const unpaidStatic = bills.filter((item) => item.status !== "Paid");
      const unpaidStored = storedBills.filter((item) => item.status !== "Paid");

      return [...unpaidStatic, ...unpaidStored];
    }

    return filteredBills;
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.id;

    return (
      <Pressable
        onPress={() => setExpandedId(isExpanded ? null : item.id)}
        style={styles.cardWrapper}
      >
        {/* Top Row */}
        <View style={styles.utilityContainer}>
          <View>
            <Text style={styles.paymentText}>{item.name}</Text>
            <Text style={styles.subText}>{item.type}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            {/* <Text style={styles.amount}>+Rs. {item.amount}</Text> */}
            <Ionicons
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={18}
              color="#555"
            />
          </View>
        </View>

        <View style={styles.divider} />

        {/* Expanded Section */}
        {isExpanded && (
          <View style={styles.detailsContainer}>
            {/* CAMERA BILLS → IMAGE + DELETE ONLY */}
            {item.photo ? (
              <View style={{ position: "relative", marginTop: 10 }}>
                <Pressable
                  onPress={() => deleteStoredBill(item.id)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    padding: 6,
                    borderRadius: 20,
                    zIndex: 1,
                  }}
                >
                  <Ionicons name="trash-outline" size={18} color="#fff" />
                </Pressable>

                {/* Image only */}
                <Image
                  source={{ uri: item.photo }}
                  style={{ width: "100%", height: 260, borderRadius: 12 }}
                  resizeMode="cover"
                />
              </View>
            ) : (
              <>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subTextCenter}>{item.type}</Text>

                <View style={styles.row}>
                  <Text>Consumer Number</Text>
                  <Text>{item.consumerNumber}</Text>
                </View>

                <View style={styles.row}>
                  <Text>Consumer Name</Text>
                  <Text>{item.consumerName}</Text>
                </View>

                <View style={styles.row}>
                  <Text>Billing Company</Text>
                  <Text>{item.billingCompany}</Text>
                </View>

                <View style={styles.row}>
                  <Text>Bill Amount</Text>
                  <Text>{item.billAmount}</Text>
                </View>

                <View style={styles.row}>
                  <Text>Status</Text>
                  <Text>{item.status}</Text>
                </View>

                <View style={styles.row}>
                  <Text>Payment Date</Text>
                  <Text>{item.paymentDate}</Text>
                </View>
              </>
            )}
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Tabs */}
      <View style={styles.amountContainer}>
        {["MY BILLS", "PAID", "UNPAID"].map((tab) => (
          <Pressable
            key={tab}
            style={[styles.card, activeTab === tab && styles.activeCard]}
            onPress={() => {
              setActiveTab(tab);
              setExpandedId(null);
            }}
          >
            <Text
              style={[styles.cardText, activeTab === tab && styles.activeText]}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Search */}
      {activeTab === "MY BILLS" && (
        <View style={styles.inputContainer}>
          <Ionicons name="search-outline" size={20} />
          <TextInput
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />
        </View>
      )}

      {/* List */}
      <FlatList
        data={getFilteredData()}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No Data Found
          </Text>
        }
      />
    </View>
  );
};

export default PaymentTabs;
const styles = StyleSheet.create({
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#e4e1e1",
    padding: 10,
    borderRadius: 40,
    marginBottom: 10,
  },

  card: {
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },

  activeCard: {
    backgroundColor: "#fff",
    elevation: 3,
  },

  cardText: {
    fontSize: 13,
  },

  activeText: {
    color: "#20ceab",
    fontWeight: "600",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#eae6e6",
    paddingHorizontal: 16,
    paddingVertical: 2,
    borderRadius: 30,
    width: "95%",
    gap: 5,
    elevation: 6,
    marginVertical: 10,
  },

  input: {
    flex: 1,
    marginLeft: 5,
  },

  cardWrapper: {
    marginVertical: 12,
    borderRadius: 16,
    padding: 10,
  },

  utilityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  paymentText: {
    fontSize: 15,
    fontWeight: "600",
  },

  subText: {
    fontSize: 12,
    color: "#777",
  },

  subTextCenter: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
    marginBottom: 10,
  },

  amount: {
    fontSize: 14,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginTop: 10,
  },

  detailsContainer: {
    marginTop: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 15,
    borderRadius: 10,
    overflow: "hidden",
  },

  saveBtn: {
    flex: 1,
    backgroundColor: "#2f80ed",
    padding: 12,
    alignItems: "center",
  },

  shareBtn: {
    flex: 1,
    backgroundColor: "#1c3d5a",
    padding: 12,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
