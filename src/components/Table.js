import React, { useContext, useState, useEffect } from 'react'
import '../App.css'
import Pagination from './Pagination'
import Company from './Company'
import { CompaniesContext } from '../contexts/CompaniesContext'
import useSortableData from '../hooks/useSortableData'
import Search from './Search'
import CompanyMobile from './CompanyMobile'

const Table = () => {
  const [companies] = useContext(CompaniesContext)
  const { items, requestSort, sortConfig } = useSortableData(companies)
  const [filteredData, setFilteredData] = useState(items)
  const [currentPage, setCurrentPage] = useState(1)
  const pageLimit = 20
  const offset = (currentPage - 1) * pageLimit
  const currentCompanies = filteredData.slice(offset, offset + pageLimit)
  const width = window.outerWidth

  useEffect(() => {
    setFilteredData(items)
  }, [items])

  return (
    <>
      <div className='controls'>
        <Search
          setFilteredData={setFilteredData}
          items={items}
          setCurrentPage={setCurrentPage}
        />
        <Pagination
          totalRecords={filteredData.length}
          pageLimit={pageLimit}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {width < 800 && (
        <CompanyMobile
          currentCompanies={currentCompanies}
          requestSort={requestSort}
          sortConfig={sortConfig}
        />
      )}
      {width > 800 && (
        <Company
          currentCompanies={currentCompanies}
          requestSort={requestSort}
          sortConfig={sortConfig}
        />
      )}
    </>
  )
}

export default Table
