import React, { useState } from 'react'
import '../App.css'

const Search = ({ setFilteredData, items, setCurrentPage }) => {
  const [searchText, setSearchText] = useState('')

  const handleChange = (value) => {
    setSearchText(value)
    filterData(value)
  }

  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim()
    if (lowercasedValue === '') setFilteredData(items)
    else {
      const filtered = items.filter((item) => {
        return Object.keys(item).some((key) =>
          item[key].toString().toLowerCase().includes(lowercasedValue)
        )
      })
      setFilteredData(filtered)
      setCurrentPage(1)
    }
  }

  return (
    <>
      <input
        className='filter'
        type='text'
        placeholder='Type to filter'
        value={searchText}
        onChange={(e) => handleChange(e.target.value)}
        autoFocus
      />
    </>
  )
}

export default Search
