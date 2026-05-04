import React from "react";
import { View, Dimensions, StyleSheet, Image } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

const data1 = [require("../../assets/images/carousel1.png")];
const data2 = [require("../../assets/images/carousel2.png")];

const CarouselOne = () => (
  <Carousel
    width={width - 40}
    height={100}
    data={data1}
    renderItem={({ item }) => (
      <View style={styles.card}>
        <Image source={item} style={styles.image} />
      </View>
    )}
  />
);

const CarouselTwo = () => (
  <Carousel
    width={width - 40}
    height={100}
    data={data2}
    renderItem={({ item }) => (
      <View style={styles.card}>
        <Image source={item} style={styles.image} />
      </View>
    )}
  />
);

export default function Carousels() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);

  const renderScene = SceneMap({
    first: CarouselOne,
    second: CarouselTwo,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width }}
      renderTabBar={() => null}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 5,
    alignContent: "center",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
});
