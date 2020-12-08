import React, {useState, useEffect} from 'react'
import {FlatList} from 'react-native'

import Container from '../Core/Container'

import EntryListItem from './EntryListItem'

const EntryList = ({onEntryPress, onPressActionButton, entries, days}) => {
	const [thisEntries, setThisEntries] = useState()

	useEffect(()=>{
		setThisEntries(entries)
	},[entries])

	return (
		<Container
			title="Últimos lançamentos"
			actionLabelText={`Últimos ${days} dias`}
			actionButtonText="Ver mais"
			onPressActionButton={onPressActionButton}>
		<FlatList
			data={thisEntries}
			keyExtractor={item => item.id}
			renderItem={({item, index}) => (
				<EntryListItem
					entry={item}
					isFirstItem={index === 0}
					isLastItem={index === thisEntries.length - 1}
					onEntryPress={onEntryPress}
				/>
			)}
		/>
		</Container>
	)
}

export default EntryList
