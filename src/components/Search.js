import React, { useState, useEffect } from 'react'
import '../App.css'

const Search = ({ setFilteredSorted, companies, setCurrentPage }) => {
  const [searchText, setSearchText] = useState('')

  const handleChange = (value) => {
    setSearchText(value)
    filterData(value)
  }

  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim()
    if (lowercasedValue === '') setFilteredSorted(companies)
    else {
      const filtered = companies.filter((item) => {
        return Object.keys(item).some((key) =>
          item[key].toString().toLowerCase().includes(lowercasedValue)
        )
      })
      setFilteredSorted(filtered)
      setCurrentPage(1)
    }
  }

  useEffect(() => {})

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
