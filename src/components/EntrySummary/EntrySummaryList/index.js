import React from 'react'
import {View, FlatList, StyleSheet, Text} from 'react-native'

import EntrySummaryListItem from './EntrySummaryListItem'

const EntrySummaryList = ({data}) => {
	return (
		// <View><Text>dasdasd</Text></View>
		<FlatList
			style={styles.container}
			data={data}
			keyExtractor={item => item.category.id}
			renderItem={({item}) => <EntrySummaryListItem entry={item} />}
		/>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})

export default EntrySummaryList
