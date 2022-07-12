import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { colors } from '../utils/constants'

const SubmitButton = (props) => {
	return (
		<Pressable style={styles.submitButton} onPress={props.onPress}>
			<Text style={{ color: '#ffffff', fontWeight: '500' }}>{props.text}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	submitButton: {
		backgroundColor: colors.primary,
		alignItems: 'center',
		padding: 18,
		borderRadius: 5,
	},
})

export default SubmitButton
