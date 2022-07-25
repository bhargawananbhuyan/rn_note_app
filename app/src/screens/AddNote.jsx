import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import BackButton from "../components/BackButton";
import Dropdown from "../components/Dropdown";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import { colors, noteService, options } from "../utils/constants";
import { NoteContext } from "../utils/NoteProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddNote = () => {
  const [ofType, setOfType] = useState(options[0]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const { addNote } = useContext(NoteContext);

  const navigation = useNavigation();

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
          Add a new note
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

        <SubmitButton
          text="Submit"
          onPress={async () => {
            if (!formData.title || !formData.description) {
              ToastAndroid.show("Please enter all fields.", ToastAndroid.SHORT);
              return;
            }

            try {
              const res = await noteService.post(
                "/",
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

              if (res.status === 201) {
                ToastAndroid.show(
                  "Note added successfully.",
                  ToastAndroid.SHORT
                );
                addNote(res.data?.data);
                navigation.dispatch(StackActions.pop());
              }
            } catch (error) {
              ToastAndroid.show(error?.message, ToastAndroid.SHORT);
            }
          }}
        />
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

export default AddNote;
