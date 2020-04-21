import React from 'react'
import '../styles/CompanyStyles.css'

const Company = ({
  currentCompanies,
  requestSort,
  sortConfig,
  biggerScreen,
}) => {
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return
    }
    return sortConfig.key === name ? sortConfig.direction : undefined
  }
  return (
    <div className='table'>
      <p className='table-item categories'>
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
        {biggerScreen && (
          <span
            className={getClassNamesFor('city')}
            onClick={() => requestSort('city')}>
            City
          </span>
        )}
        <span
          className={getClassNamesFor('totalIncome')}
          onClick={() => requestSort('totalIncome')}>
          Total Inc
        </span>
        <span
          className={getClassNamesFor('averageIncome')}
          onClick={() => requestSort('averageIncome')}>
          Average Inc
        </span>
        {biggerScreen && (
          <span
            className={getClassNamesFor('lastMonthIncome')}
            onClick={() => requestSort('lastMonthIncome')}>
            Last Month Inc
          </span>
        )}
      </p>
      {currentCompanies.map((company) => (
        <p key={company.id} className='table-item '>
          <span>{company.id} </span>
          <span>{company.name} </span>
          {biggerScreen && <span>{company.city} </span>}
          <span>{company.totalIncome} </span>
          <span>{company.averageIncome} </span>
          {biggerScreen && <span>{company.lastMonthIncome}</span>}
        </p>
      ))}
    </div>
  )
}

export default Company
