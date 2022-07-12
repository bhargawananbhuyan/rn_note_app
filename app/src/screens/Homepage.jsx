import Icon from '@expo/vector-icons/MaterialIcons'
import React from 'react'
import { Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { colors } from '../utils/constants'

const Homepage = () => {
	const menuPressHandler = () => {}

	return (
		<SafeAreaView style={[styles.root, { paddingTop: Platform.OS === 'android' ? 36 : 0 }]}>
			<View style={styles.homepage}>
				<View style={{ position: 'absolute', right: 20, top: 20 }}>
					<Pressable android_ripple={{ color: '#fff' }} onPress={menuPressHandler}>
						<Icon name='keyboard-control' size={32} color='#fff' />
					</Pressable>
				</View>

				<View style={{ paddingTop: 48 }}>
					<Text style={{ color: '#fff' }}>Home page</Text>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		backgroundColor: colors.primaryBg,
		flex: 1,
	},
	loadingScreen: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	homepage: {
		padding: 20,
	},
})

export default Homepage
