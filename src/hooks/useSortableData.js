import { useState, useMemo } from 'react'

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config)

  const sortedItems = useMemo(() => {
    let sortableItems = [...items]

    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const varA =
          typeof a[sortConfig.key] === 'string'
            ? a[sortConfig.key].toUpperCase()
            : a[sortConfig.key]
        const varB =
          typeof b[sortConfig.key] === 'string'
            ? b[sortConfig.key].toUpperCase()
            : b[sortConfig.key]

        if (varA < varB) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        } else if (varA > varB) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [items, sortConfig])

  const requestSort = (key) => {
    let direction = 'ascending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }
  return { items: sortedItems, requestSort, sortConfig }
}

export default useSortableData
