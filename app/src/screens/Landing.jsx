import Icon from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colors } from "../utils/constants";

const Landing = () => {
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (await AsyncStorage.getItem("@token")) {
        navigation.dispatch(StackActions.replace("homepage_screen"));
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <View>
        <View style={styles.title}>
          <Text style={styles.title1}>Note</Text>
          <Text style={[styles.title1, styles.title2]}>it.</Text>
        </View>

        <Text style={styles.subtitle}>All your notes, organized.</Text>
      </View>
      <View style={{ alignItems: "flex-end", marginTop: "25%" }}>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() =>
            navigation.dispatch(StackActions.replace("signin_screen"))
          }
        >
          <Text style={{ color: "#fff", fontSize: 21, marginRight: 4.5 }}>
            Get started
          </Text>
          <Icon name="arrow-right-alt" size={24} color="#fff" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.primaryBg,
    flex: 1,
    paddingVertical: "16%",
    paddingHorizontal: 20,
    justifyContent: "flex-end",
  },
  title: {
    flexDirection: "row",
  },
  title1: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#fff",
  },
  title2: {
    color: colors.primary,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "300",
    color: "#fff",
    marginTop: 8,
  },
});

export default Landing;
