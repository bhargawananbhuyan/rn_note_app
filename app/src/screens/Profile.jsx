import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import BackButton from "../components/BackButton";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import { AuthContext } from "../utils/AuthProvider";
import { authService, colors } from "../utils/constants";

const Profile = () => {
  const { user } = useRoute().params;
  const [userData, setUserData] = useState({
    fullName: user?.fullName,
    email: user?.email,
    password: "",
  });

  const navigation = useNavigation();
  const { updateUser } = useContext(AuthContext);

  return (
    <View
      style={{
        backgroundColor: colors.primaryBg,
        flex: 1,
        paddingTop: Platform.OS === "android" ? 36 : 0,
      }}
    >
      <BackButton
        action={() =>
          navigation.dispatch(StackActions.replace("homepage_screen"))
        }
      />

      <View style={styles.root}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              height: 120,
              width: 120,
              backgroundColor: "#555",
              borderRadius: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "#fbfbfb" }}
            >
              {user?.fullName?.split(" ")[0][0]}
              {user?.fullName?.split(" ")[1][0]}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 28 }}>
          <InputField
            label="Full name"
            placeholder="Enter full name"
            value={userData.fullName}
            onChangeText={(value) =>
              setUserData({ ...userData, fullName: value })
            }
            onBlur={() => {}}
            error={false}
            errorMsg={""}
          />
          <View style={{ marginVertical: 12 }}>
            <InputField
              isEmail
              label="Email"
              placeholder="Enter email"
              value={userData.email}
              onChangeText={(value) =>
                setUserData({ ...userData, email: value })
              }
              onBlur={() => {}}
              error={false}
              errorMsg={""}
            />
          </View>
          <InputField
            isPassword
            label="Password"
            placeholder="Enter password"
            value={userData.password}
            onChangeText={(value) =>
              setUserData({ ...userData, password: value })
            }
            onBlur={() => {}}
            error={false}
            errorMsg={""}
          />

          <View style={{ flexDirection: "row", marginTop: 12 }}>
            <SubmitButton
              text="Edit"
              onPress={async () => {
                if (
                  !userData.fullName ||
                  !userData.email ||
                  !userData.password
                ) {
                  ToastAndroid.show(
                    "All fields are required.",
                    ToastAndroid.SHORT
                  );
                  return;
                }

                try {
                  const res = await authService.put("/user", userData, {
                    headers: {
                      auth_token:
                        "Bearer " + (await AsyncStorage.getItem("@token")),
                    },
                  });
                  updateUser(res.data?.data);
                  ToastAndroid.show(
                    "Profile updated successfully.",
                    ToastAndroid.SHORT
                  );
                  navigation.dispatch(StackActions.replace("homepage_screen"));
                } catch (error) {
                  ToastAndroid.show(error?.message, ToastAndroid.SHORT);
                }
              }}
              addStyles={{ flex: 1 }}
            />
            <View style={{ marginHorizontal: 6 }} />
            <SubmitButton
              text="Sign out"
              onPress={async () => {
                await AsyncStorage.removeItem("@token");
                navigation.dispatch(StackActions.replace("landing_screen"));
              }}
              addStyles={{ flex: 1, backgroundColor: "#ef4444" }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
  },
  text: {
    color: "#000",
  },
});

export default Profile;
