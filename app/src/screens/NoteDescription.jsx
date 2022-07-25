import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import BackButton from "../components/BackButton";
import { colors, options } from "../utils/constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

const NoteDescription = () => {
  const navigation = useNavigation();
  const { note } = useRoute().params;

  return (
    <View
      style={[styles.root, { paddingTop: Platform.OS === "android" ? 36 : 0 }]}
    >
      <BackButton />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#efefef",
            textAlign: "center",
          }}
        >
          {note.title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              backgroundColor: colors.primary,
              paddingHorizontal: 8,
              paddingVertical: 5,
              borderRadius: 5,
              marginRight: 8,
              fontSize: 12,
              marginTop: 12,
            }}
          >
            {options[note.category]}
          </Text>
          <Text style={styles.date}>
            {dayjs(note.createdAt).format("DD/MM/YYYY")}
          </Text>
        </View>
        <Text
          style={{
            color: "#efefef",
            lineHeight: 24,
            marginTop: 16,
            textAlign: "justify",
          }}
        >
          {note.body}
        </Text>
      </ScrollView>

      <View
        style={{ position: "absolute", right: 16, bottom: 28, zIndex: 100 }}
      >
        <Pressable
          style={styles.fab}
          android_ripple={{ color: "#fff" }}
          onPress={() => {
            navigation.navigate("editnote_screen", {
              note,
            });
          }}
        >
          <FontAwesome5 name="pen" size={21} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.primaryBg,
    flex: 1,
  },

  date: {
    color: "#dbdbdb",
    marginTop: 24,
    marginBottom: 12,
    fontSize: 12,
  },
  hr: {
    width: "100%",
    height: 1,
    backgroundColor: "#555",
  },
  fab: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
  },
});

export default NoteDescription;
