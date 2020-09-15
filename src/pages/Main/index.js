import React from 'react'
import {View, StyleSheet} from 'react-native'
import BalancePanel from '../../components/BalancePanel'
import EntrySummary from '../../components/EntrySummary'
import EntryList from '../../components/EntryList'
import Colors from '../../styles/Colors'
import Service from '../../services/Service'

const Main = ({navigation}) => {
	return (
		<View style={styles.container}>
		<BalancePanel onNewEntryPress={() => navigation.navigate('NewEntry')} />
		<View>
			<EntrySummary
				onPressActionButton={() => navigation.navigate('Reports')}
			/>
			<EntryList
				onEntryPress={entry => navigation.navigate('NewEntry', {entry}) }
				onPressActionButton={() => navigation.navigate('Reports')}
			/>
		</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	}
})

export default Main
