import {
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import BackButton from "../components/BackButton";
import Dropdown from "../components/Dropdown";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import { colors, noteService, options } from "../utils/constants";
import { NoteContext } from "../utils/NoteProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditNote = () => {
  const { note } = useRoute().params;
  const [ofType, setOfType] = useState(options[note.category]);
  const [formData, setFormData] = useState({
    title: note.title,
    description: note.body,
  });

  const navigation = useNavigation();
  const { deleteNote, updateNote } = useContext(NoteContext);

  return (
    <View
      style={[styles.root, { paddingTop: Platform.OS === "android" ? 36 : 0 }]}
    >
      <BackButton />

      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 16,
          }}
        >
          Edit note
        </Text>

        <Dropdown
          options={options}
          defaultValue={ofType}
          onChange={setOfType}
        />
        <View style={{ marginTop: 12 }}>
          <InputField
            label="Title"
            placeholder="Enter title"
            value={formData.title}
            onChangeText={(value) => setFormData({ ...formData, title: value })}
            onBlur={() => {}}
            error={false}
            errorMsg={""}
          />
        </View>

        <View style={{ marginVertical: 12 }}>
          <InputField
            label="Description"
            placeholder="Enter description"
            value={formData.description}
            onChangeText={(value) =>
              setFormData({ ...formData, description: value })
            }
            onBlur={() => {}}
            error={false}
            errorMsg={""}
            multiline
            numberOfLines={5}
            textAlignVertical={"top"}
            addStyles={{ paddingVertical: 18 }}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <SubmitButton
            text="Submit"
            onPress={async () => {
              if (!formData.title || !formData.description) {
                ToastAndroid.show(
                  "All fields are required.",
                  ToastAndroid.SHORT
                );
                return;
              }

              try {
                const res = await noteService.put(
                  `/${note._id}`,
                  {
                    category: options.indexOf(ofType),
                    title: formData.title,
                    body: formData.description,
                  },
                  {
                    headers: {
                      auth_token:
                        "Bearer " + (await AsyncStorage.getItem("@token")),
                    },
                  }
                );
                if (res.status === 200) {
                  updateNote(res.data?.data);
                  ToastAndroid.show(
                    "Note updated successfully.",
                    ToastAndroid.SHORT
                  );
                  navigation.dispatch(StackActions.popToTop());
                }
              } catch (error) {
                ToastAndroid.show(error?.message, ToastAndroid.SHORT);
              }
            }}
            addStyles={{ flex: 1 }}
          />
          <View style={{ marginHorizontal: 6 }} />
          <SubmitButton
            text="Delete"
            onPress={async () => {
              try {
                await noteService.delete(`/${note._id}`, {
                  headers: {
                    auth_token:
                      "Bearer " + (await AsyncStorage.getItem("@token")),
                  },
                });
                deleteNote(note._id);
                ToastAndroid.show(
                  "Note deleted successfully.",
                  ToastAndroid.SHORT
                );
                navigation.dispatch(StackActions.popToTop());
              } catch (error) {
                ToastAndroid.show(error?.message, ToastAndroid.SHORT);
              }
            }}
            addStyles={{ flex: 1, backgroundColor: "#ef4444" }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.primaryBg,
    flex: 1,
  },
});

export default EditNote;
