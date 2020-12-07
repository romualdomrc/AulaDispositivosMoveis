import React, {useState, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import BalancePanel from '../../components/BalancePanel'
import EntrySummary from '../../components/EntrySummary'
import EntryList from '../../components/EntryList'
import Colors from '../../styles/Colors'
import Service from '../../services/Service'

const Main = ({navigation}) => {
	const [balance, setBalance] = useState()

	useEffect(()=> {
	  loadBalance()
	},[])
  
	const loadBalance = async() => {
	  setBalance(await Service.getBalance())
	}

	
	return (
		<View style={styles.container}>
			<BalancePanel balance={balance} onNewEntryPress={() => navigation.navigate('NewEntry')} />
			<View>
				<EntrySummary
					onPressActionButton={() => navigation.navigate('Reports')}
				/>
				<EntryList
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
