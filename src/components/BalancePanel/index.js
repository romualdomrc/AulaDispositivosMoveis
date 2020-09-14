import React from 'react'
import {StatusBar, View, Text, TouchableOpacity, StyleSheet} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import BalancePanelLabel from './BalancePanelLabel'
import BalancePanelChart from './BalancePanelChart'

import useBalance from '../../hooks/useBalance'

import Colors from '../../styles/Colors'

const BalancePanel = ({onNewEntryPress}) => {
  const [balance] = useBalance()

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.violet} />
      <View>
        <BalancePanelLabel currentBalance={balance} />
        <BalancePanelChart />
      </View>
      <TouchableOpacity style={styles.button} onPress={onNewEntryPress}>
        <Icon name="add" size={30} color={Colors.white} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: -23,
  },
  panel: {},
  button: {
    backgroundColor: Colors.green,
    borderRadius: 150,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    shadowColor: Colors.black,
    elevation: 5,
    marginTop: -25,
    marginRight: 10,
  },
})

export default BalancePanel
