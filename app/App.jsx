import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Homepage from "./src/screens/Homepage";
import Landing from "./src/screens/Landing";
import Register from "./src/screens/Register";
import Signin from "./src/screens/Signin";
import { StatusBar } from "expo-status-bar";
import AddNote from "./src/screens/AddNote";
import NoteDescription from "./src/screens/NoteDescription";
import EditNote from "./src/screens/EditNote";
import NoteProvider from "./src/utils/NoteProvider";
import Profile from "./src/screens/Profile";
import AuthProvider from "./src/utils/AuthProvider";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NoteProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            initialRouteName="landing_screen"
            screenOptions={{
              headerShown: false,
              animation: "fade_from_bottom",
            }}
          >
            <Stack.Screen name="landing_screen" component={Landing} />
            <Stack.Screen name="signin_screen" component={Signin} />
            <Stack.Screen name="register_screen" component={Register} />
            <Stack.Screen name="homepage_screen" component={Homepage} />
            <Stack.Screen name="addnote_screen" component={AddNote} />
            <Stack.Screen name="editnote_screen" component={EditNote} />
            <Stack.Screen name="note_screen" component={NoteDescription} />
            <Stack.Screen name="profile_screen" component={Profile} />
          </Stack.Navigator>
        </NavigationContainer>
      </NoteProvider>
    </AuthProvider>
  );
}
