import React from 'react'
import '../styles/CompanyStyles.css'

const CompanyMobile = ({ currentCompanies, requestSort, sortConfig }) => {
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return
    }
    return sortConfig.key === name ? sortConfig.direction : undefined
  }
  return (
    <div className='table'>
      <p className='table-item'>
        <span
          className={getClassNamesFor('id')}
          onClick={() => requestSort('id')}>
          Id
        </span>
        <span
          className={getClassNamesFor('name')}
          onClick={() => requestSort('name')}>
          Name
        </span>
        <span
          className={getClassNamesFor('totalIncome')}
          onClick={() => requestSort('totalIncome')}>
          Total Income
        </span>
        <span
          className={getClassNamesFor('averageIncome')}
          onClick={() => requestSort('averageIncome')}>
          Average Income
        </span>
      </p>
      {currentCompanies.map((company) => (
        <p key={company.id} className='table-item'>
          <span>{company.id} </span>
          <span>{company.name} </span>
          <span>{company.totalIncome} </span>
          <span>{company.averageIncome} </span>
        </p>
      ))}
    </div>
  )
}

export default CompanyMobile
