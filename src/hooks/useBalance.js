import {useEffect, useState} from 'react'

// import {getBalance} from '../services/Balance'

const useBalance = () => {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    async function loadBalance() {
      // const value = await getBalance()
      // setBalance(value)
      setBalance(1000)
      console.log('alterar aqui') //FIXME
    }

    loadBalance()
  }, [])

  return [balance]
}

export default useBalance
