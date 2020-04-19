import React from 'react'
import '../styles/CompanyStyles.css'

const Company = ({ currentCompanies }) => {
  return (
    <div className='table'>
      <p className='table-item'>
        <span>Id</span>
        <span>Name</span>
        <span>City</span>
        <span>Total Income</span>
        <span>Average Income</span>
        <span>Last Month Income</span>
      </p>
      {currentCompanies.map((company) => (
        <p key={company.id} className='table-item'>
          <span>{company.id} </span>
          <span>{company.name} </span>
          <span>{company.city} </span>
          <span>{company.totalIncome} </span>
          <span>{company.averageIncome} </span>
        </p>
      ))}
    </div>
  )
}

export default Company
