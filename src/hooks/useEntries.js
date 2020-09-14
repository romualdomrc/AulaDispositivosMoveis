import {useEffect, useState} from 'react'

// import {getEntries, saveEntry, deleteEntry} from '../services/Entries'
const saveEntry = '1'
const deleteEntry = '2'

const useEntries = (days = 7, category) => {
  const [entries, setEntries] = useState([])

  useEffect(() => {
  //   async function loadEntries() {
  //     const data = await getEntries(days, category)
  //     setEntries(data)
  //   }

  //   loadEntries()
  //FIXME
  }, [days, category])

  return [entries, saveEntry, deleteEntry]
  
}

export default useEntries
