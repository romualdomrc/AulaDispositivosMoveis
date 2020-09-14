import React from 'react'
import {View, Text, StyleSheet} from 'react-native'


import useBalance from '../../hooks/useBalance'

import Colors from '../../styles/Colors'

const BalanceLabel = () => {
  const [balance] = useBalance()

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Saldo Atual</Text>

      <View>
        <Text style={styles.value}>{balance}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 12,
    color: Colors.white,
  },
  panel: {
    borderRadius: 10,
    minWidth: 200,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  value: {
    fontSize: 28,
    color: Colors.white,
    textAlign: 'center',
  },
})

export default BalanceLabel
