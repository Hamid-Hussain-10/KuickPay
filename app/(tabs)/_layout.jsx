import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { useProfile } from "../components/ProfileContext";

export default function TabLayout() {
  const { profileImage } = useProfile();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#20ceab",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
          textAlign: "center",
        },
        tabBarStyle: {
          height: 70,
          paddingBottom: 5,
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "payments":
              iconName = focused ? "cash" : "cash-outline";
              break;
            case "add":
              iconName = focused ? "add-circle" : "add-circle-outline";
              break;
            case "calender":
              iconName = focused ? "calendar" : "calendar-outline";
              break;
            case "more":
              iconName = focused ? "menu" : "menu-outline";
              break;
            default:
              iconName = "ellipse";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />

      <Tabs.Screen
        name="payments"
        options={({ navigation }) => ({
          title: "Payment",
          headerShown: true,
          headerTitle: "Payments",
          headerTitleStyle: {
            fontSize: 20,
            color: "#fff",
          },
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#20ceab",
          },
          headerLeft: () => (
            <Ionicons
              name="chevron-back"
              size={24}
              color="#fff"
              style={{ marginLeft: 12 }}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />

      <Tabs.Screen
        name="add"
        options={{
          title: "",
          tabBarIcon: () => (
            <View style={styles.addButton}>
              <Ionicons name="add" size={35} color="#ffffff" />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="calender"
        options={({ navigation }) => ({
          title: "Calender",
          headerShown: true,
          headerTitle: "Calender",
          headerTitleStyle: {
            fontSize: 20,
            color: "#fff",
          },
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#20ceab",
          },
          headerLeft: () => (
            <Ionicons
              name="chevron-back"
              size={24}
              color="#fff"
              style={{ marginLeft: 12 }}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />

      <Tabs.Screen
        name="more"
        options={{
          headerShown: true,
          header: () => (
            <View style={styles.header}>
              <Pressable>
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={styles.profile}
                  />
                ) : (
                  <Ionicons name="person-circle" size={70} color="#fff" />
                )}
              </Pressable>

              <View style={styles.headerText}>
                <Text style={styles.greeting}>Hello Hamid</Text>
                <Text style={styles.subText}>Welcome back</Text>
              </View>
              <View>
                <Image
                  source={require("../../assets/images/bg.png")}
                  style={styles.image}
                />
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#20ceab",
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  header: {
    backgroundColor: "#20ceab",
    height: 160,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  profile: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginTop: 10,
  },

  headerText: {
    marginLeft: 15,
    marginTop: 10,
  },

  greeting: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },

  subText: {
    fontSize: 14,
    color: "#fff",
  },

  image: {
    width: 90,
    height: 90,
    marginLeft: 50,
    marginTop: 40,
    transform: [{ rotate: "18deg" }], 
  },
});
