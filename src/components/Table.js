import React, { useContext, useState } from 'react'
import Pagination from './Pagination'
import Company from './Company'
import { CompaniesContext } from '../contexts/CompaniesContext'
import { compare } from '../helpers/compare'

const Table = () => {
  const [companies] = useContext(CompaniesContext)
  const byId = companies.sort(compare('id'))
  //const byName = companies.sort(compare('name'))
  //const byCity = companies.sort(compare('city'))
  //const byTotalIncome = companies.sort(compare('totalIncome'))
  //const byAverageIncome = companies.sort(compare('averageIncome'))

  const [currentPage, setCurrentPage] = useState(1)
  const pageLimit = 20
  const offset = (currentPage - 1) * pageLimit
  const currentCompanies = byId.slice(offset, offset + pageLimit)
  return (
    <>
      <Pagination
        totalRecords={companies.length}
        pageLimit={pageLimit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Company currentCompanies={currentCompanies} />
    </>
  )
}

export default Table
