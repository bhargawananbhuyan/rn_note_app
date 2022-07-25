import Icon from "@expo/vector-icons/MaterialIcons";
import React, { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { authService, colors, noteService, options } from "../utils/constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NoteContext } from "../utils/NoteProvider";
import Menu from "../components/Menu";
import dayjs from "dayjs";
import { AuthContext } from "../utils/AuthProvider";

const Homepage = () => {
  const navigation = useNavigation();
  const { notes, getNotes } = useContext(NoteContext);
  const { user, getUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await noteService.get("/", {
          headers: {
            auth_token: "Bearer " + (await AsyncStorage.getItem("@token")),
          },
        });
        getNotes(res.data?.data);
      } catch (error) {
        ToastAndroid.show(error?.message, ToastAndroid.SHORT);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await authService.get("/user", {
          headers: {
            auth_token: "Bearer " + (await AsyncStorage.getItem("@token")),
          },
        });
        getUser(res.data?.data);
      } catch (error) {
        ToastAndroid.show(error?.message, ToastAndroid.SHORT);
      }
    })();
  }, []);

  return (
    <SafeAreaView
      style={[styles.root, { paddingTop: Platform.OS === "android" ? 36 : 0 }]}
    >
      <View style={styles.homepage}>
        <Menu user={user} />

        <View style={{ paddingTop: 48 }}>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "900" }}>
            All notes
          </Text>

          <View style={[styles.hr, { marginTop: 16 }]} />

          {notes?.length > 0 &&
            notes.map((item, i) => (
              <Pressable
                key={i}
                style={{
                  borderBottomWidth: 1,
                  paddingBottom: 16,
                  borderColor: "#555",
                }}
                onPress={() =>
                  navigation.navigate("note_screen", {
                    note: item,
                  })
                }
              >
                <Text style={styles.noteTitle}>{item.title}</Text>
                <Text style={styles.noteBody}>{item.body}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      color: "#fff",
                      backgroundColor: colors.primary,
                      paddingHorizontal: 8,
                      paddingVertical: 5,
                      borderRadius: 5,
                      marginRight: 8,
                      fontSize: 12,
                    }}
                  >
                    {options[item.category]}
                  </Text>
                  <Text style={{ color: "#dbdbdb", fontSize: 12 }}>
                    {dayjs(item.createdAt).format("DD/MM/YYYY")}
                  </Text>
                </View>
              </Pressable>
            ))}
        </View>

        <View
          style={{ position: "absolute", right: 16, bottom: 28, zIndex: 100 }}
        >
          <Pressable
            style={styles.fab}
            android_ripple={{ color: "#fff" }}
            onPress={() => {
              navigation.navigate("addnote_screen");
            }}
          >
            <FontAwesome5 name="pen" size={21} color="#fff" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.primaryBg,
    flex: 1,
  },
  loadingScreen: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  homepage: {
    padding: 20,
    flex: 1,
  },
  fab: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
  },
  date: {
    color: "#dbdbdb",
    marginTop: 24,
    marginBottom: 12,
  },
  hr: {
    width: "100%",
    height: 1,
    backgroundColor: "#555",
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#efefef",
    marginTop: 16,
  },
  noteBody: {
    fontStyle: "italic",
    color: "#cdcdcd",
    marginVertical: 12,
    lineHeight: 21,
  },
});

export default Homepage;
