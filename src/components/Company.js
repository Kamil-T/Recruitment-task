import React from 'react'
import '../styles/CompanyStyles.css'

const Company = ({ currentCompanies, requestSort, sortConfig }) => {
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
          className={getClassNamesFor('city')}
          onClick={() => requestSort('city')}>
          City
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
        <span
          className={getClassNamesFor('lastMonthIncome')}
          onClick={() => requestSort('lastMonthIncome')}>
          Last Month Income
        </span>
      </p>
      {currentCompanies.map((company) => (
        <p key={company.id} className='table-item'>
          <span>{company.id} </span>
          <span>{company.name} </span>
          <span>{company.city} </span>
          <span>{company.totalIncome} </span>
          <span>{company.averageIncome} </span>
          <span>{company.lastMonthIncome}</span>
        </p>
      ))}
    </div>
  )
}

export default Company
