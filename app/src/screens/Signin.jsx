import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions, useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import React from 'react'
import {
	Platform,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	ToastAndroid,
	View,
} from 'react-native'
import * as Yup from 'yup'
import InputField from '../components/InputField'
import SubmitButton from '../components/SubmitButton'
import { authService, colors } from '../utils/constants'

const validationSchema = Yup.object().shape({
	email: Yup.string().email('please enter a valid email').required('required'),
	password: Yup.string()
		.min(8, 'requires minimum 8 characters')
		.max(12, 'maximum 12 characters allowed')
		.required('required'),
})

const Signin = () => {
	const navigation = useNavigation()

	return (
		<SafeAreaView style={[styles.root, { paddingTop: Platform.OS === 'android' ? 72 : 0 }]}>
			<View style={{ paddingHorizontal: 16 }}>
				<Text
					style={{
						fontSize: 21,
						fontWeight: 'bold',
						color: '#fff',
						marginBottom: 18,
					}}
				>
					Sign in.
				</Text>

				<Formik
					initialValues={{ email: '', password: '' }}
					validationSchema={validationSchema}
					onSubmit={async (values, { resetForm }) => {
						try {
							const res = await authService.post('/login', {
								email: values.email,
								password: values.password,
							})

							if (res.status === 200) {
								resetForm()
								await AsyncStorage.setItem('@token', res.data?.data)
								navigation.dispatch(StackActions.replace('homepage_screen'))
								return
							}
						} catch (error) {
							ToastAndroid.show(
								error.response?.data?.error ?? 'Server error. Please try again.',
								ToastAndroid.SHORT
							)
						}
					}}
				>
					{({
						values,
						handleChange,
						handleBlur,
						touched,
						errors,
						handleSubmit,
						resetForm,
						isSubmitting,
					}) => (
						<>
							<InputField
								label='Email'
								placeholder='enter your email'
								isEmail
								value={values.email}
								onChangeText={handleChange(`email`)}
								onBlur={handleBlur(`email`)}
								error={touched.email && errors.email}
								errorMsg={errors.email}
							/>

							<View style={{ marginVertical: 12 }}>
								<InputField
									label='Password'
									placeholder='enter 8 to 12 characters'
									isPassword
									value={values.password}
									onChangeText={handleChange(`password`)}
									onBlur={handleBlur(`password`)}
									error={touched.password && errors.password}
									errorMsg={errors.password}
								/>
							</View>

							<SubmitButton
								text={isSubmitting ? 'Please wait...' : 'Sign in'}
								onPress={handleSubmit}
							/>

							<View
								style={{
									flexDirection: 'row',
									alignItems: 'baseline',
									marginTop: 12,
								}}
							>
								<Text style={{ color: '#fff' }}>Not yet registered?</Text>
								<Pressable
									style={{ padding: 3.5 }}
									onPress={() => {
										resetForm()
										navigation.navigate('register_screen')
									}}
								>
									<Text style={{ color: colors.primary }}>Sign up</Text>
								</Pressable>
							</View>
						</>
					)}
				</Formik>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		backgroundColor: colors.primaryBg,
		flex: 1,
	},
})

export default Signin
