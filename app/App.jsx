import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Homepage from './src/screens/Homepage'
import Landing from './src/screens/Landing'
import Register from './src/screens/Register'
import Signin from './src/screens/Signin'
import { StatusBar } from 'expo-status-bar'

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style='light' />
			<Stack.Navigator
				initialRouteName='landing_screen'
				screenOptions={{
					headerShown: false,
					animation: 'fade_from_bottom',
				}}
			>
				<Stack.Screen name='landing_screen' component={Landing} />
				<Stack.Screen name='signin_screen' component={Signin} />
				<Stack.Screen name='register_screen' component={Register} />
				<Stack.Screen name='homepage_screen' component={Homepage} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
