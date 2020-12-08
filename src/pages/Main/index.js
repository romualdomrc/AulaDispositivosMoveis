import React, {useState, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import BalancePanel from '../../components/BalancePanel'
import EntrySummary from '../../components/EntrySummary'
import EntryList from '../../components/EntryList'
import Colors from '../../styles/Colors'
import Service from '../../services/Service'

const Main = ({navigation, route}) => {
	const days = 7
	const entryListDays = 30
	const [balance, setBalance] = useState()
	const [balanceSum, setBalanceSum] = useState([])
	const [entries, setEntries] = useState([])

	const loadEntries = async () => {
		const data = await Service.getEntries(entryListDays, null)
		setEntries(data)
	}

	useEffect(()=> {
	  loadBalance()
	  loadBalanceSumByCategory()
	  loadEntries()
	},[route.params?.render])
  
	const loadBalance = async() => {
	  setBalance(await Service.getBalance())
	}

	const loadBalanceSumByCategory = async() => {
		const data = await Service.getBalanceSumByCategory(days)
		setBalanceSum([...data])
	}

	
	return (
		<View style={styles.container}>
			<BalancePanel balance={balance} onNewEntryPress={() => navigation.navigate('NewEntry')} />
			<View>
				<EntrySummary days={days} balanceSum={balanceSum} onPressActionButton={() => navigation.navigate('Reports')}/>
				<EntryList
					entries={entries}
					days={entryListDays}
					onEntryPress={entry => navigation.navigate('NewEntry', {entry}) }
					onPressActionButton={() => navigation.navigate('Reports') }
				/>
			</View>
		</View>
	)
}
//FIXME
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	}
})

export default Main
