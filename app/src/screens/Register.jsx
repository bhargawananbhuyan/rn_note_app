import { StackActions, useNavigation } from '@react-navigation/native'
import * as Yup from 'yup'
import React from 'react'
import {
	Pressable,
	View,
	SafeAreaView,
	Text,
	StyleSheet,
	ToastAndroid,
	Platform,
} from 'react-native'
import InputField from '../components/InputField'
import SubmitButton from '../components/SubmitButton'
import { Formik } from 'formik'
import BackButton from '../components/BackButton'
import { authService, colors } from '../utils/constants'

const validationSchema = Yup.object().shape({
	fullName: Yup.string().required('required'),
	email: Yup.string().email('please enter a valid email').required('required'),
	password: Yup.string()
		.min(8, 'requires minimum 8 characters')
		.max(12, 'maximum 12 characters allowed')
		.required('required'),
})

const Register = () => {
	const navigation = useNavigation()

	return (
		<SafeAreaView style={[styles.root, { paddingTop: Platform.OS === 'android' ? 42 : 0 }]}>
			<BackButton />
			<View style={{ paddingHorizontal: 16 }}>
				<Text
					style={{
						fontSize: 21,
						fontWeight: 'bold',
						color: '#fff',
						marginBottom: 18,
					}}
				>
					Sign up.
				</Text>

				<Formik
					initialValues={{
						fullName: '',
						email: '',
						password: '',
					}}
					validationSchema={validationSchema}
					onSubmit={async (values, { resetForm }) => {
						try {
							const res = await authService.post('/register', {
								fullName: values.fullName,
								email: values.email,
								password: values.password,
							})

							if (res.status === 201) {
								ToastAndroid.show(
									'Account registered successfully',
									ToastAndroid.SHORT
								)
								resetForm()
								navigation.dispatch(StackActions.replace('signin_screen'))
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
								label='Full name'
								placeholder='enter full name'
								value={values.fullName}
								onChangeText={handleChange(`fullName`)}
								onBlur={handleBlur(`fullName`)}
								error={touched.fullName && errors.fullName}
								errorMsg={errors.fullName}
							/>

							<View style={{ marginVertical: 12 }}>
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
							</View>

							<View>
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

							<View style={{ marginVertical: 12 }}>
								<SubmitButton
									text={isSubmitting ? 'Please wait...' : 'Register'}
									onPress={handleSubmit}
								/>
							</View>

							<View
								style={{
									flexDirection: 'row',
									alignItems: 'baseline',
								}}
							>
								<Text style={{ color: '#fff' }}>Not yet registered?</Text>
								<Pressable
									style={{ padding: 3.5 }}
									onPress={() => {
										resetForm()
										navigation.dispatch(StackActions.pop())
									}}
								>
									<Text style={{ color: colors.primary }}>Sign in</Text>
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

export default Register
