import {useEffect, useState} from 'react'

// import {getBalance} from '../services/Balance'

const useBalance = () => {
  const [balance, setBalance] = useState()

  useEffect(() => {
    async function loadBalance() {
      // const value = await getBalance()
      // setBalance(value)
      console.log('alterar aqui') //FIXME
    }

    loadBalance()
  }, [])

  return [balance]
}

export default useBalance
