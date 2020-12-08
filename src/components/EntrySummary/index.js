import React, { useEffect, useState } from 'react'
import {View, StyleSheet} from 'react-native'
import Container from '../Core/Container'
import EntrySummaryChart from './EntrySummaryChart'
import EntrySummaryList from './EntrySummaryList'

const EntrySummary = ({days = 7, onPressActionButton, balanceSum}) => {
	const [thisBalanceSum, setBalanceSum] = useState([])

	useEffect(()=> {
		setBalanceSum(balanceSum)
	},[balanceSum])

	return (
		<Container
			title="Categorias"
			actionLabelText={`Últimos ${days} dias`}
			actionButtonText="Ver mais"
			onPressActionButton={onPressActionButton}>
			<View style={styles.inner}>
				<EntrySummaryChart data={thisBalanceSum} />
				<EntrySummaryList data={thisBalanceSum} />
			</View>
		</Container>
	)
}

const styles = StyleSheet.create({
	inner: {
		flexDirection: 'row',
		paddingVertical: 10,
	}
})

export default EntrySummary
