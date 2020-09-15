import {useEffect, useState} from 'react'

import Service from '../services/Service'

const useBalance = () => {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    async function loadBalance() {
      const value = await Service.getBalance()
      setBalance(value)
    }

    loadBalance()
  }, [])

  return [balance]
}

export default useBalance
