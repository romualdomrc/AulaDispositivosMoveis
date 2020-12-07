import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import ActionFooter, { ActionPrimaryButton } from '../../components/Core/ActionFooter'
import WelcomeMessage from './WelcomeMessage'
import WelcomeBalanceInput from './WelcomeBalanceInput'
import useCategories from '../../hooks/useCategories'
import { setInitialized } from '../../services/Storage/Welcome'
import Colors from '../../styles/Colors'
import Logo from '../../assets/logo-white.png'
import Service from '../../services/Service'

const Welcome = ({navigation}) => {
	const [, , , initCategories] = useCategories()
	const [amount, setAmount] = useState(0)

	const onSavePress = async () => {
		await Service.saveEntry({
			amount: parseFloat(amount),
			isInit: true,
			category: initCategories,
		})

		await setInitialized()
		navigation.navigate('Main')
	}

	return (
		<View style={styles.container}>
		<View style={styles.logo}>
			<Image source={Logo} />
		</View>
		<WelcomeMessage />
		<WelcomeBalanceInput value={amount} onChangeValue={setAmount} />
		<ActionFooter>
			<ActionPrimaryButton title="Continuar" onPress={onSavePress} />
		</ActionFooter>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
		padding: 10,
	},
	logo: {
		alignItems: 'center',
		marginTop: 20,
	},
})

export default Welcome
