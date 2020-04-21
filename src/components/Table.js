import React, { useContext, useState, useEffect } from 'react'
import '../App.css'
import Pagination from './Pagination'
import Company from './Company'
import { CompaniesContext } from '../contexts/CompaniesContext'
import useSortableData from '../hooks/useSortableData'
import Search from './Search'

const Table = () => {
  const [companies] = useContext(CompaniesContext)
  const [filteredData, setFilteredData] = useState(companies)
  const [filteredSorted, setFilteredSorted] = useState(companies)
  const { items, requestSort, sortConfig } = useSortableData(filteredSorted)
  const [currentPage, setCurrentPage] = useState(1)
  const pageLimit = 25
  const offset = (currentPage - 1) * pageLimit
  const currentCompanies = items.slice(offset, offset + pageLimit)
  const [width, setWidth] = useState(window.innerWidth)
  const biggerScreen = width > 800

  useEffect(() => {
    setFilteredSorted(companies)

    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return (_) => {
      window.removeEventListener('resize', handleResize)
    }
  }, [companies])

  return (
    <>
      {biggerScreen === false && (
        <p className='instructions'>
          Try to rotate a screen to see all table categories. Non-visible
          categories (city, last month income) included in filter
        </p>
      )}
      <p className='instructions'>Click on category name to sort</p>
      <div className='controls'>
        <Search
          setFilteredSorted={setFilteredSorted}
          companies={companies}
          setCurrentPage={setCurrentPage}
        />
        <Pagination
          totalRecords={items.length}
          pageLimit={pageLimit}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <Company
        currentCompanies={currentCompanies}
        requestSort={requestSort}
        sortConfig={sortConfig}
        biggerScreen={biggerScreen}
      />
    </>
  )
}

export default Table
