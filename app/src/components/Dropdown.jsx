import Icon from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Dropdown = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ position: "relative", zIndex: 1 }}>
      <Text style={{ color: "#fff", marginBottom: 8 }}>Note category</Text>
      <View style={styles.dropdown}>
        <Text style={{ color: "#efefef" }}>{props.defaultValue}</Text>
        <Pressable onPress={() => setOpen(!open)}>
          <Icon name="keyboard-arrow-down" size={21} color="#efefef" />
        </Pressable>
      </View>

      <View
        style={{
          display: open ? "flex" : "none",
          position: "absolute",
          top: "100%",
          backgroundColor: "#353535",
          width: "100%",
          borderRadius: 5,
          elevation: 10,
        }}
      >
        {props.options.map((option, i) => (
          <Pressable
            key={i}
            style={{ padding: 16 }}
            onPress={() => {
              props.onChange(option);
              setOpen(false);
            }}
          >
            <Text style={{ color: "#efefef" }}>{option}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderColor: "#cdcdcd",
    borderRadius: 5,
    color: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Dropdown;
