import { useBlockUserIdListStore } from '../stores/localStorageStore/stores'
import { useEffect, useState } from 'react'

function useBlockUserIdList() {
  const blockUserIdList = useBlockUserIdListStore(state => state.blockUserIdList)
  const [returnValue, setReturnValue] = useState<number[]>([])

  useEffect(() => setReturnValue(blockUserIdList), [])

  return returnValue
}

export default useBlockUserIdList