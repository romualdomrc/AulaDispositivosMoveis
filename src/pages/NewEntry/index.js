import React, { useState, useEffect } from 'react'
import {View,StatusBar, StyleSheet} from 'react-native'
import ActionFooter, { ActionPrimaryButton, ActionSecondaryButton } from '../../components/Core/ActionFooter'
import BalanceLabel from '../../components/BalanceLabel'
import NewEntryInput from './NewEntryInput'
import NewEntryCategoryPicker from './NewEntryCategoryPicker'
import NewEntryDatePicker from './NewEntryDatePicker'
import NewEntryCameraPicker from './NewEntryCameraPicker'
import NewEntryAddressPicker from './NewEntryAddressPicker'
import NewEntryDeleteAction from './NewEntryDeleteAction'
import useEntries from '../../hooks/useEntries'
import Colors from '../../styles/Colors'

const NewEntry = ({ navigation, route }) => {
	
	useEffect(() => {
		(function setInitialEntry() {
			if(route?.params?.entry) {
				setEntry(route.params.entry)
				setDebit(route.params.entry.amount <= 0)
				setAmount(route.params.entry.amount)
				setCategory(route.params.entry.category)
				setEntryAt(route.params.entry.entryAt)
				setPhoto(route.params.entry.photo)
				setAddress(route.params.entry.address)
				setLatitude(route.params.entry.latitude)
				setLongitude(route.params.entry.longitude)
				setIsAdd(false)
			} else {
				var initial = {
					id: null,
					amount: 0,
					entryAt: new Date(),
					photo: null,
					address: null,
					latitude: null,
					longitude: null,
					category: {id: null, name: 'Selecione'}
				}
				setEntry(initial)

				setDebit(initial.amount <= 0)
				setAmount(initial.amount)
				setCategory(initial.category)
				setEntryAt(initial.entryAt)
				setPhoto(initial.photo)
				setAddress(initial.address)
				setLatitude(initial.latitude)
				setLongitude(initial.longitude)
				setIsAdd(true)
			}
		})()
	},[])

	const [entry, setEntry] = useState({})
	const [, saveEntry, deleteEntry] = useEntries()
	const [debit, setDebit] = useState(entry.amount <= 0)
	const [amount, setAmount] = useState(entry.amount)
	const [category, setCategory] = useState(entry.category)
	const [entryAt, setEntryAt] = useState(entry.entryAt)
	const [photo, setPhoto] = useState(entry.photo)
	const [address, setAddress] = useState(entry.address)
	const [latitude, setLatitude] = useState(entry.latitude)
	const [longitude, setLongitude] = useState(entry.longitude)
	const [isAdd, setIsAdd] = useState(true)

	const isValid = () => {
		return parseFloat(amount) !== 0
	}

  	const onSave = () => {
		const data = {
		amount: -parseFloat(amount),
		category: category,
		photo: photo,
		address: address,
		latitude: latitude,
		longitude: longitude,
		entryAt: entryAt,
		}
		
		if(data.category.name === "Selecione") {
			return
		}
		saveEntry(data, entry)
		onClose()
  	}

	const onDelete = () => {
		deleteEntry(entry)
		onClose()
	}

	const onClose = () => {
		navigation.goBack()
	}

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" backgroundColor={Colors.background} />
			<BalanceLabel />

			<View style={styles.formContainer}>
				<NewEntryInput
					value={amount}
					onChangeValue={setAmount}
					onChangeDebit={setDebit}
				/>
				<NewEntryCategoryPicker
					debit={debit}
					category={category}
					onChangeCategory={setCategory}
				/>

				<View style={styles.formActionContainer}>
				<NewEntryDatePicker value={entryAt} onChange={setEntryAt} />
				<NewEntryCameraPicker photo={photo} onChangePhoto={setPhoto} />
				<NewEntryAddressPicker
					address={address}
					onChange={({latitude, longitude, address}) => {
						setLatitude(latitude)
						setLongitude(longitude)
						setAddress(address)
					}}
				/>
				<NewEntryDeleteAction entry={entry} onOkPress={onDelete} isAdd={isAdd} />
			</View>
			</View>
				<ActionFooter>
					<ActionPrimaryButton
						title={entry?.id ? 'Salvar' : 'Adicionar'}
						onPress={() => {
							isValid() && onSave()
						}}
					/>
					<ActionSecondaryButton title="Cancelar" onPress={onClose} />
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
	formContainer: {
		flex: 1,
		paddingVertical: 20,
	},
	formActionContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 10,
	}
})

export default NewEntry
