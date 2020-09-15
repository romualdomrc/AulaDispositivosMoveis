import {useEffect, useState} from 'react'
import Service from '../services/Service'

const useBalanceSumByCategory = (days = 7) => {
  const [balanceSum, setBalanceSum] = useState([])

  useEffect(() => {
    async function loadBalanceSumByCategory() {
      const data = await Service.getBalanceSumByCategory(days)
      setBalanceSum([...data])
      console.log()
    }

    loadBalanceSumByCategory()
  }, [days])

  return [balanceSum]
}

export default useBalanceSumByCategory
